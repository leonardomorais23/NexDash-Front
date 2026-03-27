import { useAuthStore } from '~/features/auth/stores/authStore'
import { usePermissions } from '~/composables/usePermissions'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const isLogged = useCookie('is_logged_in')

  const publicRoutes = ['/login', '/register', '/esqueci-senha']
  const isPublicRoute = publicRoutes.includes(to.path)

  const { hasPermission } = usePermissions()

  const requiredPerm = to.meta.requiresPermission as string
  if (requiredPerm && !hasPermission(requiredPerm)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Acesso negado'
    })
  }

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
    } catch (error: any) {
      const status = error?.response?.status || error?.statusCode
      if (status === 401 || status === 419) {
        isLogged.value = null
        return navigateTo('/login')
      }
    }
  }
})