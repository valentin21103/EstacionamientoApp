import { Router } from 'express'
import type { EstacionamientoController } from '../controllers/EstacionamientoController.js'

export function crearEstacionamientoRoutes(controller: EstacionamientoController): Router {
  const router = Router()

  router.get('/plazas', controller.listarPlazas)
  router.get('/resumen', controller.obtenerResumen)

  return router
}
