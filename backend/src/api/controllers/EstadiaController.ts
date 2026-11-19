import type { Request, Response } from 'express'
import { EstadiaService } from '../../business/services/EstadiaService.js'

const estadiaService = new EstadiaService()

export async function ObtenerPanel(_request: Request, response: Response): Promise<void> {
  response.json(await estadiaService.ObtenerPanel())
}

export async function RegistrarEntrada(request: Request, response: Response): Promise<void> {
  const resultado = await estadiaService.RegistrarEntrada(request.body)
  response.status(201).json(resultado)
}

export async function RegistrarSalida(request: Request, response: Response): Promise<void> {
  const plazaId = Number(request.params.plazaId)
  const resultado = await estadiaService.RegistrarSalida(plazaId)
  response.json(resultado)
}
