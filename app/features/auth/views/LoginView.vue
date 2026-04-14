<script setup lang="ts">
import { useAuthStore } from "~/features/auth/stores/AuthStore";
import type { LoginPayload } from "~/features/auth/types/AuthTypes";
import { useErrorHandler } from "~/features/auth/composables/useErrorHandler";
import LoginForm from "~/features/auth/components/LoginForm.vue";


const auth = useAuthStore();
const { getErrorMessage } = useErrorHandler();
const errorMessage = ref("");

const handleLogin = async (payload: LoginPayload) => {
  errorMessage.value = "";

  try {
    await auth.login(payload);
    await navigateTo("/");
  } catch (err: unknown) {
    errorMessage.value = getErrorMessage(err, "E-mail ou senha incorretos.");
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