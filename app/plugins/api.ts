import { useAuthStore } from '~/features/auth/stores/authStore';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  const isLogged = useCookie('is_logged_in');

  const headers = useRequestHeaders(['cookie']);

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include", 
    headers: {
      ...headers, 
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    async onResponseError({ request, response }) {

      if (request.toString().includes('/login') || request.toString().includes('/logout')) {
        return;
      }

      if (response.status === 401 || response.status === 419) {
        auth.user = null;
        
        const route = useRoute();
        if (route.path !== '/login') {
          isLogged.value = null; 
          await navigateTo('/login');
        }
      }
    }
  });

  return { provide: { api } };
});