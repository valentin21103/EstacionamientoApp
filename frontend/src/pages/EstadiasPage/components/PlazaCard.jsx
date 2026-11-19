import Icono from './Icono.jsx'
import VehiculoIcono from './VehiculoIcono.jsx'
import { admiteVehiculo, etiquetaTipoPlaza } from '../compatibilidadPlazas.js'

function obtenerDuracion(fechaEntrada, fechaSalida, ahora) {
  const desde = new Date(fechaEntrada).getTime()
  const hasta = fechaSalida ? new Date(fechaSalida).getTime() : ahora
  const minutos = Math.max(0, Math.floor((hasta - desde) / 60000))
  const horas = Math.floor(minutos / 60)
  const minutosRestantes = minutos % 60

  if (!horas) return `${minutosRestantes} min`
  if (horas < 24) return `${horas} h ${String(minutosRestantes).padStart(2, '0')} min`
  return `${Math.floor(horas / 24)} d ${horas % 24} h`
}

export default function PlazaCard({ plaza, seleccionada, tipo, ahora, guardando, onSeleccionar, onSalida }) {
  const ocupada = plaza.estado === 'ocupada'

  return (
   <article className={`playa-space ${ocupada ? 'playa-space--occupied' : 'playa-space--free'} ${seleccionada ? 'playa-space--selected' : ''}`}>
     <div className="playa-space__number">P{String(plaza.numero).padStart(2, '0')}</div>
     {ocupada ? <>
       <div className={`playa-space__vehicle playa-space__vehicle--${plaza.tipoVehiculo ?? 'auto'}`}><VehiculoIcono tipo={(plaza.tipoVehiculo ?? 'auto').toUpperCase()} /></div>
       <span className="playa-space__plate">{plaza.patente}</span>
       <span className="playa-space__duration"><Icono nombre="reloj" size={14} />{plaza.fechaEntrada ? obtenerDuracion(plaza.fechaEntrada, null, ahora) : 'En curso'}</span>
       <button className="playa-space__exit" type="button" disabled={guardando} onClick={() => onSalida(plaza.id)}>{guardando ? 'Procesando…' : 'Cobrar'}</button>
     </> : <button className="playa-space__choose" type="button" onClick={() => onSeleccionar(String(plaza.id))} disabled={!admiteVehiculo(plaza.tipoPermitido, tipo)}>
       <Icono nombre="mas" size={23} /><span>Libre</span>
       {plaza.tipoPermitido && <small>{etiquetaTipoPlaza(plaza.tipoPermitido)}</small>}
     </button>}
   </article>
  )
}
