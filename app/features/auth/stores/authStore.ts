import { defineStore } from "pinia";
import { authService } from "~/features/auth/services/authService";
import type { LoginPayload } from "~/features/auth/types/authTypes";
import type { User } from "~/types/user";
import { FetchError } from "ofetch";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    loading: false,
  }),

  actions: {
    async preFetchCsrf() {
      const xsrfToken = useCookie("XSRF-TOKEN");
      if (xsrfToken.value) return;

      const config = useRuntimeConfig();
      const { $api } = useNuxtApp();
      const rootUrl = config.public.apiBase.replace(/\/api$/, "");

      try {
        await $api(`${rootUrl}/sanctum/csrf-cookie`);
      } catch (error) {
        console.error("Erro silencioso ao preparar CSRF:", error);
      }
    },

    async login(payload: LoginPayload) {
      this.loading = true;
      try {
        await this.preFetchCsrf();

        const data = await authService.login(payload);

        this.user = data.user;

        const isLogged = useCookie("is_logged_in");
        isLogged.value = "true";

        return data;
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
      } catch (error: unknown) {
        this.user = null;
        if (error instanceof FetchError) {
          const statusCode = error.response?.status;
          if (statusCode === 401 || statusCode === 419) {
            const isLogged = useCookie("is_logged_in");
            isLogged.value = null;
          }
        }
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
