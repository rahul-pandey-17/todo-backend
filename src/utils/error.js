export class ApiError extends Error {
  constructor({ statusCode = 500, message = 'Internal server error', details } = {}) {
    super(message)

    this.name = 'ApiError'
    this.statusCode = statusCode

    if (details !== undefined) {
      this.details = details
    }

    Error.captureStackTrace(this, this.constructor)
  }
}
