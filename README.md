# Playa · Gestión de estacionamiento

Playa permite registrar entradas y salidas de vehículos, consultar qué plazas están libres y calcular el importe de una estadía. La operación se concentra en una sola pantalla de **Estadías**.

Proyecto para la Universidad Tecnológica Nacional. La [carpeta de presentación PPS/TFI](presentacion-pps-tfi/README.md) reúne la documentación académica y sus anexos.

**Contenido:** [Puesta en marcha](#puesta-en-marcha) · [Arquitectura](#arquitectura) · [Infraestructura](#infraestructura) · [Modelo de datos](#modelo-de-datos) · [Frontend](#frontend) · [API](#api) · [Flujo de una estadía](#flujo-de-una-estadía) · [Metodología](#metodología) · [Estado y deuda técnica](#estado-y-deuda-técnica) · [Verificación](#alcance-y-verificación)

## Puesta en marcha

1. Desde la raíz de EstacionamientoApp, copiá `backend/.env.example` a `backend/.env`. Completá `DATABASE_URL` con la conexión agrupada de Neon y `DATABASE_URL_UNPOOLED` con la conexión directa para migraciones. Guardá las credenciales fuera del control de versiones.
2. Si la base de desarrollo está vacía, aplicá las migraciones existentes. Para probar un ingreso, cargá previamente al menos un cliente, una tarifa y una plaza libre compatible.
3. Levantá el backend y el frontend en terminales separadas.

**Backend**

```powershell
cd backend
npm install
npm run prisma:generate
npx prisma migrate deploy --schema=src/infrastructure/database/prisma/schema.prisma
npm run dev
```

**Frontend** · desde la raíz, en otra terminal

```powershell
cd frontend
npm install
npm run dev
```

Abrí `http://127.0.0.1:5173`. La API usa por defecto el puerto `3000`. Si necesitás otra dirección, configurá `VITE_API_URL` en el entorno del frontend. `GET /health` comprueba que Express responde. Que Estadías cargue sus plazas y tarifas comprueba además el recorrido hasta la base de datos.

## Arquitectura

```text
Estadías (React + Vite)
    → estacionamientoApi.js → fetch / HTTP + JSON
    → rutas y controladores de Express
    → servicios de negocio en TypeScript
    → Prisma → PostgreSQL en Neon
```

| Ubicación | Responsabilidad |
|---|---|
| `frontend/src/pages/EstadiasPage/` | Pantalla, CSS y componentes de plazas, métricas, ingreso y movimientos. |
| `frontend/src/pages/EstadiasPage/useEstadias.js` | Carga el panel, administra el estado del formulario y actualiza los datos después de una operación. |
| `frontend/src/features/estacionamiento/services/` | Centraliza las solicitudes con `fetch`, revisa el estado HTTP y devuelve los datos a React. |
| `backend/src/api/` | Rutas, controladores y respuestas de error. |
| `backend/src/business/services/` | Consultas y reglas de ingreso, salida, cobro y ocupación. |
| `backend/src/domain/` | Entidades y tipos del dominio. |
| `backend/src/infrastructure/database/` | Cliente Prisma, esquema y migraciones de PostgreSQL. |

El servidor monta las rutas en `server.ts`. Los servicios de estadías consultan Prisma desde la capa de negocio.

### Cómo se conectan las piezas del backend

1. `server.ts` crea la aplicación Express, configura CORS y el lector de cuerpos JSON, registra las rutas bajo `/api` y agrega los middlewares de rutas inexistentes y errores.
2. Los archivos de `api/routes/` asocian cada método y URL con un controlador. Por ejemplo, `estadiaRoutes.ts` conecta `POST /estadias/entrada` con `RegistrarEntrada`.
3. Los controladores reciben parámetros HTTP y el cuerpo de la solicitud, llaman al servicio y devuelven el resultado en JSON. Las reglas de ocupación y el cálculo del cobro se ejecutan en `EstadiaService.ts`.
4. Los servicios usan el cliente exportado por `prisma.ts`. Prisma traduce las operaciones a consultas de PostgreSQL y permite agrupar cambios con `$transaction`.

La composición es manual. `server.ts` crea `EstacionamientoService` y lo pasa a `EstacionamientoController` por constructor. Los controladores de vehículos y estadías crean una instancia de su servicio dentro del módulo. Los servicios importan el mismo cliente Prisma. Esta estructura organiza responsabilidades por capas y los servicios tienen una dependencia directa de Prisma.

| Tecnología | Versión declarada en los manifiestos | Uso |
|---|---|---|
| React | `^19.2.0` | Componentes, eventos y estado de pantalla. |
| Vite | `^6.4.6` | Servidor de desarrollo y compilación del frontend. |
| Express | `^5.1.0` | Servidor HTTP, rutas y middleware. |
| TypeScript | `^5.9.3` | Tipado y compilación del backend para Node.js. |
| Prisma | `^6.19.3` | Cliente de datos, esquema y migraciones. |

## Infraestructura

En desarrollo se ejecutan dos procesos locales, Vite en `127.0.0.1:5173` y Express en el puerto `3000` por defecto. PostgreSQL vive en Neon. El navegador habla con Express por HTTP y Express accede a la base mediante Prisma.

| Configuración | Dónde se usa | Función |
|---|---|---|
| `DATABASE_URL` | `backend/.env` | Conexión agrupada del servidor a Neon. |
| `DATABASE_URL_UNPOOLED` | `backend/.env` | Conexión directa para las migraciones de Prisma. |
| `PORT` | Entorno del proceso de Express | Cambia el puerto del servidor. |
| `VITE_API_URL` | Entorno del frontend | Dirección de la API que usa el navegador. Es configuración pública. |

`schema.prisma` define el modelo y las conexiones. `prisma.ts` exporta la instancia de `PrismaClient`, y `prisma/migrations/` contiene el SQL versionado. `npm run prisma:generate` genera el cliente a partir del esquema. Para crear y aplicar un cambio de esquema en desarrollo, se usa `npm run prisma:migrate -- --name nombre-del-cambio`. Para aplicar migraciones ya escritas, se usa `prisma migrate deploy` con la ruta al esquema indicada en Puesta en marcha. `npm run prisma:studio` abre el explorador de datos para revisar registros.

En una compilación, Vite genera los archivos estáticos del frontend en `dist/` y TypeScript compila el backend en su propio `dist/`. El comando `npm start` del backend ejecuta `dist/server.js`. El despliegue necesita publicar los estáticos, ejecutar la API con sus variables y configurar el frontend con la URL de esa API.

## Modelo de datos

| Entidad | Qué guarda |
|---|---|
| `Cliente` | Nombre, documento único y teléfono opcional. Puede tener varios vehículos. |
| `Vehiculo` | Patente única, tipo y cliente. Marca y modelo son opcionales. |
| `Plaza` | Número único, estado libre u ocupado, tipo permitido opcional y vehículo actual cuando está asignado. |
| `Tarifa` | Nombre y precio por hora. |
| `Estadia` | Vehículo, plaza, tarifa, fecha de entrada y, al cerrar, fecha de salida e importe. |

Una estadía activa tiene `fechaSalida = null`. Una plaza con `tipoPermitido = null` admite los tres tipos. Las plazas de Auto o Camioneta admiten ambos tipos y las plazas de Moto admiten motos.

### Relaciones y restricciones

```text
Cliente  1 ─── N Vehículo
Vehículo 1 ─── N Estadía
Plaza    1 ─── N Estadía
Tarifa   1 ─── N Estadía

Plaza ─── Vehículo actual (opcional y único)
```

- Las cinco entidades usan un ID entero autoincremental como clave primaria. El documento del cliente, la patente y el número de plaza tienen restricciones de unicidad.
- `Estadia.vehiculoId`, `plazaId` y `tarifaId` son claves foráneas. La migración restringe eliminar un vehículo, plaza o tarifa con estadías vinculadas. También restringe eliminar un cliente con vehículos.
- `Plaza.vehiculoId` es opcional y único. Representa la ocupación actual, mientras que las estadías conservan el historial. La relación opcional usa `ON DELETE SET NULL`.
- La plaza empieza en `LIBRE` y la fecha de entrada usa `now()` por defecto. El precio por hora y el monto se almacenan como decimales de precisión 10 y escala 2. `fechaSalida` y `monto` quedan vacíos durante la estadía.
- `TipoVehiculo` tiene los valores `AUTO`, `MOTO` y `CAMIONETA`. `EstadoPlaza` tiene `LIBRE` y `OCUPADA`. El panel serializa estos valores en minúsculas para React.

## Frontend

`index.html` contiene el nodo raíz. `main.jsx` monta React dentro de ese nodo y `App.jsx` renderiza `EstadiasPage`. La página compone los bloques visuales, y los estilos viven en `index.css` y `EstadiasPage.css`.

| Pieza | Qué controla |
|---|---|
| `EstadiasPage.jsx` | Distribución de la pantalla y avisos de éxito o error. |
| `ResumenMetricas.jsx` | Indicadores que vienen del resumen del panel. |
| `EstadoPlazas.jsx` y `PlazaCard.jsx` | Filtros Todas, Libres y Ocupadas, selección de una plaza libre y acción Cobrar en una ocupada. |
| `RegistrarIngreso.jsx` | Selección de tipo, patente, plaza y tarifa. Permite buscar y elegir un cliente existente. |
| `UltimosMovimientos.jsx` | Presenta las estadías recientes devueltas por la API. Una fila se muestra como entrada o salida según su fecha de egreso. |
| `compatibilidadPlazas.js` | Calcula qué plazas puede seleccionar el operador y qué etiqueta muestra cada tipo. |

El estado compartido del panel y del formulario vive en `useEstadias.js`. El filtro de plazas y la búsqueda de clientes son estados de sus propios componentes. Al montar la página, `useEffect` solicita los datos e instala un mecanismo de cancelación con `AbortController`. Otro efecto actualiza el reloj de permanencia cada diez segundos.

El formulario es controlado. Cada campo muestra un valor de React y sus eventos actualizan ese valor. Al confirmar, el cliente envía la patente con los extremos recortados y en mayúsculas y convierte los identificadores a números. Durante el guardado, las acciones de confirmación y cobro quedan deshabilitadas. El servicio presenta errores HTTP al usuario y la pantalla vuelve a leer el panel tras una operación exitosa.

## API

| Método y ruta | Uso |
|---|---|
| `GET /health` | Comprueba que el servidor HTTP responde. |
| `GET /api/estadias/panel` | Carga resumen, plazas, clientes, tarifas y movimientos recientes. |
| `POST /api/estadias/entrada` | Registra el ingreso y ocupa la plaza. |
| `PATCH /api/estadias/:plazaId/salida` | Cierra la estadía, guarda el importe y libera la plaza. |
| `GET /api/plazas` y `GET /api/resumen` | Consultas individuales de plazas y resumen. |
| `GET /api/vehiculos` y `GET /api/vehiculos/:id` | Listado y detalle de vehículos. |
| `POST /api/vehiculos`, `PUT /api/vehiculos/:id` y `DELETE /api/vehiculos/:id` | Alta, modificación y baja de vehículos desde la API. |

La pantalla actual consume las tres rutas de estadías. El parámetro `:plazaId` es el identificador interno de la plaza. Su número visible, como P06, se usa para identificarla en pantalla.

### Contrato del ingreso

```http
POST /api/estadias/entrada
Content-Type: application/json
```

```json
{
  "patente": "AB123CD",
  "tipo": "AUTO",
  "clienteId": 1,
  "plazaId": 7,
  "tarifaId": 2
}
```

Los IDs son ilustrativos. El ingreso devuelve **201** con `{ estadia, plaza }`. Una plaza, un cliente o una tarifa inexistente produce **404**. Plaza ocupada, tipo incompatible, patente de otro cliente o estadía ya activa producen **400**. La salida recibe el ID en la ruta y devuelve **200** con la estadía cerrada y la plaza actualizada. Puede responder **400** si la plaza ya está libre o **404** si falta la plaza o una estadía activa.

En vehículos, el listado y el detalle devuelven **200**, el alta **201**, la modificación **200** y la eliminación **204**. El detalle responde **404** si el vehículo no existe. El controlador valida que el ID de ruta sea un entero positivo. Los errores manejados se devuelven como `{ "error": "mensaje" }`, y los inesperados como un **500** genérico.

## Flujo de una estadía

1. Al abrir Estadías, React pide el panel. Las plazas se filtran por ocupación y, para registrar un ingreso, por compatibilidad con el vehículo seleccionado.
2. El operador selecciona el tipo, ingresa la patente y elige plaza, tarifa y cliente. El frontend envía esos datos como JSON.
3. El backend verifica que existan la plaza, el cliente y la tarifa, que la plaza esté libre y sea compatible, y que el vehículo no tenga una estadía activa. Guarda el ingreso y marca la plaza como ocupada en una transacción.
4. Al pulsar **Cobrar**, el backend redondea la permanencia hacia arriba a horas enteras, con un mínimo de una hora, y multiplica por el precio por hora. Por ejemplo, una permanencia de 65 minutos se cobra como dos horas.
5. El backend guarda el importe, cierra la estadía y libera la plaza en una transacción. React vuelve a consultar el panel después de cada ingreso o salida exitosa.

En el paso de ingreso, si la patente es nueva el servicio crea el vehículo asociado al cliente. Si ya existe, reutiliza el registro después de verificar su titularidad. En la salida, el servicio lee la tarifa vinculada, escribe `fechaSalida` y `monto`, y pone la plaza en `LIBRE` con `vehiculoId = null`. Si una operación de la transacción falla, sus escrituras se revierten.

## Metodología

La carpeta PPS/TFI propone un **desarrollo incremental por flujos de trabajo**. Cada incremento parte de una necesidad del operador, define un criterio observable, recorre frontend, API y datos, y termina con una verificación y su evidencia. La carpeta académica lo describe como una propuesta de trabajo.

| Incremento | Resultado observable | Evidencia para el proyecto |
|---|---|---|
| Datos y conexión | El panel lee plazas, clientes y tarifas de una base de desarrollo. | Esquema, migración y respuesta del panel. |
| Ingreso | Una plaza libre compatible pasa a ocupada y la estadía queda abierta. | Solicitud de prueba y estado antes y después. |
| Egreso y cobro | Se guarda el monto, la plaza vuelve a estar libre y aparece el movimiento. | Resultado de cobro y consulta posterior. |
| Consulta y operación | Los filtros, la vista de ocupación y el historial reciente representan los datos de la API. | Casos de uso con datos ficticios. |
| Validación y entrega | Otro lector puede instalar la app y repetir el circuito. | Guía, resultados de las pruebas y pendientes identificados. |

Para cada prueba, registrar caso, fecha, entorno, datos ficticios, resultado esperado, resultado observado y evidencia. Los apuntes 03, 05 y 06 cubren estado y eventos, consumo de API y operaciones desde React. Algunos ejemplos conservan nombres y rutas de versiones anteriores. Esta guía describe la estructura actual.

## Estado y deuda técnica

| Tema | Situación actual y trabajo pendiente |
|---|---|
| Operación básica | Están implementados el panel, el ingreso, la ocupación y el egreso con monto. |
| Datos auxiliares | Clientes, tarifas y plazas se leen desde la base. La pantalla de Estadías los utiliza como datos previamente cargados. |
| Validación de solicitudes | Se comprueban reglas de negocio e IDs en algunos controladores. Falta un esquema uniforme de validación del cuerpo y de parámetros de estadías. |
| Ocupación simultánea | Las escrituras están agrupadas en transacciones y se comprueba que la plaza esté libre. Falta verificar el caso de dos ingresos simultáneos y proteger la asignación con una operación atómica o una restricción de estadía activa. |
| Tarifas | El egreso usa el precio de la tarifa al momento del cierre. Para editar tarifas sin cambiar lo que se cobra en estadías abiertas, queda por definir versionado o captura del precio al ingresar. |
| Acceso y despliegue | La versión actual opera sin autenticación y la API configura CORS de forma general. Los controles de acceso son un pendiente antes de una publicación para operación real. |
| Pruebas | Los comandos de lint y compilación verifican el código. Los casos funcionales de abajo requieren ejecución y evidencia en una base de prueba. |

## Alcance y verificación

La versión actual cubre la operación desde Estadías. El editor de planos, el acceso por roles y el cierre de caja quedaron fuera de esta versión. El contador de permanencia se actualiza en pantalla. Los cambios hechos desde otra sesión se ven al volver a consultar el panel.

Para verificar un cambio de punta a punta en desarrollo:

- [ ] Abrir Estadías y comprobar que aparecen plazas, tarifas y clientes.
- [ ] Registrar un auto en una plaza libre de Auto / Camioneta y comprobar que pasa a ocupada.
- [ ] Seleccionar Auto y comprobar que una plaza exclusiva para Moto queda fuera del selector. Seleccionar Moto y comprobar que aparece si está libre.
- [ ] Cobrar una estadía y comprobar que se muestra el importe, aparece la salida en movimientos y se libera la plaza.
- [ ] Recargar y comprobar que el estado registrado se conserva.

Para verificar el código, ejecutá `npm run lint` y `npm run build` en el frontend y en el backend.
