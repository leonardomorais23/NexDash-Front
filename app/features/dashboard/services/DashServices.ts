import type { DashboardResponse, DashboardConfig } from "~/features/dashboard/types/dashboardTypes";

export const useDashService = () => {
  const { $api } = useNuxtApp();

  const getModules = async (): Promise<DashboardConfig[]> => {
    return await $api<DashboardConfig[]>("/dashboard/modules", {
      method: "GET",
    });
  };

  const getDashData = async (id: string): Promise<DashboardResponse> => {
    return await $api<DashboardResponse>(`/dashboard/${id}`, {
      method: "GET",
    });
  };

  return {
    getModules,
    getDashData
  };
};