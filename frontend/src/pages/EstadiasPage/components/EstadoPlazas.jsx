import { useMemo, useState } from 'react'
import PlazaCard from './PlazaCard.jsx'

export default function EstadoPlazas({ plazas, resumen, cargando, plazaId, tipo, ahora, guardando, onSeleccionar, onSalida }) {
  const [filtro, setFiltro] = useState('todas')

  const plazasVisibles = useMemo(() => plazas.filter((plaza) => {
    if (filtro === 'libres') return plaza.estado === 'libre'
    if (filtro === 'ocupadas') return plaza.estado === 'ocupada'
    return true
  }), [plazas, filtro])

  return (
    <section className="playa-panel playa-spaces">
      <div className="playa-panel__heading">
        <div><p className="playa-section-kicker">OCUPACIÓN ACTUAL</p><h2>Estado de las plazas</h2></div>
        <div className="playa-filters" aria-label="Filtrar plazas">
          {['todas', 'libres', 'ocupadas'].map((opcion) => <button key={opcion} className={filtro === opcion ? 'is-active' : ''} type="button" onClick={() => setFiltro(opcion)}>{opcion[0].toUpperCase()}{opcion.slice(1)}</button>)}
        </div>
      </div>
      {cargando ? <p className="playa-empty">Cargando plazas…</p> : plazasVisibles.length === 0 ? <p className="playa-empty">Todavía no hay plazas para mostrar.</p> : (
        <div className="playa-space-grid">
          {plazasVisibles.map((plaza) => (
            <PlazaCard
              key={plaza.id}
              plaza={plaza}
              seleccionada={plazaId === String(plaza.id)}
              tipo={tipo}
              ahora={ahora}
              guardando={guardando}
              onSeleccionar={onSeleccionar}
              onSalida={onSalida}
            />
          ))}
        </div>
      )}
      <div className="playa-space-legend"><span><i className="playa-legend-dot playa-legend-dot--free" />Libre ({resumen.plazasLibres ?? 0})</span><span><i className="playa-legend-dot playa-legend-dot--occupied" />Ocupada ({resumen.vehiculosDentro ?? 0})</span><span className="playa-space-legend__total">Total: {resumen.plazasTotales ?? 0} plazas</span></div>
    </section>
  )
}
