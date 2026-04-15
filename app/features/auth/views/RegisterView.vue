<script setup lang="ts">
import { useAuthStore } from "~/features/auth/stores/AuthStore";
import type { SignupPayload } from "~/features/auth/types/AuthTypes";
import { useErrorHandler } from "~/features/auth/composables/useErrorHandler";
import SignupForm from "~/features/auth/components/SignupForm.vue";

const auth = useAuthStore();
const { getErrorMessage } = useErrorHandler();
const errorMessage = ref("");

async function handleSignup(payload: SignupPayload) {
  errorMessage.value = "";

  try {
    await auth.signup(payload);
  } catch (err: unknown) {
    errorMessage.value = getErrorMessage(err, "Erro ao cadastrar.");
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-black to-blue-800 flex items-center justify-center"
  >
    <SignupForm @signup="handleSignup" 
      :loading="auth.loading"
      :error="errorMessage"
    />
  </div>
</template>
