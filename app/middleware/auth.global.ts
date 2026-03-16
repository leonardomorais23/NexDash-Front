import { useAuthStore } from '~/features/auth/stores/authStore'
import type { ApiErrorResponse } from '~/types/response'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const isLogged = useCookie('is_logged_in')

  const publicRoutes = ['/login', '/register', '/esqueci-senha']
  const isPublicRoute = publicRoutes.includes(to.path)


  if (isPublicRoute && isLogged.value && auth.user) {
    return navigateTo('/')
  }

  if (isPublicRoute) {
    return
  }

  if (!isLogged.value) {
    auth.user = null
    return navigateTo('/login')
  }

  if (isLogged.value && !auth.user) {
  try {
    await auth.fetchUser()
  } catch (error) {
    const err = error as ApiErrorResponse

    const status = err.response?.status || err.statusCode
    if (status === 401 || status === 419) {

      isLogged.value = null
      return navigateTo('/login')
    }
  }
}
})