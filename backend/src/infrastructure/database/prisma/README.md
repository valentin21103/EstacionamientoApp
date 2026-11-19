# Prisma — guía rápida

Prisma usa `schema.prisma` para generar un cliente con CRUD.

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```

## CRUD

```ts
prisma.vehiculo.findMany()                      // listar
prisma.vehiculo.findUnique({ where: { id } })   // buscar
prisma.vehiculo.create({ data })                // crear
prisma.vehiculo.update({ where: { id }, data }) // actualizar
prisma.vehiculo.delete({ where: { id } })       // eliminar
```

Otros útiles:

```ts
findFirst()                         // primer resultado
findMany({ where, orderBy, take, skip }) // filtros y paginación
count({ where })                    // contar
upsert({ where, create, update })   // crear o actualizar
$transaction([...])                // varias operaciones juntas
```

## Relaciones

```ts
prisma.vehiculo.findMany({
  where: { tipo: 'AUTO' },
  include: { cliente: true, estadias: true },
  orderBy: { patente: 'asc' },
})
```

## Comandos

```bash
npm run prisma:generate                  # genera el cliente
npm run prisma:migrate -- --name inicial # crea y aplica migración
npm run prisma:studio                    # visor de la base
```
