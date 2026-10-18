import { asyncHandler } from '../utils/async.js'
import { ApiError } from '../utils/error.js'
import { successResponse } from '../utils/success.js'
import { User } from '../models/user.model.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { generateAccessToken } from '../utils/token.js'
import { COOKIE_OPTIONS } from '../constants.js'
import { env } from '../utils/env.js'

export const signupUser = asyncHandler(async (req, res) => {
  const userDetails = req.validatedBody

  try {
    const newUser = await User.create(userDetails)

    return successResponse(res, {
      statusCode: 201,
      message: 'User signed up',
      data: {
        id: newUser._id.toString(),
        name: newUser.fullName,
        email: newUser.email,
      },
    })
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw new ApiError({
        statusCode: 409,
        message: 'User with this email already exists',
      })
    }

    throw err
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedBody

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new ApiError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new ApiError({
      statusCode: 400,
      message: 'Incorrect password',
    })
  }

  const accessToken = generateAccessToken(user)

  res.cookie('accessToken', accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: env.ACCESS_TOKEN_EXPIRY,
  })

  return successResponse(res, {
    message: 'Logged in',
    data: {
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
    },
  })
})
