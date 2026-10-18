import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { validateInputs } from '../middlewares/input.middleware.js'
import { signupSchema } from '../schemas/auth.schema.js'

const router = Router()

router.route('/signup').post(validateInputs(signupSchema), authController.signupUser)

export default router
