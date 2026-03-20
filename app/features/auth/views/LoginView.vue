<script setup lang="ts">
import { useAuthStore } from "~/features/auth/stores/authStore";
import LoginForm from "~/features/auth/components/LoginForm.vue";
import type { LoginPayload, ApiErrorResponse } from "~/features/auth/types/authTypes";
import { FetchError } from "ofetch";

const auth = useAuthStore();
const errorMessage = ref("");

const handleLogin = async (payload: LoginPayload) => {
  errorMessage.value = "";

  try {
    await auth.login(payload);
    
    await navigateTo("/");
  } catch (err: unknown) {
    if (err instanceof FetchError) {
      const errorData = err.data as ApiErrorResponse;
      errorMessage.value = errorData?.error || "E-mail ou senha incorretos.";
    } else {
      errorMessage.value = "Ocorreu um erro inesperado. Tente novamente.";
    }
  }
};
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-black to-blue-800 flex items-center justify-center">
    <LoginForm 
      :loading="auth.loading" 
      :error="errorMessage"
      @login="handleLogin" 
    />
  </div>
</template>