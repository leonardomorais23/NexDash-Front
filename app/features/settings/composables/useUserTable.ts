import { ref, computed, type ComputedRef, type Ref } from "vue";
import { ConfigService } from "@/features/settings/services/ConfigService";
import { useAsyncState } from "@/composables/useAsyncState";
import type { UserTableResponse } from "@/features/settings/types/ConfigTypes";

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
