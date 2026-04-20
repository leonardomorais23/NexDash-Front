import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useDashService } from "@/features/dashboard/services/DashServices";
import { useAsyncState } from "@/composables/useAsyncState";
import type {
  DashboardResponse,
  DashboardConfig,
} from "~/features/dashboard/types/DashboardTypes";

export function useDashboard() {
  const currentIndex = ref(0);
  const modulesState = useAsyncState<DashboardConfig[]>();
  const payloadState = useAsyncState<DashboardResponse>();
  const modulesLoaded = ref(false);

  modulesState.loading.value = true;

  const { getModules, getDashData } = useDashService;

  const modules = computed<DashboardConfig[]>(
    () => modulesState.data.value ?? [],
  );

  const currentDash = computed(
    () => modules.value[currentIndex.value],
  );

  const payload = computed<DashboardResponse | null>(
    () => payloadState.data.value ?? null,
  );

  const isLoading = computed(
    () => modulesState.loading.value || payloadState.loading.value,
  );

  const errorMessage = computed(() => {
    return (
      modulesState.error.value?.message ||
      payloadState.error.value?.message ||
      ""
    );
  });

  async function fetchModules() {
    await modulesState.execute(async () => getModules());
    modulesLoaded.value = true;
  }

  async function fetchPayload(id: string) {
    await payloadState.execute(async () => getDashData(id), {
      onError: () => {
        payloadState.data.value = null;
      },
    });
  }

  function next() {
    if (!modules.value.length) return;

    currentIndex.value =
      (currentIndex.value + 1) % modules.value.length;
  }

  function prev() {
    if (!modules.value.length) return;

    currentIndex.value =
      (currentIndex.value - 1 + modules.value.length) %
      modules.value.length;
  }

  watch(
    currentDash,
    (dash) => {
      if (dash?.slug) fetchPayload(dash.slug);
    },
    { immediate: true },
  );

  let interval: number;
  let rotationInterval: number;
  let handleKeyDown: ((e: KeyboardEvent) => void) | null = null;

  onMounted(() => {
    fetchModules();

    handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKeyDown);

    interval = setInterval(async () => {
      if (currentDash.value && !payloadState.loading.value) {
        await payloadState.execute(async () =>
          getDashData(currentDash.value!.slug),
          {
            onError: () => {
              payloadState.data.value = null;
            },
          },
        );
      }
    }, 60000);

    rotationInterval = setInterval(() => {
      if (modules.value.length > 1) next();
    }, 180000);
  });

  onUnmounted(() => {
    if (handleKeyDown) {
      window.removeEventListener("keydown", handleKeyDown);
    }
    clearInterval(interval);
    clearInterval(rotationInterval);
  });

  return {
    modules,
    payload,
    currentDash,
    currentIndex: computed(() => currentIndex.value),
    isLoading,
    errorMessage,
    modulesLoaded,
    next,
    prev,
  };
}