import VehiculoIcono from './VehiculoIcono.jsx'

function formatoHora(fecha) {
  const valor = new Date(fecha)
  const hoy = new Date()
  const esHoy = valor.toDateString() === hoy.toDateString()
  const hora = valor.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  return esHoy ? `Hoy, ${hora}` : `${valor.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}, ${hora}`
}

export default function UltimosMovimientos({ movimientos }) {
  return (
    <section className="playa-panel playa-movements">
      <div className="playa-panel__heading"><div><p className="playa-section-kicker">ACTIVIDAD RECIENTE</p><h2>Últimos movimientos</h2></div><span className="playa-movements__count">{movimientos.length} registros</span></div>
      {movimientos.length === 0 ? <p className="playa-empty">Los ingresos y salidas aparecerán acá.</p> : <div className="playa-table-wrap"><table className="playa-table">
        <thead><tr><th>Patente</th><th>Vehículo</th><th>Plaza</th><th>Hora</th><th>Movimiento</th></tr></thead>
        <tbody>{movimientos.map((movimiento) => <tr key={movimiento.id}>
          <td className="playa-table__plate"><VehiculoIcono tipo={movimiento.tipoVehiculo.toUpperCase()} />{movimiento.patente}</td>
          <td>{movimiento.tipoVehiculo[0].toUpperCase() + movimiento.tipoVehiculo.slice(1)}</td>
          <td>P{String(movimiento.plazaNumero).padStart(2, '0')}</td>
          <td>{formatoHora(movimiento.fechaSalida ?? movimiento.fechaEntrada)}</td>
          <td><span className={`playa-movement-tag ${movimiento.fechaSalida ? 'playa-movement-tag--exit' : ''}`}>{movimiento.fechaSalida ? 'Salió' : 'Ingresó'}</span></td>
        </tr>)}</tbody>
      </table></div>}
    </section>
  )
}
