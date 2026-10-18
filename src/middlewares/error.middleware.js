import { ApiError } from '../utils/error.js'

export const globalErrorHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    console.error(err)

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    })
  }

  console.error(err)

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}
