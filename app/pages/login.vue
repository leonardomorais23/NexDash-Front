<script setup>
import LoginView from '~/features/auth/views/LoginView.vue'
import AppLoading from '~/components/AppLoading.vue'
import { useAuthStore } from '~/features/auth/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <div class="relative">
    <AppLoading :active="authStore.loading" />

    <div class="login-card"> 
      <LoginView />
    </div>
  </div>
</template>