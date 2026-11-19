import cors from 'cors'
import express from 'express'
import { EstacionamientoController } from './api/controllers/EstacionamientoController.js'
import { crearEstadiaRoutes } from './api/routes/estadiaRoutes.js'
import { errorMiddleware } from './api/middlewares/errorMiddleware.js'
import { notFoundMiddleware } from './api/middlewares/notFoundMiddleware.js'
import { crearEstacionamientoRoutes } from './api/routes/estacionamientoRoutes.js'
import { crearVehiculoRoutes } from './api/routes/vehiculoRoutes.js'
import { EstacionamientoService } from './business/services/EstacionamientoService.js'

const app = express()
const port = Number(process.env.PORT ?? 3000)

const estacionamientoService = new EstacionamientoService()
const estacionamientoController = new EstacionamientoController(estacionamientoService)

app.use(cors())
app.use(express.json())

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api', crearEstacionamientoRoutes(estacionamientoController))
app.use('/api', crearVehiculoRoutes())
app.use('/api', crearEstadiaRoutes())

app.use(notFoundMiddleware)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Estacionamiento API escuchando en http://localhost:${port}`)
})
