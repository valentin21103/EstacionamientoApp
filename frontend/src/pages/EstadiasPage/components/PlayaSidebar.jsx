import Icono from './Icono.jsx'

export default function PlayaSidebar() {
  return (
    <aside className="playa-sidebar">
      <a className="playa-brand" href="#estadias" aria-label="Playa, estadías">
        <span className="playa-brand__p">P</span><span>Playa</span>
      </a>
      <div className="playa-sidebar__label">ESTACIONAMIENTO</div>
      <nav aria-label="Módulo principal">
        <a className="playa-nav-item playa-nav-item--active" href="#estadias">
          <Icono nombre="reloj" /><span>Estadías</span>
        </a>
      </nav>
      <div className="playa-sidebar__footer">Gestión de estacionamiento</div>
    </aside>
  )
}
