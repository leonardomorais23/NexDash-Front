import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useDashService } from "@/features/dashboard/services/DashServices";
import type {
  DashboardResponse,
  DashboardConfig,
} from "~/features/dashboard/types/DashboardTypes";

export function useDashboard() {
  const currentIndex = ref(0);

  const modules = ref<DashboardConfig[]>([]);
  const modulesLoading = ref(true);
  const modulesError = ref<Error | null>(null);

  const rawPayload = ref<DashboardResponse | null>(null);
  const payloadLoading = ref(false);
  const payloadError = ref<Error | null>(null);

  const { getModules, getDashData } = useDashService;

  const dashboards = modules;
  const currentDash = computed(() => dashboards.value[currentIndex.value]);

  const isLoading = computed(
    () => modulesLoading.value || payloadLoading.value,
  );

  const errorMessage = computed(() => {
    return (
      modulesError.value?.message ||
      payloadError.value?.message ||
      ""
    );
  });

  async function fetchModules() {
    modulesLoading.value = true;
    modulesError.value = null;

    try {
      modules.value = await getModules();
    } catch (err: unknown) {
      modulesError.value =
        err instanceof Error ? err : new Error(String(err));
    } finally {
      modulesLoading.value = false;
    }
  }

  async function fetchPayload(id: string) {
    payloadLoading.value = true;
    payloadError.value = null;

    try {
      rawPayload.value = await getDashData(id);
    } catch (err: unknown) {
      payloadError.value =
        err instanceof Error ? err : new Error(String(err));
      rawPayload.value = null;
    } finally {
      payloadLoading.value = false;
    }
  }

  function next() {
    if (!dashboards.value.length) return;

    currentIndex.value =
      (currentIndex.value + 1) % dashboards.value.length;
  }

  function prev() {
    if (!dashboards.value.length) return;

    currentIndex.value =
      (currentIndex.value - 1 + dashboards.value.length) %
      dashboards.value.length;
  }

  watch(
    currentDash,
    (dash) => {
      if (dash?.id) fetchPayload(dash.id);
    },
    { immediate: true },
  );


  let interval: any;
  let rotationInterval: any;

  onMounted(() => {
    fetchModules();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKeyDown);

    interval = setInterval(async () => {
      if (currentDash.value && !payloadLoading.value) {
        rawPayload.value = await getDashData(
          currentDash.value.id,
        );
      }
    }, 60000);

    rotationInterval = setInterval(() => {
      if (dashboards.value.length > 1) next();
    }, 180000);

    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
      clearInterval(rotationInterval);
    });
  });


  return {
    modules: computed(() => modules.value),
    dashboards: computed(() => modules.value),
    payload: computed(() => rawPayload.value),
    currentDash,
    currentIndex: computed(() => currentIndex.value),
    isLoading,
    errorMessage,
    next,
    prev,
  };
}