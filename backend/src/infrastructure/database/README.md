# Database

Prisma pertenece a esta parte de `infrastructure`: acá vivirá el cliente generado, la configuración de conexión y los repositorios que implementen las interfaces del dominio.

Todo lo relacionado con Prisma se mantiene dentro de esta capa:

```text
database/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── prisma.ts
└── repositories/
```

La aplicación usa `DATABASE_URL` y Prisma CLI usa `DATABASE_URL_UNPOOLED`. Neon ofrece una conexión pooled y otra directa; ambas son variables dentro del mismo `backend/.env`.
