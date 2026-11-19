# Estacionamiento API

Backend del proyecto con Node, Express y TypeScript.

```text
src/
├── domain/          entidades y contratos
├── business/        reglas y casos de uso
├── api/             controladores y rutas Express
└── infrastructure/  implementaciones concretas
```

## Desarrollo

```bash
npm install
npm run dev
```

Endpoints iniciales:

- `GET /health`
- `GET /api/plazas`
- `GET /api/resumen`
