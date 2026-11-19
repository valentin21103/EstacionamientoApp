import type { TipoVehiculo } from '@prisma/client'
import { prisma } from '../../infrastructure/database/prisma.js'

type EntradaDatos = {
  patente: string
  tipo: TipoVehiculo
  clienteId: number
  plazaId: number
  tarifaId: number
}

class ErrorHttp extends Error {
  constructor(public readonly status: number, message: string) {
    super(message)
  }
}

function transformarPlaza(plaza: {
  id: number
  numero: number
  estado: string
  tipoPermitido: string | null
  vehiculoId: number | null
  vehiculo: { patente: string } | null
}) {
  return {
    id: plaza.id,
    numero: plaza.numero,
    estado: plaza.estado.toLowerCase(),
    tipoPermitido: plaza.tipoPermitido?.toLowerCase() ?? 'cualquiera',
    vehiculoId: plaza.vehiculoId,
    patente: plaza.vehiculo?.patente,
  }
}

export class EstadiaService {
  async ObtenerPanel() {
    const inicioDelDia = new Date()
    inicioDelDia.setHours(0, 0, 0, 0)

    const [plazas, clientes, tarifas, estadias, recaudacion, salidasHoy] = await Promise.all([
      prisma.plaza.findMany({
        include: {
          vehiculo: true,
          estadias: {
            where: { fechaSalida: null },
            orderBy: { fechaEntrada: 'desc' },
            take: 1,
          },
        },
        orderBy: { numero: 'asc' },
      }),
      prisma.cliente.findMany({
        select: { id: true, nombre: true, documento: true },
        orderBy: { nombre: 'asc' },
      }),
      prisma.tarifa.findMany({ orderBy: { nombre: 'asc' } }),
      prisma.estadia.findMany({
        where: {
          OR: [
            { fechaSalida: null },
            { fechaSalida: { gte: inicioDelDia } },
          ],
        },
        include: { vehiculo: true, plaza: true, tarifa: true },
        orderBy: { fechaEntrada: 'desc' },
        take: 8,
      }),
      prisma.estadia.aggregate({
        where: { fechaSalida: { gte: inicioDelDia }, monto: { not: null } },
        _sum: { monto: true },
      }),
      prisma.estadia.count({ where: { fechaSalida: { gte: inicioDelDia } } }),
    ])

    const plazasOcupadas = plazas.filter((plaza) => plaza.estado === 'OCUPADA').length

    return {
      resumen: {
        plazasTotales: plazas.length,
        plazasLibres: plazas.length - plazasOcupadas,
        vehiculosDentro: plazasOcupadas,
        ingresosHoy: Number(recaudacion._sum.monto ?? 0),
        salidasHoy,
      },
      plazas: plazas.map((plaza) => ({
        id: plaza.id,
        numero: plaza.numero,
        estado: plaza.estado.toLowerCase(),
        tipoPermitido: plaza.tipoPermitido?.toLowerCase() ?? null,
        patente: plaza.vehiculo?.patente ?? null,
        tipoVehiculo: plaza.vehiculo?.tipo.toLowerCase() ?? null,
        fechaEntrada: plaza.estadias[0]?.fechaEntrada ?? null,
      })),
      clientes,
      tarifas: tarifas.map((tarifa) => ({
        id: tarifa.id,
        nombre: tarifa.nombre,
        precioPorHora: Number(tarifa.precioPorHora),
      })),
      movimientos: estadias.map((estadia) => ({
        id: estadia.id,
        patente: estadia.vehiculo.patente,
        tipoVehiculo: estadia.vehiculo.tipo.toLowerCase(),
        plazaNumero: estadia.plaza.numero,
        fechaEntrada: estadia.fechaEntrada,
        fechaSalida: estadia.fechaSalida,
        tarifa: estadia.tarifa.nombre,
        monto: estadia.monto ? Number(estadia.monto) : null,
      })),
    }
  }

  async RegistrarEntrada(datos: EntradaDatos) {
    return prisma.$transaction(async (tx) => {
      const [plaza, cliente, tarifa] = await Promise.all([
        tx.plaza.findUnique({ where: { id: datos.plazaId } }),
        tx.cliente.findUnique({ where: { id: datos.clienteId } }),
        tx.tarifa.findUnique({ where: { id: datos.tarifaId } }),
      ])

      if (!plaza) throw new ErrorHttp(404, 'La plaza no existe')
      if (!cliente) throw new ErrorHttp(404, 'El cliente no existe')
      if (!tarifa) throw new ErrorHttp(404, 'La tarifa no existe')
      if (plaza.estado !== 'LIBRE') throw new ErrorHttp(400, 'La plaza está ocupada')
      const tiposCompartidos: TipoVehiculo[] = ['AUTO', 'CAMIONETA']
      const compartePlaza = plaza.tipoPermitido !== null
        && tiposCompartidos.includes(plaza.tipoPermitido)
        && tiposCompartidos.includes(datos.tipo)

      if (plaza.tipoPermitido && plaza.tipoPermitido !== datos.tipo && !compartePlaza) {
        throw new ErrorHttp(400, 'El tipo de vehículo no puede usar esa plaza')
      }

      let vehiculo = await tx.vehiculo.findUnique({ where: { patente: datos.patente } })

      if (vehiculo && vehiculo.clienteId !== datos.clienteId) {
        throw new ErrorHttp(400, 'La patente ya pertenece a otro cliente')
      }

      if (!vehiculo) {
        vehiculo = await tx.vehiculo.create({
          data: {
            patente: datos.patente,
            tipo: datos.tipo,
            clienteId: datos.clienteId,
          },
        })
      }

      const estadiaActiva = await tx.estadia.findFirst({
        where: { vehiculoId: vehiculo.id, fechaSalida: null },
      })

      if (estadiaActiva) throw new ErrorHttp(400, 'El vehículo ya tiene una estadía activa')

      const estadia = await tx.estadia.create({
        data: {
          vehiculoId: vehiculo.id,
          plazaId: datos.plazaId,
          tarifaId: datos.tarifaId,
        },
      })

      const plazaActualizada = await tx.plaza.update({
        where: { id: datos.plazaId },
        data: { estado: 'OCUPADA', vehiculoId: vehiculo.id },
        include: { vehiculo: true },
      })

      return { estadia, plaza: transformarPlaza(plazaActualizada) }
    })
  }

  async RegistrarSalida(plazaId: number) {
    return prisma.$transaction(async (tx) => {
      const plaza = await tx.plaza.findUnique({
        where: { id: plazaId },
        include: { vehiculo: true },
      })

      if (!plaza) throw new ErrorHttp(404, 'La plaza no existe')
      if (!plaza.vehiculoId) throw new ErrorHttp(400, 'La plaza ya está libre')

      const estadia = await tx.estadia.findFirst({
        where: { plazaId, fechaSalida: null },
        include: { tarifa: true },
        orderBy: { fechaEntrada: 'desc' },
      })

      if (!estadia) throw new ErrorHttp(404, 'No hay una estadía activa en la plaza')

      const horas = Math.max(1, Math.ceil((Date.now() - estadia.fechaEntrada.getTime()) / 3_600_000))
      const monto = horas * Number(estadia.tarifa.precioPorHora)

      const estadiaCerrada = await tx.estadia.update({
        where: { id: estadia.id },
        data: { fechaSalida: new Date(), monto },
      })

      const plazaActualizada = await tx.plaza.update({
        where: { id: plazaId },
        data: { estado: 'LIBRE', vehiculoId: null },
        include: { vehiculo: true },
      })

      return { estadia: estadiaCerrada, plaza: transformarPlaza(plazaActualizada) }
    })
  }
}
