<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import DashboardDisplay from "../components/DashboardDisplay.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";
import { useDashService } from "@/features/dashboard/services/DashServices";
import type { DashboardResponse } from "@/features/dashboard/types/dashboardTypes";

const { getModules, getDashData } = useDashService();
const currentIndex = ref(0);

const {
  data: modules,
  refresh: refreshModules,
  pending: modulesPending,
  error: modulesError,
} = await useAsyncData("dashboard-modules", () => getModules(), {
  server: false,
  immediate: true,
});

const dashboards = computed(() => modules.value || []);
const currentDash = computed(() => dashboards.value[currentIndex.value]);

const modulesHasLoadedOnce = ref(false);
watch(modules, (value) => {
  if (value !== undefined && value !== null) {
    modulesHasLoadedOnce.value = true;
  }
});

const rawPayload = ref<DashboardResponse | null>(null);
const payloadPending = ref(false);
const payloadError = ref<Error | null>(null);

const payload = computed(() => rawPayload.value);

const fetchPayload = async (dashboardId: string) => {
  payloadPending.value = true;
  payloadError.value = null;

  try {
    rawPayload.value = await getDashData(dashboardId);
  } catch (error: any) {
    payloadError.value =
      error instanceof Error ? error : new Error(String(error));
    rawPayload.value = null;
  } finally {
    payloadPending.value = false;
  }
};

watch(
  currentDash,
  (current) => {
    if (current?.id) {
      fetchPayload(current.id);
    }
  },
  { immediate: true },
);

const isModulesLoading = computed(() => modulesPending.value);
const isPayloadLoading = computed(
  () => payloadPending.value && !!currentDash.value,
);

const isLoading = computed(
  () => isModulesLoading.value || isPayloadLoading.value,
);

// const hasModulesLoaded = computed(
//   () => !isModulesLoading.value && modules.value !== undefined,
// );
const hasModulesError = computed(() => !!modulesError.value);
const hasPayloadError = computed(() => !!payloadError.value);
const errorMessage = computed(() => {
  if (modulesError.value) {
    return String((modulesError.value as Error)?.message || modulesError.value);
  }
  if (payloadError.value) {
    return String((payloadError.value as Error)?.message || payloadError.value);
  }
  return "";
});

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

  const interval = setInterval(async () => {
    if (currentDash.value && !isPayloadLoading.value) {
      try {
        const newData = await getDashData(currentDash.value.id);
        rawPayload.value = newData;
      } catch (error) {}
    }
  }, 60000);

  const rotationInterval = setInterval(() => {
    if (dashboards.value.length > 1) {
      next();
    }
  }, 180000);

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
    clearInterval(interval);
    clearInterval(rotationInterval);
  });
});
</script>

<template>
  <div class="absolute inset-0 flex flex-col p-6 overflow-hidden bg-slate-950">
    <template v-if="isLoading">
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

    <template v-else-if="!dashboards.length && modulesHasLoadedOnce">
      <div class="flex flex-1 items-center justify-center text-slate-500">
        Nenhum dashboard disponível no momento
      </div>
    </template>

    <template v-else-if="hasModulesError || hasPayloadError">
      <div class="flex flex-1 items-center justify-center text-red-400">
        Erro ao carregar dados: {{ errorMessage }}
      </div>
    </template>

    <template v-else-if="currentDash && payload">
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
  </div>
</template>


<style>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.5s ease forwards; 
}
</style>