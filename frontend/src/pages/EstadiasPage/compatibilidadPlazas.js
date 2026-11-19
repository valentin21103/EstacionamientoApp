export function admiteVehiculo(tipoPermitido, tipoVehiculo) {
  if (!tipoPermitido) return true

  const permitido = tipoPermitido.toUpperCase()
  const vehiculo = tipoVehiculo.toUpperCase()
  const tiposCompartidos = ['AUTO', 'CAMIONETA']

  return permitido === vehiculo || (
    tiposCompartidos.includes(permitido) && tiposCompartidos.includes(vehiculo)
  )
}

export function etiquetaTipoPlaza(tipoPermitido) {
  const tipo = tipoPermitido?.toUpperCase()
  if (tipo === 'AUTO' || tipo === 'CAMIONETA') return 'Auto / camioneta'
  if (tipo === 'MOTO') return 'Moto'
  return tipoPermitido
}
