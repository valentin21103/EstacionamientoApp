import EstadoPlazas from './components/EstadoPlazas.jsx'
import Icono from './components/Icono.jsx'
import PlayaSidebar from './components/PlayaSidebar.jsx'
import RegistrarIngreso from './components/RegistrarIngreso.jsx'
import ResumenMetricas from './components/ResumenMetricas.jsx'
import UltimosMovimientos from './components/UltimosMovimientos.jsx'
import useEstadias from './useEstadias.js'
import './EstadiasPage.css'

export default function EstadiasPage() {
  const {
    panel,
    cargando,
    guardando,
    error,
    setError,
    aviso,
    setAviso,
    ahora,
    tipo,
    formulario,
    plazasDisponibles,
    puedeRegistrar,
    editarCampo,
    cambiarTipo,
    confirmarIngreso,
    confirmarSalida,
  } = useEstadias()
  const fechaActual = new Date().toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="playa-app">
      <PlayaSidebar />

      <main className="playa-main" id="estadias">
        <header className="playa-topbar">
          <div className="playa-breadcrumb"><span>Mi estacionamiento</span><span className="playa-breadcrumb__slash">/</span><strong>Estadías</strong></div>
          <div className="playa-topbar__date"><Icono nombre="calendario" size={19} />{fechaActual}</div>
        </header>

        <div className="playa-content">
          <section className="playa-heading">
            <div>
              <p className="playa-eyebrow">OPERACIÓN DEL ESTACIONAMIENTO</p>
              <h1>Control de estadías</h1>
              <p className="playa-heading__subtitle">Entradas, ocupación y movimientos en un solo lugar.</p>
            </div>
          </section>

          {error && <div className="playa-alert" role="alert">{error}<button type="button" onClick={() => setError('')} aria-label="Cerrar aviso">×</button></div>}
          {aviso && <div className="playa-alert playa-alert--success" role="status">{aviso}<button type="button" onClick={() => setAviso('')} aria-label="Cerrar aviso">×</button></div>}

          <ResumenMetricas resumen={panel.resumen} cargando={cargando} />

          <div className="playa-workspace">
            <div className="playa-workspace__left">
              <EstadoPlazas
                plazas={panel.plazas}
                resumen={panel.resumen}
                cargando={cargando}
                plazaId={formulario.plazaId}
                tipo={tipo}
                ahora={ahora}
                guardando={guardando}
                onSeleccionar={(plazaId) => editarCampo('plazaId', plazaId)}
                onSalida={confirmarSalida}
              />
              <UltimosMovimientos movimientos={panel.movimientos} />
            </div>

            <RegistrarIngreso
              formulario={formulario}
              tipo={tipo}
              plazasDisponibles={plazasDisponibles}
              tarifas={panel.tarifas}
              clientes={panel.clientes}
              puedeRegistrar={puedeRegistrar}
              guardando={guardando}
              onCambiarTipo={cambiarTipo}
              onEditarCampo={editarCampo}
              onConfirmar={confirmarIngreso}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
