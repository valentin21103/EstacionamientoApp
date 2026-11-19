# PDF 05 — Consumir la API con `useEffect` y `fetch`

## Qué se implementó

```text
frontend
  ↓ fetch
GET /api/plazas
  ↓
Express → repositorio de plazas → datos
```

El servicio está en:

```text
frontend/src/features/estacionamiento/services/estacionamientoApi.js
```

La página usa `useEffect` para pedir datos después del primer render:

```jsx
useEffect(() => {
  async function cargarPlazas() {
    const plazas = await obtenerPlazas()
    setPlazas(plazas)
  }

  cargarPlazas()
}, [])
```

## Tres estados

```text
cargando → “Cargando plazas...”
error    → mensaje de error
éxito    → ListaPlazas
```

`fetch` no considera un `404` o un `500` como error de red. Por eso el servicio revisa `response.ok` y lanza un error manualmente.

## Cancelación

`AbortController` cancela el pedido si la página desaparece antes de recibir la respuesta. La limpieza está en el `return` del efecto.

## URL de la API

El frontend puede usar:

```env
VITE_API_URL="http://localhost:3000"
```

Las variables de Vite que empiezan con `VITE_` son públicas y sirven para configurar el navegador, no para guardar secretos.
