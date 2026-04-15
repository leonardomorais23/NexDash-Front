export type ApiErrorResponse = {
  statusCode?: number
  response?: {
    status?: number
  }
  error?: string
  message?: string
}

export interface PermissionOption {
  id: string;
  label: string;
}