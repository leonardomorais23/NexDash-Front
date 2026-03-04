<script setup lang="ts">
defineProps<{
  active: boolean
}>()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="active" 
      class="fixed inset-0 z-100 flex items-center justify-center bg-[#050b1d]/40 backdrop-blur-[2px]"
    >
      <Icon 
        name="lucide:loader-2" 
        size="50"
        class=" text-blue-500 animate-spin" 
      />
    </div>
  </Transition>
</template>