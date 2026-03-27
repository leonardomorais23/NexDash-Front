<script setup lang="ts">
import DashView from "~/features/dashboard/views/dashView.vue";

definePageMeta({
  requiresPermission: 'dashboard:financeiro:read'
})
</script>

<template>
  <DashView />
</template>
