<script setup lang="ts" generic="T extends Record<string, unknown>">
import { ref, watch } from "vue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const props = defineProps<{
  open: boolean;
  title: string;
  data: T | null;
}>();

const emit = defineEmits<{
  close: [];
  save: [updatedData: T];
}>();

const editedData = ref<T | null>(null);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.data) {
      editedData.value = structuredClone(props.data);
    }
  },
  { immediate: true },
);

function handleSave() {
  if (editedData.value) {
    emit("save", editedData.value);
  }
}

const styles = {
  label: "mb-2 block text-sm font-medium text-white/70",
  input:
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30",
  radioCard:
    "flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-cyan-400",
  checkboxCard:
    "flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:border-cyan-400",
  actionButton:
    "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10",
  primaryButton:
    "rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-400",
};
</script>

<template>
  <Dialog :open="open" @update:open="emit('close')">
    <DialogContent
      class="sm:max-w-lg border border-white/10 bg-slate-950/95 text-white backdrop-blur-xl shadow-2xl shadow-cyan-500/10"
    >
      <DialogHeader>
        <DialogTitle class="text-lg font-semibold text-white">{{
          title
        }}</DialogTitle>
      </DialogHeader>

      <div v-if="editedData" class="space-y-4">
        <slot :formData="editedData" :styles="styles" />
      </div>

      <DialogFooter class="gap-2 pt-2">
        <button :class="styles.actionButton" @click="emit('close')">
          Cancelar
        </button>
        <button :class="styles.primaryButton" @click="handleSave">
          Salvar
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
