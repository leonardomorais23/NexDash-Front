import type {
  LoginPayload,
  SignupPayload,
  AuthResponse,
} from "~/features/auth/types/AuthTypes";
import type { User } from "~/types/UserTypes";
import type { PermissionOption } from "@/types/ResponseTypes";

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
    return $api<AuthResponse>("/register", {
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
  getPermissions() {
    const { $api } = useNuxtApp();
    return $api<PermissionOption[]>("/permissions", {
      method: "GET",
      retry: 0,
    });
  },
};
