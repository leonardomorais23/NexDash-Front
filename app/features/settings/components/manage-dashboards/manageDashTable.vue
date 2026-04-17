<script setup lang="ts">
import { onMounted } from "vue";
import { TableHead, TableCell } from "@/components/ui/table";
import AppTable from "@/components/AppTable.vue";
import EditDashboardModal from "@/features/settings/components/manage-dashboards/DashboardModal.vue";
import { useManageDashboard } from "~/features/settings/composables/useSettings";
import type { DashboardConfig } from "~/features/dashboard/types/DashboardTypes";
import { ConfigService } from "~/features/settings/services/ConfigService";

const {
  filteredDashboards,
  isLoading,
  search,
  selectedDash,
  updateDashboard,
  fetchDashboards,
} = useManageDashboard();

const selectedDashboard = ref(null);
const modalOpen = ref(false);

function openEditModal(dashboard: any) {
  selectedDashboard.value = { ...dashboard };
  modalOpen.value = true;
}
function openCreateModal() {
  selectedDashboard.value = null;

  modalOpen.value = true;
}
async function handleSave(data: DashboardConfig) {
  if (selectedDashboard.value) {
    await updateDashboard(data);
  } else {
    await ConfigService.createDashboard(data);
  }
  modalOpen.value = false;
}

onMounted(() => fetchDashboards());
</script>

<template>
  <div class="p-6">
    <div class="mx-auto w-full max-w-6xl">
      <AppTable
        v-model:search="search"
        v-model:filter="selectedDash"
        :items="filteredDashboards"
        :is-loading="isLoading"
        search-placeholder="Pesquisar Dashboards..."
      >
        <template #actions>
          <button
            @click="openCreateModal"
            class="flex h-[46px] items-center gap-2 whitespace-nowrap rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Dashboard
          </button>
        </template>
        <template #filter-options>
          <option value="" class="bg-slate-900">Todos os Status</option>
          <option value="ativo" class="bg-slate-900">Ativo</option>
          <option value="inativo" class="bg-slate-900">Inativo</option>
        </template>

        <template #header>
          <TableHead class="font-semibold text-white/80">ID</TableHead>
          <TableHead class="font-semibold text-white/80">Nome</TableHead>
          <TableHead class="text-center font-semibold text-white/80"
            >Status</TableHead
          >
          <TableHead class="text-center font-semibold text-white/80"
            >Ações</TableHead
          >
        </template>

        <template #row="{ item }">
          <TableCell class="text-white/70">{{ item.id }}</TableCell>
          <TableCell class="text-white font-medium">{{ item.name }}</TableCell>
          <TableCell class="text-center">
            <span
              class="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] uppercase font-bold text-cyan-300"
            >
              {{ item.status || "Ativo" }}
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

  <EditDashboardModal
    :open="modalOpen"
    :dashboard="selectedDashboard"
    @close="modalOpen = false"
    @save="handleSave"
  />
</template>
