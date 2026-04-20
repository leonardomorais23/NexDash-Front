<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, X } from 'lucide-vue-next'

defineProps<{
  message: string
}>()

const emit = defineEmits(['close'])


</script>

<template>
  <Alert variant="destructive" class="relative mb-4">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle>Ops!</AlertTitle>
    <AlertDescription>
      {{ message }}
    </AlertDescription>
    <button 
      @click="emit('close')" 
      class="absolute right-2 top-2 p-1 hover:bg-destructive-foreground/10 rounded"
    >
      <X class="h-4 w-4" />
    </button>
  </Alert>
</template>