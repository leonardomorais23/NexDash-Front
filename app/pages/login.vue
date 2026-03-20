<script setup lang="ts">
import LoginView from '~/features/auth/views/LoginView.vue'
import AppLoading from '~/components/AppLoading.vue'
import { useAuthStore } from '~/features/auth/stores/authStore'

const authStore = useAuthStore()

definePageMeta({
  layout: false,
})

onMounted(() => {
  authStore.preFetchCsrf()
})

</script>

<template>
  <div class="relative min-h-screen">
    <AppLoading :active="authStore.loading" />

    <div class="login-card"> 
      <LoginView />
    </div>
  </div>
</template>