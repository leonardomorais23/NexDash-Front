<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import AppModal from "@/components/AppModal.vue";
import type { UserTableResponse } from "@/features/settings/types/ConfigTypes";
import type { PermissionOption } from "@/types/ResponseTypes";
import { authService } from "~/features/auth/services/AuthService";

const props = defineProps<{
  open: boolean;
  user: UserTableResponse | null;
}>();

const emit = defineEmits(["close", "save"]);

const roleOptions = ["admin", "gerente", "colaborador"];
const allPermissions = ref<PermissionOption[]>([]);

const normalizedUser = computed(() => {
  if (!props.user) return null;

  return {
    ...props.user,
    permissions: props.user.permissions?.map(String) ?? [],
    roles: props.user.roles ?? [],
  } as UserTableResponse;
});

onMounted(async () => {
  allPermissions.value = await authService.getPermissions();
});

function handleSave(userData: UserTableResponse) {
  emit("save", userData);
  emit("close");
}
</script>

<template>
  <AppModal
    :open="open"
    title="Editar Usuário"
    :data="normalizedUser"
    @close="emit('close')"
    @save="handleSave"
  >
    <template #default="{ formData, styles }">
      <div>
        <label :class="styles.label">Nome:</label>
        <input v-model="formData.name" :class="styles.input" />
      </div>

      <div>
        <label :class="styles.label">E-mail:</label>
        <input v-model="formData.email" :class="styles.input" />
      </div>

      <div>
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

      <div>
        <label :class="styles.label">Permissões</label>
        <div class="grid gap-2 md:grid-cols-2">
          <label
            v-for="perm in allPermissions"
            :key="perm.id"
            :class="styles.checkboxCard"
          >
            <input
              type="checkbox"
              :value="perm.id"
              v-model="formData.permissions"
              class="accent-cyan-400"
            />
            <span>{{ perm.label }}</span>
          </label>
        </div>
      </div>
    </template>
  </AppModal>
</template>
