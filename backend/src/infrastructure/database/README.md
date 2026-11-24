# Database

Esta parte de `infrastructure` concentra todo lo relacionado con Prisma: el esquema, las migraciones y la instancia compartida del cliente.

```text
database/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── prisma.ts
```

`prisma.ts` exporta la instancia de `PrismaClient`. Los servicios de `business/services/` la importan directamente; no hay una capa de repositorios.

La aplicación usa `DATABASE_URL` y Prisma CLI usa `DATABASE_URL_UNPOOLED`. Neon ofrece una conexión pooled y otra directa; ambas son variables dentro del mismo `backend/.env`.
