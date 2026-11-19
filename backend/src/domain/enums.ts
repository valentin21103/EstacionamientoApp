export const ESTADOS_PLAZA = ['libre', 'ocupada'] as const
export type EstadoPlaza = (typeof ESTADOS_PLAZA)[number]

export const TIPOS_VEHICULO = ['auto', 'moto', 'camioneta'] as const
export type TipoVehiculo = (typeof TIPOS_VEHICULO)[number]
