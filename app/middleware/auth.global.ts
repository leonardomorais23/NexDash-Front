import { useAuthStore } from '~/features/auth/stores/authStore'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const isLogged = useCookie('is_logged_in')

  if (to.path === '/login') {
    if (isLogged.value && auth.user) {
      return navigateTo('/')
    }
    return
  }

  if (!isLogged.value) {
    auth.user = null
    return navigateTo('/login')
  }

  if (isLogged.value && !auth.user) {
  try {
    await auth.fetchUser()
  } catch (error: any) {

    const status = error.response?.status || error.statusCode
    if (status === 401 || status === 419) {

      isLogged.value = null
      return navigateTo('/login')
    }
  }
}
})