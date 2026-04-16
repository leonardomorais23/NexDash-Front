<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { DashboardConfig } from "@/features/dashboard/types/DashboardTypes";

const props = defineProps<{
  open: boolean;
  dashboard: DashboardConfig | null;
}>();

const emit = defineEmits<{
  close: [];
  save: [dashboard: DashboardConfig];
}>();

const editedDashboard = ref<DashboardConfig | null>(null);
const statusOptions = ["ativo", "inativo"];

watch(
  () => props.dashboard,
  (newDashboard) => {
    editedDashboard.value = newDashboard ? JSON.parse(JSON.stringify(newDashboard)) : null;
  },
  { immediate: true },
);

function saveChanges() {
  if (!editedDashboard.value) return;
  emit("save", editedDashboard.value);
  emit("close");
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('close')">
    <DialogContent
      class="sm:max-w-lg border border-white/10 bg-slate-950/95 text-white backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
    >
      <DialogHeader>
        <DialogTitle class="text-lg font-semibold text-white"
          >Editar Dashboard</DialogTitle
        >
      </DialogHeader>

      <div v-if="editedDashboard" class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-white/70"
            >Título:</label
          >
          <input
            v-model="editedDashboard.title"
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-white/70">
            Status
          </label>
          <div class="grid gap-2 md:grid-cols-2">
            <label
              v-for="status in statusOptions"
              :key="status"
              class="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:border-cyan-400"
            >
              <input
                type="radio"
                name="status"
                :value="status"
                v-model="editedDashboard.status"
                class="h-4 w-4 accent-cyan-400"
              />
              <span class="capitalize">{{ status }}</span>
            </label>
          </div>
        </div>
      </div>

      <DialogFooter class="gap-2 pt-2">
        <button
          class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:bg-white/10"
          @click="emit('close')"
        >
          Cancelar
        </button>

        <button
          class="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-cyan-400"
          @click="saveChanges"
        >
          Salvar
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>