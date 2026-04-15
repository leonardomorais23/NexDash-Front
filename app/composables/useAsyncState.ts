import { ref, reactive } from "vue";

export function useAsyncState<T = any>() {
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const data = ref<T | null>(null);

  async function execute<R = T>(
    fn: () => Promise<R>,
    options?: {
      onSuccess?: (result: R) => void;
      onError?: (error: Error) => void;
    },
  ): Promise<R | undefined> {
    loading.value = true;
    error.value = null;

    try {
      const result = await fn();
      data.value = result as any;
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
