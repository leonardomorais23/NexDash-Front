import type { User } from '~/types/user';

export type LoginPayload = {
  email: string
  password: string
};

export type LoginResponse = {
  user: User;
};

export type SignupPayload = {
  name: string
  email: string
  password: string
};

export type SignupResponse = {
  user: User
};

export type ApiErrorResponse = {
  error: string; 
};