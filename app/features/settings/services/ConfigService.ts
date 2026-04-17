import type { UserTableResponse } from "~/features/settings/types/ConfigTypes";
import type { DashboardConfig } from "~/features/dashboard/types/DashboardTypes";

export const ConfigService = {
  getUsersTableConfig() {
    const { $api } = useNuxtApp();
    return $api<UserTableResponse[]>("/settings/users", {
      method: "GET",
      retry: 0,
    });
  },

  updateUsersTableConfig(id: number, userData: Partial<UserTableResponse>) {
    const { $api } = useNuxtApp();

    return $api<UserTableResponse[]>(`/settings/users/${id}`, {
      method: "PATCH",
      body: userData,
    });
  },

  getDashboardsConfig() {
    const { $api } = useNuxtApp();
    return $api<DashboardConfig[]>("/settings/dashboards", {
      method: "GET",
      retry: 0,
    });
  },

  updateDashboardConfig(id: number, dashboardData: Partial<DashboardConfig>) {
    const { $api } = useNuxtApp();

    return $api<DashboardConfig[]>(`/settings/dashboards/${id}`, {
      method: "PATCH",
      body: dashboardData,
    });
  },
  createDashboard(dashboardData: Partial<DashboardConfig>) {
    const { $api } = useNuxtApp();
    return $api<DashboardConfig[]>("/settings/dashboards", {
      method: "POST",
      body: dashboardData,
    });
  }
};
