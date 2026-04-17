<script setup lang="ts">
import { computed } from "vue";
import AppModal from "@/components/AppModal.vue";
import type { DashboardConfig } from "@/features/dashboard/types/DashboardTypes";

type DashboardFormData = DashboardConfig & {
  roles: string[];
};

const props = defineProps<{
  open: boolean;
  dashboard: DashboardConfig | null;
}>();

const emit = defineEmits(["close", "save"]);
const statusOptions = ["ativo", "inativo"];
const roleOptions = ["admin", "gerente", "colaborador"];
const isEditMode = computed(() => !!props.dashboard);

const modalTitle = computed(() =>
  props.dashboard ? "Editar Dashboard" : "Novo Dashboard"
);

const normalizedDashboard = computed<DashboardFormData>(() => {
  if (props.dashboard) {
    return {
      ...props.dashboard,
      status: props.dashboard.status?.toLowerCase() || "ativo",
      roles: [],
    };
  }

  return {
    id: 0,
    slug: "",
    name: "",
    status: "ativo",
    color: "",
    roles: [],
  } as DashboardFormData;
});
</script>

<template>
  <AppModal
    :open="open"
    :title="modalTitle"
    :data="normalizedDashboard"
    @close="emit('close')"
    @save="(data) => emit('save', data)"
  >
    <template #default="{ formData, styles }">
      <div>
        <label class="mb-2 block text-sm font-medium text-white/70"
          >Título:</label
        >
        <input
          v-model="formData.name"
          class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium text-white/70"
          >Status</label
        >
        <div class="grid gap-2 md:grid-cols-2">
          <label
            v-for="status in statusOptions"
            :key="status"
            class="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-cyan-400"
          >
            <input
              type="radio"
              :value="status"
              v-model="formData.status"
              class="h-4 w-4 accent-cyan-400"
            />
            <span class="capitalize">{{ status }}</span>
          </label>
        </div>
      </div>

      <div v-if="!isEditMode">
        <label :class="styles.label">Perfil</label>
        <div class="grid gap-2 md:grid-cols-3">
          <label
            v-for="role in roleOptions"
            :key="role"
            :class="styles.radioCard"
          >
            <input
              type="radio"
              :value="role"
              v-model="formData.roles[0]"
              class="accent-cyan-400"
            />
            <span class="capitalize">{{ role }}</span>
          </label>
        </div>
      </div>
    </template>
  </AppModal>
</template>
