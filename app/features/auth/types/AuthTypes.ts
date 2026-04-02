import type { User } from "~/types/userTypes";
import type { ApiErrorResponse as BaseApiErrorResponse } from "~/types/responseTypes";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};


export type ApiErrorResponse = BaseApiErrorResponse;
