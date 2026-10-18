import { asyncHandler } from '../utils/async.js'
import { ApiError } from '../utils/error.js'
import { successResponse } from '../utils/success.js'
import { User } from '../models/user.model.js'
import mongoose from 'mongoose'

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
