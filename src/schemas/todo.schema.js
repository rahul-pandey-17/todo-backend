import * as z from 'zod'

export const titleSchema = z
  .string()
  .min(5, 'Title should be atleast 5 characters long')
  .max(100, 'Title should not exceed 100 characters')

export const descriptionSchema = z
  .string()
  .max(500, 'Description should not exceed 500 characters')
  .optional()

export const createTodoSchema = z.strictObject({
  title: titleSchema,
  description: descriptionSchema,
})
