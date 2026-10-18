import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './utils/env.js'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cookieParser)
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
)

// route imports

// routes

// global error handler

export default app
