import type { TipoVehiculo } from '../enums.js'

export type Vehiculo = {
  id: number
  clienteId: number
  patente: string
  tipo: TipoVehiculo
  marca?: string
  modelo?: string
}
