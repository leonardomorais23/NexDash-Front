<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { UserTableResponse } from "@/features/settings/types/ConfigTypes";
import type { PermissionOption } from "@/types/ResponseTypes";
import { authService } from "~/features/auth/services/AuthService";

const props = defineProps<{
  open: boolean;
  user: UserTableResponse | null;
}>();

const emit = defineEmits<{
  close: [];
  save: [user: UserTableResponse];
}>();

const editedUser = ref<UserTableResponse | null>(null);
const roleOptions = ["admin", "gerente", "colaborador"];
const selectedRole = ref<string>("");
const permissionsSelected = ref<string[]>([]);

watch(
  () => props.user,
  (newUser) => {
    editedUser.value = newUser ? JSON.parse(JSON.stringify(newUser)) : null;
    selectedRole.value = newUser?.roles?.[0] ?? "";
    permissionsSelected.value = newUser?.permissions ? [...newUser.permissions] : [];
  },
  { immediate: true },
);

function saveChanges() {
  if (!editedUser.value) return;
  editedUser.value.roles = selectedRole.value ? [selectedRole.value] : [];
  editedUser.value.permissions = [...permissionsSelected.value];
  emit("save", editedUser.value);
  emit("close");
}

const allPermissions = ref<PermissionOption[]>([]);
onMounted(async () => {
  allPermissions.value = await authService.getPermissions();
});
</script>

<template>
  <Dialog :open="open" @update:open="emit('close')">
    <DialogContent
      class="sm:max-w-lg border border-white/10 bg-slate-950/95 text-white backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
    >
      <DialogHeader>
        <DialogTitle class="text-lg font-semibold text-white"
          >Editar usuário</DialogTitle
        >
      </DialogHeader>

      <div v-if="editedUser" class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-white/70"
            >Nome:</label
          >
          <input
            v-model="editedUser.name"
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-white/70">
            E-mail
          </label>
          <input
            v-model="editedUser.email"
            class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-white/70">
            Perfil
          </label>
          <div class="grid gap-2 md:grid-cols-3">
            <label
              v-for="role in roleOptions"
              :key="role"
              class="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:border-cyan-400"
            >
              <input
                type="radio"
                name="role"
                :value="role"
                v-model="selectedRole"
                class="h-4 w-4 accent-cyan-400"
              />
              <span class="capitalize">{{ role }}</span>
            </label>
          </div>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-white/70">
            Permissões
          </label>
          <div class="grid gap-2 md:grid-cols-2">
            <label
              v-for="perm in allPermissions"
              :key="perm.id"
              class="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:border-cyan-400"
            >
              <input
                type="checkbox"
                :value="perm.id"
                v-model="permissionsSelected"
                class="h-4 w-4 accent-cyan-400"
              />
              <span>{{ perm.label }}</span>
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
