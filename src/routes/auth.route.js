import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { validateInputs } from '../middlewares/input.middleware.js'
import { signupSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router()

router.route('/signup').post(validateInputs(signupSchema), authController.signupUser)

router.route('/login').post(validateInputs(loginSchema), authController.loginUser)

export default router
