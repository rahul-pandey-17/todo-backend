import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/error.js'
import { env } from '../utils/env.js'

export const authenticateUser = (req, _res, next) => {
  const accessToken = req.cookies?.accessToken

  if (!accessToken) {
    throw new ApiError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET)

  req.user = decoded

  next()
}
