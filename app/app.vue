<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/authStore'

onMounted(() => {
  const auth = useAuthStore()
  auth.fetchUser()
})
</script>

<template>
  <div class="antialiased text-gray-900">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>