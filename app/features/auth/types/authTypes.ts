import type { User } from '~/types/user';

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

export interface ApiErrorResponse {
  error: string; 
}