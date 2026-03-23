<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import DashboardDisplay from "../components/DashboardDisplay.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";
import { useDashService } from "@/features/dashboard/services/DashServices";
import type { DashboardResponse } from "@/features/dashboard/types/dashboardTypes";

const { getModules, getDashData } = useDashService();
const currentIndex = ref(0);

const { data: modules } = await useAsyncData('dashboard-modules', () => getModules());

const dashboards = computed(() => modules.value || []);
const currentDash = computed(() => dashboards.value[currentIndex.value]);

const { data: payload, refresh } = await useAsyncData<DashboardResponse>(
  `dash-payload-${currentDash.value?.id}`,
  () => getDashData(currentDash.value!.id), 
  {
    watch: [currentDash],
    immediate: !!currentDash.value,
  }
);

const next = () => {
  if (dashboards.value.length) {
    currentIndex.value = (currentIndex.value + 1) % dashboards.value.length;
  }
};

const prev = () => {
  if (dashboards.value.length) {
    currentIndex.value =
      (currentIndex.value - 1 + dashboards.value.length) %
      dashboards.value.length;
  }
};

onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };
  window.addEventListener("keydown", handleKeyDown);

  const interval = setInterval(() => {
    refresh();
  }, 60000);

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
    clearInterval(interval);
  });
});
</script>

<template>
  <div class="absolute inset-0 flex flex-col p-6 overflow-hidden bg-slate-950">
    <template v-if="currentDash && payload">
      <button
        class="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-white z-50"
        @click="prev"
      >
        <ChevronLeftIcon class="size-10" />
      </button>

      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-white z-50"
        @click="next"
      >
        <ChevronRightIcon class="size-10" />
      </button>

      <div class="flex-1 flex flex-col min-h-0 w-full px-4 lg:px-8"> 
  <Transition mode="out-in" name="dash-slide">
    <DashboardDisplay
      :key="currentDash.id"
      :title="currentDash.title"
      :metrics="payload.metrics"
      :chart-data="payload.history"
    />
  </Transition>
</div>

      <div class="flex justify-center gap-2 pt-4 shrink-0">
        <div
          v-for="(_, i) in dashboards"
          :key="i"
          :class="[
            'h-1.5 rounded-full transition-all duration-300',
            i === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/20',
          ]"
        />
      </div>
    </template>

    <div v-else class="flex flex-1 items-center justify-center text-slate-500">
      {{ dashboards.length === 0 ? 'Nenhum módulo disponível...' : 'Carregando dados...' }}
    </div>
  </div>
</template>