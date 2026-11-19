import type { EstadoPlaza, TipoVehiculo } from '../enums.js'

export type Plaza = {
  id: number
  numero: number
  estado: EstadoPlaza
  tipoPermitido: TipoVehiculo | 'cualquiera'
  vehiculoId?: number
}
