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

export const getTodo = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const todoId = req.params.id

  const todo = await Todo.findOne({ _id: todoId, userId })

  if (!todo) {
    throw new ApiError({
      statusCode: 404,
      message: 'Todo not found',
    })
  }

  return successResponse(res, {
    message: 'Todo fetched successfully',
    data: todo,
  })
})

export const updateTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.validatedBody
  const todoId = req.params.id
  const userId = req.user.id

  const updates = {}

  if (title !== undefined) {
    updates.title = title
  }

  if (description !== undefined) {
    updates.description = description
  }

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId, userId },
    { $set: updates },
    { returnDocument: 'after' },
  )

  return successResponse(res, {
    message: 'Todo updated successfully',
    data: updatedTodo,
  })
})

export const deleteTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.id
  const userId = req.user.id

  const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, userId })

  return successResponse(res, {
    message: 'Todo deleted successfully',
    data: deletedTodo,
  })
})
