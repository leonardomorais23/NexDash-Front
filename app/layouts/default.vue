<script setup lang="ts">
import AppSidebar from "@/layouts/components/AppSidebar.vue";
import { useAuthStore } from "~/features/auth/stores/authStore";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const auth = useAuthStore();
const route = useRoute();
const isLoading = ref(false);

const pageTitle = computed(() => {
  const path = route.path.split("/").filter(Boolean).pop();
  if (!path || path === "dashboard") return "Dashboard Geral";

  return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
});

const handleLogout = async () => {
  isLoading.value = true;
  try {
    await auth.logout();
    await navigateTo("/login", {
      external: true,
      replace: true,
    });
  } catch (err) {
    console.error("Erro ao realizar logout:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <SidebarProvider class="dark h-screen w-full overflow-hidden bg-slate-950">
    <AppSidebar class="border-white/5 shadow-none" @logout="handleLogout" />

    <SidebarInset
      class="bg-slate-950 flex flex-col h-full w-full m-0 p-0 rounded-none border-none shadow-none flex-1 overflow-hidden"
    >
      <header
        class="flex h-16 shrink-0 items-center gap-2 px-4 border-b border-white/5 bg-slate-950 sticky top-0 z-10 shadow-none"
      >
        <div class="flex items-center gap-2">
          <SidebarTrigger
            class="-ml-1 text-slate-400 hover:text-white transition-colors"
          />

          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4 bg-white/10"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <NuxtLink
                  to="/"
                  class="text-slate-500 hover:text-slate-300 transition-colors text-sm"
                >
                  NexDash
                </NuxtLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator class="hidden md:block text-slate-800" />

              <BreadcrumbItem>
                <BreadcrumbPage class="text-slate-200 font-medium capitalize">
                  {{ pageTitle }}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main class="flex-1 bg-slate-950 overflow-hidden flex flex-col relative">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
