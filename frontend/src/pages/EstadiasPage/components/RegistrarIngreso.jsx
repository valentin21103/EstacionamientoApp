import { useState } from 'react'
import Icono from './Icono.jsx'
import VehiculoIcono from './VehiculoIcono.jsx'
import { moneda } from '../formatos.js'

const tiposVehiculo = [
  { id: 'AUTO', nombre: 'Auto', icono: 'auto' },
  { id: 'MOTO', nombre: 'Moto', icono: 'moto' },
  { id: 'CAMIONETA', nombre: 'Camioneta', icono: 'camioneta' },
]

export default function RegistrarIngreso({
  formulario,
  tipo,
  plazasDisponibles,
  tarifas,
  clientes,
  puedeRegistrar,
  guardando,
  onCambiarTipo,
  onEditarCampo,
  onConfirmar,
}) {
  const [busquedaCliente, setBusquedaCliente] = useState('')
  const tarifaSeleccionada = tarifas.find((tarifa) => tarifa.id === Number(formulario.tarifaId))
  const clientesFiltrados = clientes.filter((cliente) => (
    `${cliente.nombre} ${cliente.documento}`.toLowerCase().includes(busquedaCliente.toLowerCase())
  ))

  return (
    <section className="playa-panel playa-entry">
      <div className="playa-entry__heading"><p className="playa-section-kicker">NUEVA ESTADÍA</p><h2>Registrar ingreso</h2><p>Elegí el vehículo y asignale un lugar.</p></div>
      <form onSubmit={onConfirmar}>
        <div className="playa-vehicle-types" aria-label="Tipo de vehículo">
          {tiposVehiculo.map((vehiculo) => <button className={tipo === vehiculo.id ? 'is-selected' : ''} key={vehiculo.id} type="button" onClick={() => onCambiarTipo(vehiculo.id)}>
            <span className={`playa-vehicle-types__icon playa-vehicle-types__icon--${vehiculo.id.toLowerCase()}`}><VehiculoIcono tipo={vehiculo.id} /></span><span>{vehiculo.nombre}</span>
          </button>)}
        </div>
        <label className="playa-field playa-field--full"><span>Patente</span><input value={formulario.patente} onChange={(event) => onEditarCampo('patente', event.target.value.toUpperCase())} placeholder="AB 123 CD" autoComplete="off" required /></label>
        <div className="playa-form-row">
          <label className="playa-field"><span>Plaza disponible</span><select value={formulario.plazaId} onChange={(event) => onEditarCampo('plazaId', event.target.value)} required>
            <option value="">Elegir plaza</option>{plazasDisponibles.map((plaza) => <option key={plaza.id} value={plaza.id}>P{String(plaza.numero).padStart(2, '0')} · Libre</option>)}
          </select></label>
          <label className="playa-field"><span>Tarifa</span><select value={formulario.tarifaId} onChange={(event) => onEditarCampo('tarifaId', event.target.value)} required>
            <option value="">Elegir tarifa</option>{tarifas.map((tarifa) => <option key={tarifa.id} value={tarifa.id}>{tarifa.nombre} · {moneda.format(tarifa.precioPorHora)}/h</option>)}
          </select></label>
        </div>
        <label className="playa-field playa-field--full"><span>Cliente</span><div className="playa-search"><Icono nombre="buscar" size={19} /><input value={busquedaCliente} onChange={(event) => setBusquedaCliente(event.target.value)} placeholder="Buscar por nombre o documento" /></div>
          <select value={formulario.clienteId} onChange={(event) => onEditarCampo('clienteId', event.target.value)} required>
            <option value="">Seleccionar cliente</option>{clientesFiltrados.map((cliente) => <option key={cliente.id} value={cliente.id}>{cliente.nombre} · {cliente.documento}</option>)}
          </select>
        </label>
        <div className="playa-entry__summary"><span><Icono nombre="reloj" size={19} />Ingreso: ahora</span><strong>{tarifaSeleccionada ? `${moneda.format(tarifaSeleccionada.precioPorHora)} / hora` : 'Elegí una tarifa'}</strong></div>
        {(!clientes.length || !tarifas.length) && <p className="playa-entry__hint">Para registrar ingresos, primero necesitás tener clientes y tarifas cargados en la base.</p>}
        <button className="playa-submit" type="submit" disabled={!puedeRegistrar || guardando}>{guardando ? 'Guardando ingreso…' : 'Confirmar ingreso'}<Icono nombre="flecha" size={21} /></button>
      </form>
    </section>
  )
}
