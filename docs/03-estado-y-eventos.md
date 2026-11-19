# PDF 03 — Estado y eventos

## Qué aplicamos al estacionamiento

| PDF | Aplicación |
|---|---|
| `useState` | `filtro` y `plazas` viven en `EstacionamientoPage` |
| `onClick` | botones Todas, Libres y Ocupadas |
| `onChange` | inputs controlados del formulario de entrada |
| `onSubmit` | registra el formulario sin recargar la página |
| Estado levantado | la página modifica plazas y pasa datos por props |
| Inmutabilidad | `map` crea un array nuevo al ocupar o liberar |
| Estado calculado | las plazas visibles se obtienen con `filter` |

## Flujo

```text
EstacionamientoPage
├── RegistrarVehiculoForm
│   └── onRegistrar(vehiculo)
└── ListaPlazas
    └── PlazaCard
        └── onLiberar(id)
```

El formulario es controlado: su `value` sale del estado y cada `onChange` lo actualiza.

Por ahora las acciones actualizan el estado local para estudiar React. El próximo paso será reemplazar esos callbacks por llamadas a la API para que la entrada y la salida se guarden en PostgreSQL.
