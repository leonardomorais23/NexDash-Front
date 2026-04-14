import { FetchError } from "ofetch";
import type { ApiErrorResponse } from "@/features/auth/types/AuthTypes";

export function useErrorHandler() {
  function getErrorMessage(err: unknown, defaultMessage: string = "Ocorreu um erro inesperado. Tente novamente."): string {
    if (err instanceof FetchError) {
      const data = err.data as ApiErrorResponse | undefined;
      return (
        data?.message || data?.error || defaultMessage
      );
    }
    return defaultMessage;
  }

  return {
    getErrorMessage,
  };
}
