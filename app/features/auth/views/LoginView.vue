<script setup lang="ts">
import { useAuthStore } from "~/features/auth/stores/AuthStore";
import type { LoginPayload } from "~/features/auth/types/AuthTypes";
import { useErrorHandler } from "~/composables/useErrorHandler";
import LoginForm from "~/features/auth/components/LoginForm.vue";
import ErrorAlert from "~/components/ErrorAlert.vue";

const auth = useAuthStore();

const { setError, errorMessage, clearError } = useErrorHandler();

const handleLogin = async (payload: LoginPayload) => {
  try {
    await auth.login(payload);
    await navigateTo("/dashboards");
  } catch (err: unknown) {
    setError(err, "E-mail ou senha incorretos.");
  }
};
</script>

<template>
  <div class="relative min-h-screen bg-linear-to-br from-black to-blue-800 flex items-center justify-center p-4">
    
    <div v-if="errorMessage" class="fixed top-6 right-6 z-50 w-full max-w-sm animate-in fade-in slide-in-from-right-4 duration-500">
      <ErrorAlert 
        :message="errorMessage" 
        @close="clearError" 
      />
    </div>

    <LoginForm 
      :loading="auth.loading" 
      :error="errorMessage"
      @login="handleLogin" 
    />
  </div>
</template>