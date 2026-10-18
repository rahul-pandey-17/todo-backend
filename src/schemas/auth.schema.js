import * as z from 'zod'

export const fullNameSchema = z
  .string()
  .transform((value) => value.trim().replace(/\s+/g, ' '))
  .pipe(
    z
      .string()
      .min(3, 'Full name must be at least 3 characters')
      .max(100, 'Full name must not exceed 100 characters')
      .regex(/^\p{L}[\p{L}\p{M}.'-]*(?: [\p{L}][\p{L}\p{M}.'-]*)+$/u, 'Enter a valid full name'),
  )

export const emailSchema = z
  .email()
  .transform((value) => value.trim().toLowerCase())
  .pipe(z.email('Enter a valid email address').max(254, 'Email must not exceed 254 characters'))

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .refine(
    (value) => !/[\u0000-\u001F\u007F]/.test(value),
    'Password must not contain control characters',
  )

export const signupSchema = z.strictObject({
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
})
