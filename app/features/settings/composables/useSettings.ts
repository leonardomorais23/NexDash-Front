import { ref, computed, type ComputedRef, type Ref } from "vue";
import { ConfigService } from "@/features/settings/services/ConfigService";
import { useAsyncState } from "@/composables/useAsyncState";
import type { UserTableResponse } from "@/features/settings/types/ConfigTypes";
import type { DashboardConfig } from "@/features/dashboard/types/DashboardTypes";

type UseUserTableReturn = {
  users: Ref<UserTableResponse[]>;
  filteredUsers: ComputedRef<UserTableResponse[]>;
  search: Ref<string>;
  selectedRole: Ref<string>;
  updateUser: (updatedUser: UserTableResponse) => Promise<void>;
  fetchUsers: () => Promise<void>;
  roles: ComputedRef<string[]>;
  isLoading: Ref<boolean>;
};

type UseManageDashboardReturn = {
  dashboards: Ref<DashboardConfig[]>;
  filteredDashboards: ComputedRef<DashboardConfig[]>;
  search: Ref<string>;
  selectedDash: Ref<string>;
  updateDashboard: (updatedDashboard: DashboardConfig) => Promise<void>;
  fetchDashboards: () => Promise<void>;
  isLoading: Ref<boolean>;
};


export function useManageDashboard(): UseManageDashboardReturn {
  const dashboards = ref<DashboardConfig[]>([]);
  const search = ref("");
  const selectedDash = ref("");
  const asyncState = useAsyncState<DashboardConfig[]>();
  asyncState.loading.value = true;

  async function fetchDashboards() {
    const result = await asyncState.execute(async () => {
      const response = (await ConfigService.getDashboardsConfig()) as unknown as {
        data: DashboardConfig[];
      };
      return response.data;
    }, {
      onError: () => {
        dashboards.value = [];
      },
    });

    if (result) {
      dashboards.value = result;
    }
  }

  async function updateDashboard(updatedDashboard: DashboardConfig) {
    try {
      await ConfigService.updateDashboardConfig(updatedDashboard.id, updatedDashboard);
      const index = dashboards.value.findIndex((d) => d.id === updatedDashboard.id);
      if (index !== -1) {
        dashboards.value[index] = { ...updatedDashboard };
      }
    } catch (error) {
      console.error("Erro ao atualizar dashboard:", error);
    }
  }
  const filteredDashboards = computed(() => {
    if (!Array.isArray(dashboards.value)) return [];

    const searchLower = search.value.toLowerCase();

    return dashboards.value.filter((dashboard) => {
      const matchesSearch =
        !searchLower ||
        dashboard.title.toLowerCase().includes(searchLower);

      const matchesStatus =
        !selectedDash.value ||
        (dashboard.status && dashboard.status.toLowerCase() === selectedDash.value.toLowerCase());

      return matchesSearch && matchesStatus;
    });
  });

  return {
    dashboards,
    filteredDashboards,
    search,
    selectedDash,
    updateDashboard,
    fetchDashboards,
    isLoading: asyncState.loading,
  };
}

export function useUserTable(): UseUserTableReturn {
  const users = ref<UserTableResponse[]>([]);
  const search = ref("");
  const selectedRole = ref("");
  const asyncState = useAsyncState<UserTableResponse[]>();
  asyncState.loading.value = true;

  async function fetchUsers() {
    const result = await asyncState.execute(async () => {
      const response = (await ConfigService.getUsersTableConfig()) as unknown as {
        data: UserTableResponse[];
      };
      return response.data;
    }, {
      onError: () => {
        users.value = [];
      },
    });

    if (result) {
      users.value = result;
    }
  }

  async function updateUser(updatedUser: UserTableResponse) {
    try {
      await ConfigService.updateUsersTableConfig(updatedUser.id, updatedUser);
      const index = users.value.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        users.value[index] = { ...updatedUser };
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  const filteredUsers = computed(() => {
    if (!Array.isArray(users.value)) return [];

    const searchLower = search.value.toLowerCase();

    return users.value.filter((user) => {
      const matchesSearch =
        !searchLower ||
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);

      const matchesRole =
        !selectedRole.value ||
        (user.roles && user.roles.includes(selectedRole.value));

      return matchesSearch && matchesRole;
    });
  });

  const roles = computed(() => {
    if (!Array.isArray(users.value)) return [];

    const allRoles = users.value.flatMap((user) => user.roles || []);
    return [...new Set(allRoles)];
  });

  return {
    users,
    filteredUsers,
    search,
    selectedRole,
    roles,
    isLoading: asyncState.loading,
    updateUser,
    fetchUsers,
  };
}