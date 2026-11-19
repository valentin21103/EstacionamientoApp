import Icono from './Icono.jsx'
import { moneda } from '../formatos.js'

export default function ResumenMetricas({ resumen, cargando }) {
  return (
    <section className="playa-metrics" aria-label="Resumen de hoy">
      <article className="playa-metric">
        <div className="playa-metric__top"><span><Icono nombre="plaza" /></span><p>Plazas libres</p></div>
        <strong>{cargando ? '—' : resumen.plazasLibres ?? 0}</strong>
        <div className="playa-metric__foot"><div className="playa-progress"><span style={{ width: `${resumen.plazasTotales ? ((resumen.plazasLibres / resumen.plazasTotales) * 100) : 0}%` }} /></div><small>{resumen.plazasTotales ?? 0} plazas en total</small></div>
      </article>
      <article className="playa-metric">
        <div className="playa-metric__top"><span><Icono nombre="auto" /></span><p>Vehículos dentro</p></div>
        <strong>{cargando ? '—' : resumen.vehiculosDentro ?? 0}</strong>
        <div className="playa-metric__foot"><small>{resumen.plazasTotales ? Math.round((resumen.vehiculosDentro / resumen.plazasTotales) * 100) : 0}% de ocupación</small></div>
      </article>
      <article className="playa-metric">
        <div className="playa-metric__top"><span><Icono nombre="tendencia" /></span><p>Ingresos de hoy</p></div>
        <strong>{cargando ? '—' : moneda.format(resumen.ingresosHoy ?? 0)}</strong>
        <div className="playa-metric__foot"><small>Según estadías cerradas</small></div>
      </article>
      <article className="playa-metric playa-metric--highlight">
        <div className="playa-metric__top"><span><Icono nombre="flecha" /></span><p>Salidas de hoy</p></div>
        <strong>{cargando ? '—' : resumen.salidasHoy ?? 0}</strong>
        <div className="playa-metric__foot"><small>Estadías finalizadas</small></div>
      </article>
    </section>
  )
}
