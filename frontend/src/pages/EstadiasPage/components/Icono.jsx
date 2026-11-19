export default function Icono({ nombre, size = 21 }) {
  const iconos = {
    plaza: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></>,
    auto: <><path d="m5 11 1.5-4.2A2 2 0 0 1 8.4 5.5h7.2a2 2 0 0 1 1.9 1.3L19 11" /><path d="M3.5 11h17v6h-17zM6 17v2m12-2v2M6 13h.01M18 13h.01" /></>,
    moto: <><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="m6 17 4-7h4l4 7m-8-7-2-3H5m6 3 3 4h4m-4-4 2-3h3" /></>,
    camioneta: <><path d="M3 8h12v9H3zM15 11h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    monedas: <><ellipse cx="9" cy="6" rx="6" ry="3" /><path d="M3 6v5c0 1.7 2.7 3 6 3s6-1.3 6-3V6M3 11v5c0 1.7 2.7 3 6 3 1.2 0 2.3-.2 3.2-.6" /><ellipse cx="17" cy="14" rx="4" ry="2" /><path d="M13 14v4c0 1.1 1.8 2 4 2s4-.9 4-2v-4" /></>,
    tendencia: <><path d="m3 17 6-6 4 3 8-8" /><path d="M15 6h6v6" /></>,
    reloj: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    calendario: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    flecha: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    mas: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8m-4-4h8" /></>,
    buscar: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4 4" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {iconos[nombre]}
    </svg>
  )
}
