<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'
import LoginForm from '~/components/auth/LoginForm.vue'
import type { LoginPayload } from '~/types/authTypes'

const auth = useAuthStore()
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async (payload: LoginPayload) => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    await auth.login(payload)
    navigateTo('/dashboard')
  } catch (error: unknown) { 
    errorMessage.value = 'Credenciais inválidas ou erro no servidor.'
    console.error(error)
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