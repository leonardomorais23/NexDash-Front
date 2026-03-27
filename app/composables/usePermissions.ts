// composables/usePermissions.ts
import { computed } from 'vue'
import { useAuthStore } from '~/features/auth/stores/authStore'

export const usePermissions = () => {
  const authStore = useAuthStore()

  const hasRole = (role: string): boolean => {
    return authStore.user?.roles?.includes(role) ?? false
  }

  const hasPermission = (permission: string): boolean => {
    return authStore.user?.permissions?.includes(permission) ?? false
  }

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission))
  }

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission))
  }

  const isAdmin = computed(() => hasRole('admin'))

  const canAccessFinanceiro = computed(() =>
    hasPermission('dashboard:financeiro:read') || isAdmin.value
  )

  return {
    hasRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    isAdmin,
    canAccessFinanceiro
  }
}