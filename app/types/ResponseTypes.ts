export type ApiErrorResponse = {
  statusCode?: number
  response?: {
    status?: number
  }
  error?: string
  message?: string
}