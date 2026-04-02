<script setup lang="ts">
import { useAuthStore } from "~/features/auth/stores/AuthStore";
import type { LoginPayload, ApiErrorResponse } from "~/features/auth/types/AuthTypes";
import { FetchError } from "ofetch";
import LoginForm from "~/features/auth/components/LoginForm.vue";


const auth = useAuthStore();
const errorMessage = ref("");

function getErrorMessage(err: unknown): string {
  if (err instanceof FetchError) {
    const data = err.data as ApiErrorResponse | undefined;

    return (
      data?.message ||
      data?.error ||
      "E-mail ou senha incorretos."
    );
  }

  return "Ocorreu um erro inesperado. Tente novamente.";
}

const handleLogin = async (payload: LoginPayload) => {
  errorMessage.value = "";

  try {
    await auth.login(payload);
    await navigateTo("/");
  } catch (err: unknown) {
    errorMessage.value = getErrorMessage(err);
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