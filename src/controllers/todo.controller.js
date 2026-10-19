import { asyncHandler } from '../utils/async.js'
import { ApiError } from '../utils/error.js'
import { successResponse } from '../utils/success.js'
import { Todo } from '../models/todo.model.js'

export const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.validatedBody

  const newTodo = await Todo.create({
    title,
    description,
    userId: req.user.id,
  })

  return successResponse(res, {
    statusCode: 201,
    message: 'Todo created',
    data: {
      id: newTodo._id.toString(),
      title: newTodo.title,
      description: newTodo.description,
      isCompleted: newTodo.isCompleted,
    },
  })
})

export const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id })

  return successResponse(res, {
    message: 'Todos fetched successfully',
    data: todos,
  })
})
