// features/dashboard/services/dashService.ts
import type { DashboardResponse, DashboardConfig } from "@/features/dashboard/types/dashboardTypes";

export const dashService = {
  async getModules(): Promise<DashboardConfig[]> {
    const { $api } = useNuxtApp();
    return await $api<DashboardConfig[]>("/dashboard/modules", {
      method: "GET",
    });
  },

  /**
   * @param id
   */
  async getDashData(id: string): Promise<DashboardResponse> {
    const { $api } = useNuxtApp();
    return await $api<DashboardResponse>(`/dashboard/${id}`, {
      method: "GET",
    });
  }
};