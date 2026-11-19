import type { Request, Response } from 'express'
import { VehiculoService } from '../../business/services/VehiculoService.js'

const vehiculoService = new VehiculoService()

function obtenerId(valor: string | string[]): number | null {
  const id = Number(Array.isArray(valor) ? valor[0] : valor)
  return Number.isInteger(id) && id > 0 ? id : null
}

export async function TraerTodos(
  _request: Request,
  response: Response,
): Promise<void> {
  const vehiculos = await vehiculoService.TraerTodos()

  response.json(vehiculos)
}

export async function TraerPorId(
  request: Request,
  response: Response,
): Promise<void> {
  const id = obtenerId(request.params.id)

  if (id === null) {
    response.status(400).json({ error: 'El id no es válido' })
    return
  }

  const vehiculo = await vehiculoService.TraerPorId(id)

  if (!vehiculo) {
    response.status(404).json({ error: 'Vehículo no encontrado' })
    return
  }

  response.json(vehiculo)
}

export async function Crear(
  request: Request,
  response: Response,
): Promise<void> {
  const vehiculo = await vehiculoService.Crear(request.body)
  response.status(201).json(vehiculo)
}

export async function Actualizar(
  request: Request,
  response: Response,
): Promise<void> {
  const id = obtenerId(request.params.id)

  if (id === null) {
    response.status(400).json({ error: 'El id no es válido' })
    return
  }

  const vehiculo = await vehiculoService.Actualizar(id, request.body)
  response.json(vehiculo)
}

export async function Eliminar(
  request: Request,
  response: Response,
): Promise<void> {
  const id = obtenerId(request.params.id)

  if (id === null) {
    response.status(400).json({ error: 'El id no es válido' })
    return
  }

  await vehiculoService.Eliminar(id)
  response.status(204).send()
}
