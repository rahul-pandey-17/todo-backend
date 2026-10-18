import { Router } from 'express'
import * as todoController from '../controllers/todo.controller.js'
import { validateInputs } from '../middlewares/input.middleware.js'
import { createTodoSchema } from '../schemas/todo.schema.js'
import { authenticateUser } from '../middlewares/auth.middleware.js'

const router = Router()

router
  .route('/')
  .post(authenticateUser, validateInputs(createTodoSchema), todoController.createTodo)

export default router
