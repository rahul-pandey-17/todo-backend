import jwt from 'jsonwebtoken'
import { env } from './env.js'

export const generateAccessToken = (user) => {
  const accessTokenPayload = {
    id: user._id.toString(),
    name: user.fullName,
    email: user.email,
  }

  return jwt.sign(accessTokenPayload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  })
}
