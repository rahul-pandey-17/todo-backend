import { Router } from 'express'
import * as todoController from '../controllers/todo.controller.js'
import { validateInputs } from '../middlewares/input.middleware.js'
import { createTodoSchema, updateTodoSchema } from '../schemas/todo.schema.js'
import { authenticateUser } from '../middlewares/auth.middleware.js'

const router = Router()

router
  .route('/')
  .post(authenticateUser, validateInputs(createTodoSchema), todoController.createTodo)

router.route('/').get(authenticateUser, todoController.getAllTodos)

router.route('/:id').get(authenticateUser, todoController.getTodo)

router
  .route('/:id')
  .patch(authenticateUser, validateInputs(updateTodoSchema), todoController.updateTodo)

router.route('/:id').delete(authenticateUser, todoController.deleteTodo)

export default router
