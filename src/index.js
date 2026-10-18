import app from './app.js'
import { env } from './utils/env.js'
import mongoose from 'mongoose'

const start = async () => {
  try {
    const db = await mongoose.connect(env.DATABASE_URI)
    console.log(`Database connected\nHost: ${db.connection.host}`)

    const PORT = env.PORT

    app.listen(PORT, () => {
      console.log(`Server is live on: http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
