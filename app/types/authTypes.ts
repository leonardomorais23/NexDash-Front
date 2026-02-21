import type { User } from './user'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  user: User;
}

export interface SignupPayload {
  name: string
  email: string
  password: string
}

export interface SignupResponse {
  user: User
}