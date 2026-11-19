import { prisma } from '../../infrastructure/database/prisma.js'
import type { Prisma } from '@prisma/client'

export class VehiculoService {
  TraerTodos() {
    return prisma.vehiculo.findMany({
      include: { cliente: true },
      orderBy: { patente: 'asc' },
    })
  }

  TraerPorId(id: number) {
    return prisma.vehiculo.findUnique({
      where: { id },
      include: { cliente: true, estadias: true },
    })
  }

  Crear(datos: Prisma.VehiculoUncheckedCreateInput) {
    return prisma.vehiculo.create({ data: datos })
  }

  Actualizar(id: number, datos: Prisma.VehiculoUncheckedUpdateInput) {
    return prisma.vehiculo.update({
      where: { id },
      data: datos,
    })
  }

  Eliminar(id: number) {
    return prisma.vehiculo.delete({ where: { id } })
  }
}
