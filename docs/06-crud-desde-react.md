# PDF 06 — CRUD real desde React

## Flujo de entrada

```text
RegistrarVehiculoForm
  → POST /api/estadias/entrada
  → EstadiaService
  → Prisma transaction
  → PostgreSQL
  → respuesta con estadía y plaza actualizada
  → setPlazas(...)
```

## Flujo de salida

```text
PlazaCard
  → PATCH /api/estadias/:plazaId/salida
  → calcula el monto
  → cierra la estadía
  → libera la plaza
  → React reemplaza esa plaza con la respuesta
```

## Puntos importantes

- Los pedidos envían JSON con `Content-Type: application/json`.
- React actualiza el estado solo después de una respuesta exitosa.
- Los errores `400` y `404` se muestran en la página.
- Los botones se deshabilitan mientras hay una operación en curso.
- La entrada y la salida se guardan en PostgreSQL; recargar la página no pierde los cambios.

Para probar una entrada deben existir previamente un `Cliente`, una `Tarifa` y una `Plaza` libre en la base.
