<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'
import SignupForm from '~/components/auth/SignupForm.vue'
import type { SignupPayload } from '~/types/authTypes'

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