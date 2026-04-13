<script setup lang="ts">
import { computed } from 'vue'
import { Command, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal } from "lucide-vue-next";
import type { SidebarProps } from '@/components/ui/sidebar'
import { useAuthStore } from '~/features/auth/stores/AuthStore'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'


import NavMain from '@/layouts/components/NavMain.vue'
import NavProjects from '@/layouts/components/NavProjects.vue'
import NavSecondary from '@/layouts/components/NavSecondary.vue'
import NavUser from '@/layouts/components/NavUser.vue'


const props = withDefaults(defineProps<SidebarProps>(), { variant: "inset",})

const emit = defineEmits<{ (e: 'logout'): void }>()
const authStore = useAuthStore()

const data = computed(() => ({
  user: {
    name: authStore.user?.name || "",
    email: authStore.user?.email || "",
    avatar: authStore.user?.avatar || "#",
  },
  navMain: [
    {
      title: "Dashboards",
      url: "/dashboards",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      requiresRole: "admin",
      items: [
        {
          title: "Usuários",
          url: "/users",
        },
        {
          title: "Gerenciar Dashboards",
          url: "/manage-dashboards",
        }
      ],
    },
  ]
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}))
</script>

<template>
  <Sidebar v-bind="props" class="bg-slate-950 border-r border-white/5">
    
    <SidebarHeader class="bg-slate-950 p-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child class="hover:bg-white/5 transition-colors">
            <a href="#">
              <div class="flex aspect-square size-9 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-900/20">
                <Command class="size-5" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight ml-2">
                <span class="truncate font-bold text-white text-base">NexDash</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent class="bg-slate-950 px-2">
      <NavMain :items="data.navMain" />
      <!-- <NavProjects :projects="data.projects" />
      <NavSecondary :items="data.navSecondary" class="mt-auto pb-4" /> -->
    </SidebarContent>

    <SidebarFooter class="bg-slate-950 border-t border-white/5 p-4">
      <ClientOnly>
        <NavUser :user="data.user" @logout="emit('logout')"/>
        <template #fallback>
          <div class="flex items-center gap-3 p-2">
            <div class="h-9 w-9 rounded-full bg-slate-900 animate-pulse" />
            <div class="h-3 w-24 bg-slate-900 animate-pulse rounded" />
          </div>
        </template>
      </ClientOnly>
    </SidebarFooter>

  </Sidebar>
</template>
