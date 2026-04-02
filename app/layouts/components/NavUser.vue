<script setup lang="ts">
import { ChevronsUpDown, LogOut, Sparkles } from "lucide-vue-next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const props = defineProps<{
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}>();

const { isMobile } = useSidebar();

const emit = defineEmits<{
  (e: "logout"): void;
}>();
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-white/10 text-slate-300 hover:bg-white/5 transition-colors"
          >
            <Avatar class="h-8 w-8 rounded-lg border border-white/10">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback
                class="rounded-lg bg-sky-600 text-white font-bold"
              >
                {{ user.name.charAt(0).toUpperCase() }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight ml-2">
              <span class="truncate font-semibold text-white">{{
                user.name
              }}</span>
              <span class="truncate text-xs text-slate-500">{{
                user.email
              }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4 text-slate-600" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-xl bg-slate-900 border-white/10 text-slate-300 shadow-2xl p-2"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" />
                <AvatarFallback class="rounded-lg bg-sky-600 text-white"
                  >CN</AvatarFallback
                >
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold text-white">{{
                  user.name
                }}</span>
                <span class="truncate text-xs text-slate-500">{{
                  user.email
                }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator class="bg-white/5" />
          <DropdownMenuItem
            class="focus:bg-white/10 focus:text-white cursor-pointer"
          >
            <Sparkles class="mr-2 size-4 text-sky-400" />
            Upgrade to Pro
          </DropdownMenuItem>
          <DropdownMenuSeparator class="bg-white/5" />
          <DropdownMenuItem
            class="focus:bg-red-500/10 focus:text-red-400 text-red-400/80 cursor-pointer"
            @click="emit('logout')"
          >
            <LogOut class="mr-2 size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
