import { computed } from 'vue'
import { useAuthStore } from '~/features/auth/stores/authStore'

export const usePermissions = () => {
  const authStore = useAuthStore()
  const user = computed(() => authStore.user)

  const hasRole = (role: string): boolean => user.value?.roles?.includes(role) ?? false
  const hasPermission = (permission: string): boolean => user.value?.permissions?.includes(permission) ?? false
  const hasAllPermissions = (permissions: string[]): boolean => permissions.every(hasPermission)
  const hasAnyPermission = (permissions: string[]): boolean => permissions.some(hasPermission)

  const isAdmin = computed(() => hasRole('admin'))

  const canAccessDashboard = (slug: string): boolean => 
    hasPermission(`dashboard:${slug}:read`) || isAdmin.value

  return {
    hasRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    isAdmin,
    canAccessDashboard
  }
}