export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  return {
    provide: {
      api,
    },
  };
});