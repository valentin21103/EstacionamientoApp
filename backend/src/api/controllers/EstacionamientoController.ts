import type { Request, Response } from 'express'
import type { EstacionamientoService } from '../../business/services/EstacionamientoService.js'

export class EstacionamientoController {
  constructor(private readonly service: EstacionamientoService) {}

  listarPlazas = async (_request: Request, response: Response): Promise<void> => {
    response.json(await this.service.listarPlazas())
  }

  obtenerResumen = async (_request: Request, response: Response): Promise<void> => {
    response.json(await this.service.obtenerResumen())
  }
}
