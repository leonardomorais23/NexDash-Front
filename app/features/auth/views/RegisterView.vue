<script setup lang="ts">
import { useAuthStore } from "~/features/auth/stores/AuthStore";
import type { SignupPayload } from "~/features/auth/types/AuthTypes";
import { useErrorHandler } from "~/composables/useErrorHandler";
import SignupForm from "~/features/auth/components/SignupForm.vue";

const auth = useAuthStore();
const { setError, errorMessage, clearError } = useErrorHandler();

async function handleSignup(payload: SignupPayload) {
  try {
    await auth.signup(payload);
  } catch (err: unknown) {
    setError(err, "Erro ao cadastrar.");
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-black to-blue-800 flex items-center justify-center"
  >
    <div
      v-if="errorMessage"
      class="fixed top-6 right-6 z-50 w-full max-w-sm animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <ErrorAlert :message="errorMessage" @close="clearError" />
    </div>
    <SignupForm
      @signup="handleSignup"
      :loading="auth.loading"
      :error="errorMessage"
    />
  </div>
</template>
