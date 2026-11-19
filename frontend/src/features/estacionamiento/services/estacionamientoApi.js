const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function pedir(url, options = {}) {
  const response = await fetch(url, options)
  const cuerpo = response.status === 204 ? null : await response.json()

  if (!response.ok) {
    throw new Error(cuerpo?.error ?? `Error de API (${response.status})`)
  }

  return cuerpo
}

export async function obtenerPanelEstadias(signal) {
  return pedir(`${API_URL}/api/estadias/panel`, { signal })
}

export async function registrarEntrada(datos) {
  return pedir(`${API_URL}/api/estadias/entrada`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
}

export async function registrarSalida(plazaId) {
  return pedir(`${API_URL}/api/estadias/${plazaId}/salida`, {
    method: 'PATCH',
  })
}


/* 


export async function registrarEntrada(datos) {
  const response = await fetch(
    `${API_URL}/api/estadias/entrada`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    }
  )

  const cuerpo = await response.json()

  if (!response.ok) {
    throw new Error(
      cuerpo?.error ?? `Error de API (${response.status})`
    )
  }

  return cuerpo
}
*/
