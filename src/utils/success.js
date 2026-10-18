export const successResponse = (
  res,
  { statusCode = 200, message = 'Request successful', data } = {},
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  })
}
