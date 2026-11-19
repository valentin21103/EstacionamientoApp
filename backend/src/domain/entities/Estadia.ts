export type Estadia = {
  id: number
  vehiculoId: number
  plazaId: number
  tarifaId: number
  fechaEntrada: Date
  fechaSalida?: Date
  monto?: number
}
