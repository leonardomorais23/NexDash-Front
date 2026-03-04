<script setup lang="ts">
import { useAuthStore } from '~/features/auth/stores/authStore'

const auth = useAuthStore()
const isLogged = useCookie('is_logged_in')

onMounted(async () => {
  if (isLogged.value && !auth.user) {
    try {
      await auth.fetchUser()
    } catch {
      isLogged.value = null
      navigateTo('/login')
    }
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>