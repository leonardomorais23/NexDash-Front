<script setup lang="ts">
import { useAuthStore } from '~/features/auth/stores/authStore'
import SignupForm from '~/features/auth/components/SignupForm.vue'
import type { SignupPayload } from '~/features/auth/types/authTypes'

function handleSignup(payload: SignupPayload) {
  const auth = useAuthStore()
  auth.signup(payload)
  console.log('Signup payload:', payload)
}

</script>

<template>
    <div class="min-h-screen bg-linear-to-br from-black to-blue-800 flex items-center justify-center">
        <SignupForm @signup="handleSignup" />
    </div>
</template>