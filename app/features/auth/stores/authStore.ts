import { defineStore } from "pinia";
import { authService } from "~/features/auth/services/authService";
import type { LoginPayload, SignupPayload } from "~/features/auth/types/authTypes";
import type { User } from "~/types/user";
import { FetchError } from "ofetch";

function setUserCookie(user: User, hours = 1) {
  const cookie = useCookie("auth_user", { maxAge: 60 * 60 * hours }); 
  cookie.value = JSON.stringify(user);
}

function getUserCookie(): User | null {
  const cookie = useCookie("auth_user");
  if (!cookie.value) return null;
  try {
    return JSON.parse(cookie.value) as User;
  } catch {
    return null;
  }
}

function clearUserCookie() {
  const cookie = useCookie("auth_user");
  cookie.value = null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getUserCookie(), 
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
        setUserCookie(data.user, 1); 

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
        clearUserCookie(); 
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
        setUserCookie(user, 1); 
        return user;
      } catch (error: unknown) {
        this.user = null;
        clearUserCookie();
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

    async signup(payload: SignupPayload) {
      this.loading = true;
      try {
        await this.preFetchCsrf();
        const data = await authService.signup(payload);

        this.user = data.user;
        setUserCookie(data.user, 1); 

        const isLogged = useCookie("is_logged_in");
        isLogged.value = "true";

        return data;
      } finally {
        this.loading = false;
      }
    },
  },
});