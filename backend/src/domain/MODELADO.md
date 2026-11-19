# Modelo inicial del estacionamiento

```text
Cliente 1 ──── N Vehiculo
Vehiculo 1 ──── N Estadia N ──── 1 Plaza
Tarifa 1 ──── N Estadia
```

- Un `Cliente` puede tener varios vehículos.
- Un `Vehiculo` puede tener muchas estadías históricas, pero como máximo una activa.
- Una `Plaza` puede estar libre o asociada a un vehículo mediante `vehiculoId`.
- Una `Estadia` registra la entrada y, cuando corresponde, la salida, la tarifa y el monto.
- Una `Tarifa` puede aplicarse a muchas estadías.
- Las relaciones se expresan con identificadores; las entidades no contienen dependencias de Express ni de la base de datos.
