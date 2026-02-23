<script setup lang="ts">
import { useAuthStore } from '~/features/auth/stores/authStore'
import LoginForm from '~/features/auth/components/LoginForm.vue'
import type { LoginPayload, ApiErrorResponse } from '~/features/auth/types/authTypes'
import { FetchError } from 'ofetch'

const auth = useAuthStore()
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async (payload: LoginPayload) => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    await auth.login(payload)
    navigateTo('/Home')
  } catch (err) {
    if (err instanceof FetchError) {
      const errorData = err.data as ApiErrorResponse
      errorMessage.value = errorData?.error || 'Erro ao realizar login.'
    } else {
      errorMessage.value = 'Ocorreu um erro inesperado.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div class="min-h-screen bg-linear-to-br from-black to-blue-800 flex items-center justify-center">
    <LoginForm 
      @login="handleLogin" 
    />
  </div>
</template>