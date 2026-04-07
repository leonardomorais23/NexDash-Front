import { defineStore } from "pinia";
import { authService } from "~/features/auth/services/AuthService";
import type {
  LoginPayload,
  SignupPayload,
} from "~/features/auth/types/AuthTypes";
import type { User } from "~/types/UserTypes";

export const useAuthStore = defineStore("auth", {
  state: () => {
    const userCookie = useCookie<User | null>("auth_user");

    return {
      user: userCookie.value || null,
      loading: false,
    };
  },

  actions: {
    async withLoading<T>(fn: () => Promise<T>): Promise<T> {
      this.loading = true;
      try {
        return await fn();
      } finally {
        this.loading = false;
      }
    },

    async signup(payload: SignupPayload) {
      return this.withLoading(async () => {
        const data = await authService.signup(payload);
        this.setUser(data.user);
        return data;
      });
    },

    async login(payload: LoginPayload) {
      return this.withLoading(async () => {
        const data = await authService.login(payload);
        this.setUser(data.user);
        return data;
      });
    },

    async logout() {
      return this.withLoading(async () => {
        try {
          await authService.logout();
        } finally {
          this.setUser(null);
        }
      });
    },

    async fetchUser() {
      return this.withLoading(async () => {
        try {
          const user = await authService.fetchUser();
          this.setUser(user);
          return user;
        } catch (error) {
          this.setUser(null);
          throw error;
        }
      });
    },

    setUser(userData: User | null) {
      this.user = userData;
      const userCookie = useCookie<User | null>("auth_user");
      userCookie.value = userData;

      if (!userData) {
        const isLogged = useCookie("is_logged_in");
        isLogged.value = null;
      }
    },
  },
});
