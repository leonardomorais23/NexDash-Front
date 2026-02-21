import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware((to, _from) => {
  const auth = useAuthStore()

  if (!auth.token && to.path !== '/login') {
    return navigateTo('/login')
  }
})