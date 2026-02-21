<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'

definePageMeta({
  middleware: 'auth' 
})

const auth = useAuthStore()
const handleLogout = () => {
  auth.logout()
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex">
    <aside class="w-64 bg-slate-900 text-white hidden md:block">
      <div class="p-6 text-2xl font-bold border-b border-slate-800">NexDash</div>
      <nav class="p-4 space-y-2">
        <a href="#" class="block p-3 bg-blue-600 rounded-lg">Dashboard</a>
        <a href="#" class="block p-3 hover:bg-slate-800 rounded-lg transition">Relatórios</a>
        <a href="#" class="block p-3 hover:bg-slate-800 rounded-lg transition">Configurações</a>
      </nav>
    </aside>

    <main class="flex-1">
      <header class="bg-white shadow-sm p-4 flex justify-between items-center px-8">
        <h2 class="text-xl font-semibold text-slate-700">Bem-vindo ao Painel</h2>
        <div class="flex items-center gap-4">
          <span class="text-sm text-slate-500">{{ auth.user?.email }}</span>
          <button 
            class="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            @submit.prevent="handleLogout"
            @click="handleLogout"
          >
            Sair
          </button>
        </div>
      </header>

      <section class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p class="text-slate-500 text-sm">Status da Conexão</p>
            <p class="text-2xl font-bold text-green-500">API Online</p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p class="text-slate-500 text-sm">Token Ativo</p>
            <p class="text-xs truncate font-mono mt-1 text-slate-400">{{ auth.token }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>