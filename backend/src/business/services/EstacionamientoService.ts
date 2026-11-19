import { prisma } from '../../infrastructure/database/prisma.js'

export type ResumenEstacionamiento = {
  total: number
  libres: number
  ocupadas: number
}

export class EstacionamientoService {
  async listarPlazas() {
    const plazas = await prisma.plaza.findMany({
      include: { vehiculo: true },
      orderBy: { numero: 'asc' },
    })

    return plazas.map((plaza) => ({
      id: plaza.id,
      numero: plaza.numero,
      estado: plaza.estado.toLowerCase(),
      tipoPermitido: plaza.tipoPermitido?.toLowerCase() ?? 'cualquiera',
      vehiculoId: plaza.vehiculoId,
      patente: plaza.vehiculo?.patente,
    }))
  }

  async obtenerResumen(): Promise<ResumenEstacionamiento> {
    const plazas = await this.listarPlazas()
    const ocupadas = plazas.filter((plaza) => plaza.estado === 'ocupada').length

    return {
      total: plazas.length,
      ocupadas,
      libres: plazas.length - ocupadas,
    }
  }
}
