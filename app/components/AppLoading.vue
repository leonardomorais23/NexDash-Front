<script setup lang="ts">
defineProps<{ active: boolean }>();
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="active"
      class="fixed inset-0 z-100 flex items-center justify-center bg-[#050b1d]/50 backdrop-blur-sm"
    >
      <div class="flex flex-col items-center gap-4">
        <Icon
          name="lucide:loader-2"
          size="50"
          class="text-blue-500 animate-spin drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
        <p class="text-sm text-blue-300 tracking-wide animate-pulse">
          Carregando...
        </p>
      </div>
    </div>
  </Transition>
</template>
