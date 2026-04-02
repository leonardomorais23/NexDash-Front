<script setup lang="ts">
import { useAuthStore } from "~/features/auth/stores/AuthStore";
import type { SignupPayload } from "~/features/auth/types/AuthTypes";
import { FetchError } from "ofetch";
import SignupForm from "~/features/auth/components/SignupForm.vue";

const auth = useAuthStore();
const errorMessage = ref("");

function getErrorMessage(err: unknown): string {
  if (err instanceof FetchError) {
    const data = err.data as { message?: string; error?: string } | undefined;

    return data?.message || data?.error || "Erro ao cadastrar.";
  }

  return "Ocorreu um erro inesperado.";
}

async function handleSignup(payload: SignupPayload) {
  errorMessage.value = "";

  try {
    await auth.signup(payload);

    await navigateTo("/");
  } catch (err: unknown) {
    errorMessage.value = getErrorMessage(err);
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
