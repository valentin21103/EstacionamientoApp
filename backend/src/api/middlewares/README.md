# Middlewares de API

Esta sección centraliza las respuestas HTTP que no pertenecen a un recurso específico.

```text
400 → pedido inválido
404 → recurso o ruta inexistente
500 → error inesperado del servidor
```

Los controladores responden los casos propios de su recurso. El middleware se ocupa de errores generales y rutas que no existen.
