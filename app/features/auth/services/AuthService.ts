import type {
  LoginPayload,
  SignupPayload,
  AuthResponse,
} from "~/features/auth/types/AuthTypes";
import type { User } from "~/types/UserTypes";

export const authService = {
  login(payload: LoginPayload) {
    const { $api } = useNuxtApp();
    return $api<AuthResponse>("/login", {
      method: "POST",
      body: payload,
    });
  },

  signup(payload: SignupPayload) {
    const { $api } = useNuxtApp();
    return $api<AuthResponse>("/signup", {
      method: "POST",
      body: payload,
    });
  },

  logout() {
    const { $api } = useNuxtApp();
    return $api("/logout", {
      method: "POST",
    });
  },

  fetchUser() {
    const { $api } = useNuxtApp();
    return $api<User>("/user", {
      method: "GET",
      retry: 0,
    });
  },
};
