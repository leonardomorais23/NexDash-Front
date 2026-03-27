import type { User } from "~/types/user";
import type { ApiErrorResponse as BaseApiErrorResponse } from "~/types/response";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  user: User;
};

export type ApiErrorResponse = BaseApiErrorResponse;
