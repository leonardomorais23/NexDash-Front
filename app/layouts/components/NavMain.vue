<script setup lang="ts">
import { usePermissions } from "@/composables/usePermissions";
import type { LucideIcon } from "lucide-vue-next";
import { ChevronRight } from "lucide-vue-next";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

defineProps<{
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    requiresPermission?: string;
    requiresRole?: string;
    items?: {
      title: string;
      url: string;
      requiresPermission?: string;
      requiresRole?: string;
    }[];
  }[];
}>();

const { hasPermission, hasRole } = usePermissions();
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel
      class="text-slate-500 font-semibold tracking-widest text-[10px] uppercase px-4"
    >
      Plataforma
    </SidebarGroupLabel>
    <SidebarMenu class="gap-1 px-2">
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        v-show="
          (!item.requiresPermission ||
            hasPermission(item.requiresPermission)) &&
          (!item.requiresRole || hasRole(item.requiresRole))
        "
      >
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            :tooltip="item.title"
            class="hover:bg-white/5 hover:text-white transition-all py-5 rounded-xl text-slate-400 data-[state=open]:bg-white/5 data-[state=open]:text-white"
          >
            <NuxtLink :to="item.url">
              <component :is="item.icon" class="size-5" />
              <span class="font-medium">{{ item.title }}</span>
            </NuxtLink>
          </SidebarMenuButton>

          <template v-if="item.items?.length">
            <CollapsibleTrigger as-child>
              <SidebarMenuAction
                class="hover:bg-white/10 text-slate-500 data-[state=open]:rotate-90"
              >
                <ChevronRight class="size-4" />
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent class="pl-4 border-l border-white/5 ml-6 mt-1">
              <SidebarMenuSub class="bg-transparent border-none space-y-1">
                <SidebarMenuSubItem
                  v-for="subItem in item.items || []"
                  :key="subItem.title"
                  v-show="
                    (!subItem.requiresPermission ||
                      hasPermission(subItem.requiresPermission)) &&
                    (!subItem.requiresRole || hasRole(subItem.requiresRole))
                  "
                >
                  <SidebarMenuSubButton
                    as-child
                    class="hover:bg-white/5 hover:text-sky-400 text-slate-500 rounded-lg py-4 transition-colors"
                  >
                    <NuxtLink :to="subItem.url">
                      <span class="text-xs font-medium">{{
                        subItem.title
                      }}</span>
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </template>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
