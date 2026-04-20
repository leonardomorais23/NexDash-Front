import { ref } from "vue";
import { FetchError } from "ofetch";
import type { ApiErrorResponse } from "@/features/auth/types/AuthTypes";

const errorMessage = ref("");
let timer: ReturnType<typeof setTimeout> | null = null;

export function useErrorHandler() {

  function getErrorMessage(err: unknown, defaultMessage: string = "Ocorreu um erro inesperado. Tente novamente."): string {
    if (err instanceof FetchError) {
      const data = err.data as ApiErrorResponse | undefined;
      return data?.message || data?.error || defaultMessage;
    }
    return defaultMessage;
  }

  function setError(err: unknown, defaultMessage?: string) {
    errorMessage.value = getErrorMessage(err, defaultMessage);

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      errorMessage.value = "";
    }, 15000);
  }

  function clearError() {
    errorMessage.value = "";
    if (timer) clearTimeout(timer);
  }

  return {
    errorMessage, //  exporta a Ref daqui
    setError,      // função para disparar o erro
    clearError,    // Para fechar manualmente no "X"
  };
}