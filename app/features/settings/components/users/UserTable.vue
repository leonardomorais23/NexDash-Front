<script setup lang="ts">
import { onMounted } from "vue";
import { TableHead, TableCell } from "@/components/ui/table";
import AppTable from "@/components/AppTable.vue";
import EditUserModal from "@/features/settings/components/users/EditUserModal.vue";
import { useUserTable } from "~/features/settings/composables/useSettings";
import type { UserTableResponse } from "~/features/settings/types/ConfigTypes";
import { User } from "lucide-vue-next";

const {
  filteredUsers,
  search,
  selectedRole,
  fetchUsers,
  updateUser,
  roles,
  isLoading,
} = useUserTable();

const selectedUser = ref<UserTableResponse | null>(null);
const modalOpen = ref(false);

function openEditModal(user: UserTableResponse) {
  selectedUser.value = { ...user };
  modalOpen.value = true;
}


onMounted(() => fetchUsers());
</script>

<template>
  <div class="p-6">
    <div class="mx-auto w-full max-w-6xl">
      <AppTable
        v-model:search="search"
        v-model:filter="selectedRole"
        :items="filteredUsers"
        :is-loading="isLoading"
        search-placeholder="Pesquisar usuários..."
      >
        <template #filter-options>
          <option value="" class="bg-slate-900">Todos os Perfis</option>
          <option
            v-for="role in roles"
            :key="role"
            :value="role"
            class="bg-slate-900"
          >
            {{ role }}
          </option>
        </template>

        <template #header>
          <TableHead class="font-semibold text-white/80">ID</TableHead>
          <TableHead class="font-semibold text-white/80">Nome</TableHead>
          <TableHead class="font-semibold text-white/80">Email</TableHead>
          <TableHead class="text-center font-semibold text-white/80"
            >Perfil</TableHead
          >
          <TableHead class="text-center font-semibold text-white/80"
            >Ações</TableHead
          >
        </template>

        <template #row="{ item }">
          <TableCell class="text-white/70">{{ item.id }}</TableCell>
          <TableCell class="text-white font-medium">{{ item.name }}</TableCell>
          <TableCell class="text-white/70">{{ item.email }}</TableCell>
          <TableCell class="text-center">
            <span
              class="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] uppercase font-bold text-cyan-300"
            >
              {{ item.roles.join(", ") }}
            </span>
          </TableCell>
          <TableCell class="text-center">
            <button
              class="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 transition-all hover:bg-cyan-400/30 hover:scale-105"
              @click="openEditModal(item)"
            >
              Editar
            </button>
          </TableCell>
        </template>
      </AppTable>
    </div>
  </div>

  <EditUserModal
    :open="modalOpen"
    :user="selectedUser"
    @close="modalOpen = false"
    @save="updateUser"
  />
</template>
