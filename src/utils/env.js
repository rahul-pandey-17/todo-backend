import * as z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

const parsedSchema = envSchema.safeParse(process.env)

if (!parsedSchema.success) {
  console.error('Invalid environment variables:', z.flattenError(parsedSchema.error))
  process.exit(1)
}

export const env = parsedSchema.data
