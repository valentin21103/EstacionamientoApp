import type { ErrorRequestHandler } from 'express'

type ErrorConEstado = Error & { status?: number }

export const errorMiddleware: ErrorRequestHandler = (
  error: ErrorConEstado,
  _request,
  response,
  _next,
) => {
  const status = error.status ?? 500

  response.status(status).json({
    error: status === 500 ? 'Error interno del servidor' : error.message,
  })
}
