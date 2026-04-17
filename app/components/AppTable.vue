<script setup lang="ts" generic="T extends { id: number | string }">
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  items: T[];
  isLoading: boolean;
  searchPlaceholder?: string;
}

const props = defineProps<Props>();

const search = defineModel<string>("search");
const filter = defineModel<string>("filter");
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-4 md:flex-row md:items-start">
      
      <div class="flex-1">
        <input
          v-model="search"
          type="text"
          :placeholder="searchPlaceholder || 'Pesquisar...'"
          class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 placeholder:text-white/40 backdrop-blur-md transition-all focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
        />
      </div>

      <div class="flex flex-col gap-3 min-w-[240px]">
        <select
          v-model="filter"
          class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur-md transition-all focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
        >
          <slot name="filter-options" />
        </select>
        
        <slot name="actions" />
      </div>
    </div>

    <div class="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
      <Table>
        <TableHeader class="bg-white/[0.03]">
          <TableRow class="border-b border-white/10">
            <slot name="header" />
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-if="isLoading">
            <TableCell
              colspan="10"
              class="py-10 text-center text-cyan-400/60 animate-pulse"
            >
              Carregando dados...
            </TableCell>
          </TableRow>

          <template v-else-if="items.length > 0">
            <TableRow
              v-for="item in items"
              :key="item.id"
              class="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
            >
              <slot name="row" :item="item" />
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell colspan="10" class="py-10 text-center text-white/40">
              Nenhum registro encontrado.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>