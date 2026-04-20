import { ref } from "vue";

export function useAsyncState<T>() {
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const data = ref<T | null>(null);

  async function execute(
    fn: () => Promise<T>,
    options?: {
      onSuccess?: (result: T) => void;
      onError?: (error: Error) => void;
    },
  ): Promise<T | undefined> {
    loading.value = true;
    error.value = null;

    try {
      const result = await fn();
      data.value = result;
      options?.onSuccess?.(result);
      return result;
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      error.value = errorObj;
      options?.onError?.(errorObj);
      return undefined;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    data,
    execute,
    reset: () => {
      loading.value = false;
      error.value = null;
      data.value = null;
    },
  };
}
