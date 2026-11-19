export default function VehiculoIcono({ tipo }) {
  const formas = {
    AUTO: <><path d="m17 10-1.4-3.3a2 2 0 0 0-1.8-1.2H8.1a2 2 0 0 0-1.8 1.2L5 10l-2 1.5v5h18v-5L19 10z" /><path d="M5 10h14M6 16v2m12-2v2M6 13h.01M18 13h.01" /></>,
    MOTO: <><circle cx="6" cy="16" r="3" /><circle cx="19" cy="16" r="3" /><path d="m6 16 4-7h4l5 7m-9-7-2-3H5m7 3 3 4h4" /></>,
    CAMIONETA: <><path d="M3 8h12v8H3zM15 11h4l3 3v2h-7z" /><circle cx="7" cy="17" r="2" /><circle cx="18" cy="17" r="2" /></>,
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{formas[tipo] ?? formas.AUTO}</svg>
}
