<script setup lang="ts">
import DashboardDisplay from "../components/DashboardDisplay.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";

import { useDashboard } from "@/features/dashboard/composables/UseDashboard";
const dash = useDashboard();
</script>

<template>
  <div class="absolute inset-0 flex flex-col p-6 overflow-hidden bg-slate-950">
    <template v-if="dash.isLoading.value">
      <div class="flex flex-1 min-h-[300px] items-center justify-center">
        <div class="flex flex-col items-center gap-4">
          <Icon
            name="lucide:loader-2"
            size="50"
            class="text-blue-500 animate-spin drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          />
          <p class="text-sm text-blue-300 tracking-wide animate-fade-in">
            Buscando dados...
          </p>
        </div>
      </div>
    </template>

    <template v-else-if="dash.errorMessage.value">
      <div class="flex flex-1 items-center justify-center text-red-400">
        Erro ao carregar dados: {{ dash.errorMessage.value }}
      </div>
    </template>

    <template v-else-if="!dash.modules.value.length && dash.modulesLoaded.value">
      <div class="flex flex-1 items-center justify-center text-slate-500">
        Nenhum dashboard disponível no momento
      </div>
    </template>

    <template v-else-if="dash.currentDash.value && dash.payload.value">
      <button
        class="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-white z-50"
        @click="dash.prev"
      >
        <ChevronLeftIcon class="size-10" />
      </button>

      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-white z-50"
        @click="dash.next"
      >
        <ChevronRightIcon class="size-10" />
      </button>

      <div class="flex-1 flex flex-col min-h-0 w-full px-4 lg:px-8">
        <Transition mode="out-in" name="dash-slide">
          <DashboardDisplay
            :key="dash.currentDash.value?.slug"
            :title="dash.currentDash.value?.title"
            :metrics="dash.payload.value?.metrics"
            :chart-data="dash.payload.value?.history"
          />
        </Transition>
      </div>

      <div class="flex justify-center gap-2 pt-4 shrink-0">
        <div
          v-for="(_, i) in dash.modules.value"
          :key="i"
          :class="[
            'h-1.5 rounded-full transition-all duration-300',
            i === dash.currentIndex.value
              ? 'w-8 bg-blue-500'
              : 'w-2 bg-white/20',
          ]"
        />
      </div>
    </template>
  </div>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease forwards;
}
</style>
