# Estacionamiento API

Backend de Playa con Node.js, Express y TypeScript. Usa Prisma para acceder a PostgreSQL en Neon. La guía completa del proyecto está en el [README principal](../README.md).

```text
src/
├── domain/          entidades y tipos del dominio
├── business/        servicios con las reglas de ingreso, salida y cobro
├── api/             rutas, controladores y middlewares de Express
└── infrastructure/  cliente Prisma, esquema y migraciones
```

Los servicios de `business/services/` importan directamente el cliente exportado por `infrastructure/database/prisma.ts`.

## Desarrollo

Copiá `.env.example` a `.env` y completá `DATABASE_URL` y `DATABASE_URL_UNPOOLED`.

```bash
npm install
npm run prisma:generate
npx prisma migrate deploy --schema=src/infrastructure/database/prisma/schema.prisma
npm run dev
```

| Script | Uso |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga (`tsx watch`). |
| `npm run build` | Compila TypeScript en `dist/`. |
| `npm start` | Ejecuta `dist/server.js`. |
| `npm run lint` | Comprueba tipos sin generar archivos. |
| `npm run prisma:generate` | Genera el cliente Prisma. |
| `npm run prisma:migrate -- --name <nombre>` | Crea y aplica una migración en desarrollo. |
| `npm run prisma:studio` | Abre el explorador de datos. |

## Endpoints

| Método y ruta | Uso |
|---|---|
| `GET /health` | Comprueba que el servidor responde. |
| `GET /api/estadias/panel` | Resumen, plazas, clientes, tarifas y movimientos recientes. |
| `POST /api/estadias/entrada` | Registra un ingreso y ocupa la plaza. |
| `PATCH /api/estadias/:plazaId/salida` | Cierra la estadía, guarda el importe y libera la plaza. |
| `GET /api/plazas` | Lista las plazas. |
| `GET /api/resumen` | Resumen de ocupación. |
| `GET /api/vehiculos` y `GET /api/vehiculos/:id` | Listado y detalle de vehículos. |
| `POST /api/vehiculos` | Alta de vehículo. |
| `PUT /api/vehiculos/:id` | Modificación de vehículo. |
| `DELETE /api/vehiculos/:id` | Baja de vehículo. |

Los contratos y códigos de respuesta se describen en la sección [API](../README.md#api) del README principal.
