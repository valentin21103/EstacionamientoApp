import { Router } from 'express'
import {
  Actualizar,
  Crear,
  Eliminar,
  TraerPorId,
  TraerTodos,
} from '../controllers/VehiculoController.js'

export function crearVehiculoRoutes(): Router {
  const router = Router()

  router.get('/vehiculos', TraerTodos)
  router.get('/vehiculos/:id', TraerPorId)
  router.post('/vehiculos', Crear)
  router.put('/vehiculos/:id', Actualizar)
  router.delete('/vehiculos/:id', Eliminar)

  return router
}
