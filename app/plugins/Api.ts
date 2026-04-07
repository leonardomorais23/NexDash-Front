import { useAuthStore } from "~/features/auth/stores/AuthStore";

export default defineNuxtPlugin((nuxtApp) => { // 1. Receba o nuxtApp aqui
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  
  // 2. Capture a rota atual aqui no topo para evitar erro de contexto no erro
  const currentRoute = useRoute();

  const clearAllAuth = () => {
    auth.user = null;
    useCookie("auth_user").value = null;
    useCookie("is_logged_in").value = null;
    useCookie("XSRF-TOKEN").value = null;

    useCookie("_token").value = null;
    useCookie("_session").value = null;
  };

  const headers = useRequestHeaders(["cookie"]);

  const getRootUrl = () => config.public.apiBase.replace(/\/api$/, "");

  const needsCsrf = (method?: string) => {
    return ["POST", "PUT", "PATCH", "DELETE"].includes(method || "");
  };

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include",
    headers: {
      ...headers,
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },

    async onRequest({ options }) {
      const xsrfToken = await nuxtApp.runWithContext(() => useCookie("XSRF-TOKEN"));

      if (!xsrfToken.value) {
        try {
          await $fetch(`${getRootUrl()}/sanctum/csrf-cookie`, {
            credentials: "include",
            headers: {
              ...headers,
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          });
        } catch (error) {
          console.error("Erro ao obter CSRF:", error);
        }
      }

      if (needsCsrf(options.method)) {
        const currentToken = xsrfToken.value;
        if (currentToken) {
          options.headers = {
            ...options.headers,
            "X-XSRF-TOKEN": decodeURIComponent(currentToken),
          } as any;
        }
      }
    },

    async onResponseError({ request, response }) {
      const url = request.toString();
      const skipAutoLogoutPaths = ["/dashboard/modules"];

      if (["/login", "/logout"].some((path) => url.includes(path))) {
        return;
      }

      if (skipAutoLogoutPaths.some((path) => url.includes(path))) {
        return;
      }

      if (response.status === 401 || response.status === 419) {

        nuxtApp.runWithContext(() => clearAllAuth());
        if (currentRoute.path !== "/login") {
          await nuxtApp.runWithContext(() => navigateTo("/login"));
        }
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});