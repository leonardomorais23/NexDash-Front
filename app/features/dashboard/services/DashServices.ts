import type { DashboardResponse, DashboardConfig } from "~/features/dashboard/types/DashboardTypes";

export const useDashService = {
  getModules() {
    const { $api } = useNuxtApp();
    return $api<DashboardConfig[]>("/dashboard/modules",
      {
        method: "GET",
        retry: 0,
      });
  },

  getDashData(id: string) {
    const { $api } = useNuxtApp();
    return $api<DashboardResponse>(`/dashboard/${id}`,
      {
        method: "GET",
        retry: 0,
      });
  }
}