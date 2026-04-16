<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useManageDashboard } from "~/features/settings/composables/useSettings";
import EditDashboardModal from "@/features/settings/components/manage-dashboards/EditDashboardModal.vue";
import type { DashboardConfig } from "@/features/dashboard/types/DashboardTypes";

const {
  filteredDashboards,
  isLoading,
  search,
  selectedDash,
  updateDashboard,
  fetchDashboards,
} = useManageDashboard();

const selectedDashboard = ref<DashboardConfig | null>(null);
const modalOpen = ref(false);

function openEditModal(dashboard: DashboardConfig) {
  selectedDashboard.value = { ...dashboard };
  modalOpen.value = true;
}

async function handleSave(updatedDashboard: DashboardConfig) {
  await updateDashboard(updatedDashboard);
  modalOpen.value = false;
}

onMounted(() => {
  fetchDashboards();
});
</script>

<template>
  <div class="p-6">
    <div class="mx-auto w-full max-w-6xl space-y-4">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          v-model="search"
          type="text"
          placeholder="Pesquisar Dashboards..."
          class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 placeholder:text-white/40 backdrop-blur-md transition-all focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 md:col-span-2"
        />

        <select
          v-model="selectedDash"
          class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur-md transition-all focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
        >
          <option value="" class="bg-slate-900 text-white">
            Todos os Status
          </option>
          <option value="ativo" class="bg-slate-900 text-white">
            Ativo
          </option>
          <option value="inativo" class="bg-slate-900 text-white">
            Inativo
          </option>
        </select>
      </div>

      <div
        class="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg"
      >
        <Table>
          <TableHeader class="bg-white/[0.03]">
            <TableRow class="border-b border-white/10">
              <TableHead class="font-semibold text-white/80">ID</TableHead>
              <TableHead class="font-semibold text-white/80">Nome</TableHead>
              <TableHead class="text-center font-semibold text-white/80"
                >Status</TableHead
              >
              <TableHead class="text-center font-semibold text-white/80"
                >Ações</TableHead
              >
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-if="isLoading">
              <TableCell
                colspan="5"
                class="py-10 text-center text-cyan-400/60 animate-pulse"
              >
                Carregando dados...
              </TableCell>
            </TableRow>

            <TableRow
              v-else
              v-for="item in filteredDashboards"
              :key="item.id"
              class="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
            >
              <TableCell class="text-white/70">{{ item.id }}</TableCell>
              <TableCell class="text-white font-medium">{{
                item.title
              }}</TableCell>
              <TableCell class="text-center">
                <span
                  class="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-cyan-300"
                >
                  {{ item.status || 'Ativo' }}
                </span>
              </TableCell>
              <TableCell class="text-center">
                <button
                  class="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 transition-all hover:bg-cyan-400/30 hover:scale-105 active:scale-95"
                  @click="openEditModal(item)"
                >
                  Editar
                </button>
              </TableCell>
            </TableRow>

            <TableRow v-if="!isLoading && filteredDashboards.length === 0">
              <TableCell colspan="5" class="py-10 text-center text-white/40">
                Nenhum dashboard encontrado.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>

  <EditDashboardModal
    :open="modalOpen"
    :dashboard="selectedDashboard"
    @close="modalOpen = false"
    @save="handleSave"
  />
</template>
