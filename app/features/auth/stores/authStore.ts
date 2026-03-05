import { defineStore } from "pinia";
import { authService } from "~/features/auth/services/authService";
import type { LoginPayload } from "~/features/auth/types/authTypes";
import type { User } from "~/types/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    loading: false,
  }),

  actions: {
    async login(payload: LoginPayload) {
      this.loading = true;
      try {
        const data = await authService.login(payload);

        this.user = data.user;

        const isLogged = useCookie("is_logged_in");
        isLogged.value = "true";
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await authService.logout();
        this.user = null;
        const isLogged = useCookie("is_logged_in");
        isLogged.value = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchUser() {
      this.loading = true;
      try {
        const user = await authService.fetchUser();
        this.user = user;
        return user;
      } catch (error: any) {
        this.user = null;

        const statusCode = error.response?.status || error.statusCode;
        if (statusCode === 401 || statusCode === 419) {
          const isLogged = useCookie("is_logged_in");
          isLogged.value = null;
        }
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
