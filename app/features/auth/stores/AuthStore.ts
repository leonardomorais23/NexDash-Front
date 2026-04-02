import { defineStore } from "pinia";
import { authService } from "~/features/auth/services/AuthService";
import type { LoginPayload, SignupPayload } from "~/features/auth/types/authTypes";
import type { User } from "~/types/userTypes";
import { FetchError } from "ofetch";

const AUTH_COOKIE = "auth_user";
const LOGGED_COOKIE = "is_logged_in";

function useAuthCookie() {
  const userCookie = useCookie<string | null>(AUTH_COOKIE);
  const loggedCookie = useCookie<string | null>(LOGGED_COOKIE);

  const setUser = (user: User, hours = 1) => {
    useCookie<string | null>(AUTH_COOKIE, { maxAge: 60 * 60 * hours }).value =
      JSON.stringify(user);
    useCookie<string | null>(LOGGED_COOKIE, { maxAge: 60 * 60 * hours }).value =
      "true";
  };

  const getUser = (): User | null => {
    if (!userCookie.value) return null;
    try {
      return JSON.parse(userCookie.value);
    } catch {
      return null;
    }
  };

  const clear = () => {
    userCookie.value = null;
    loggedCookie.value = null;
    useCookie("XSRF-TOKEN").value = null;
    useCookie("_token").value = null;
    useCookie("_session").value = null;
  };

  return { setUser, getUser, clear };
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    const { getUser } = useAuthCookie();

    return {
      user: getUser(),
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

    async preFetchCsrf() {
      const xsrfToken = useCookie("XSRF-TOKEN");
      if (xsrfToken.value) return;

      const config = useRuntimeConfig();
      const { $api } = useNuxtApp();
      const rootUrl = config.public.apiBase.replace(/\/api$/, "");

      try {
        await $api(`${rootUrl}/sanctum/csrf-cookie`, {
          method: "GET",
          credentials: "include",
        });
      } catch (error) {
        console.error("Erro ao preparar CSRF:", error);
      }
    },

    async authenticate(
      action: (payload: any) => Promise<{ user: User }>,
      payload: LoginPayload | SignupPayload
    ) {
      const { setUser } = useAuthCookie();

      await this.preFetchCsrf();
      const data = await action(payload);

      this.user = data.user;
      setUser(data.user);

      return data;
    },

    login(payload: LoginPayload) {
      return this.withLoading(() =>
        this.authenticate(authService.login, payload)
      );
    },

    signup(payload: SignupPayload) {
      return this.withLoading(() =>
        this.authenticate(authService.signup, payload)
      );
    },

    logout() {
      return this.withLoading(async () => {
        const { clear } = useAuthCookie();

        await authService.logout();
        this.user = null;
        clear();
      });
    },

    fetchUser() {
      return this.withLoading(async () => {
        const { setUser, clear } = useAuthCookie();

        try {
          const user = await authService.fetchUser();
          this.user = user;
          setUser(user);
          return user;
        } catch (error: unknown) {
          this.user = null;
          clear();

          if (error instanceof FetchError) {
            const status = error.response?.status;
            if (status === 401 || status === 419) {
              useCookie(LOGGED_COOKIE).value = null;
            }
          }

          throw error;
        }
      });
    },
  },
});