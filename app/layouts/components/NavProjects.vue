<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next";
import { Folder, MoreHorizontal } from "lucide-vue-next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

defineProps<{
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}>();

const { isMobile } = useSidebar();
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel
      class="text-slate-500 font-semibold tracking-wider text-[10px] uppercase"
      >Projects</SidebarGroupLabel
    >
    <SidebarMenu>
      <SidebarMenuItem v-for="item in projects" :key="item.name">
        <SidebarMenuButton
          as-child
          class="text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <a :href="item.url">
            <component
              :is="item.icon"
              class="text-slate-400 group-hover:text-sky-400"
            />
            <span>{{ item.name }}</span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction
              show-on-hover
              class="text-slate-500 hover:bg-white/10"
            >
              <MoreHorizontal />
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-48 rounded-lg bg-slate-900 border-white/10 text-slate-300"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuItem
              class="focus:bg-white/10 focus:text-white cursor-pointer"
            >
              <Folder class="mr-2 size-4 text-slate-500" />
              <span>View Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
