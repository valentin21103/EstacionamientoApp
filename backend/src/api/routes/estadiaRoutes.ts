import { Router } from 'express'
import { ObtenerPanel, RegistrarEntrada, RegistrarSalida } from '../controllers/EstadiaController.js'

export function crearEstadiaRoutes(): Router {
  const router = Router()

  router.get('/estadias/panel', ObtenerPanel)
  router.post('/estadias/entrada', RegistrarEntrada)
  router.patch('/estadias/:plazaId/salida', RegistrarSalida)

  return router
}
