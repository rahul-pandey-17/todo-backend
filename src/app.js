import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './utils/env.js'
import { globalErrorHandler } from './middlewares/error.middleware.js'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
)

// route imports
import authRoutes from './routes/auth.route.js'

// routes
app.use('/api/auth', authRoutes)

// global error handler
app.use(globalErrorHandler)

export default app
