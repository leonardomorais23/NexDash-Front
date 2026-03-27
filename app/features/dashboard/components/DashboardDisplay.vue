<script setup lang="ts">
import DashboardChart from "./DashboardChart.vue";
import {
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-vue-next";
import type {
  DashboardMetrics,
  ChartHistoryItem,
} from "@/features/dashboard/types/dashboardTypes";

interface Props {
  title: string;
  metrics: DashboardMetrics;
  chartData: ChartHistoryItem[];
}

const props = defineProps<Props>();

const formatTime = (val: string | number) => {
  if (!val || val === "0") return "0m";
  return String(val)
    .replace(/ D /g, " D ")
    .replace(/ Hr /g, " Hr ")
    .replace(/ Min/g, " Min");
};
</script>

<template>
  <div class="flex flex-col gap-6 w-full h-full p-1">
    <div
      class="flex items-center justify-between shrink-0 border-b border-white/5 pb-4"
    >
      <div>
        <h1
          class="text-3xl font-black text-white tracking-tighter uppercase italic"
        >
          {{ title }}
        </h1>
        <p class="text-slate-500 text-xs font-medium uppercase tracking-widest">
          Real-time Operations
        </p>
      </div>
      <div
        class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
      >
        <span
          class="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter animate-pulse"
          >● Live</span
        >
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 shrink-0">
      <div
        v-for="card in [
          {
            label: 'Pendentes',
            val: metrics.pendentes,
            color: 'text-amber-400',
            bg: 'bg-amber-400/5',
            border: 'border-amber-400/20',
          },
          {
            label: 'Em Atendimento',
            val: metrics.abertas,
            color: 'text-sky-400',
            bg: 'bg-sky-400/5',
            border: 'border-sky-400/20',
          },
          {
            label: 'Total Volume',
            val: metrics.todos,
            color: 'text-slate-300',
            bg: 'bg-slate-300/5',
            border: 'border-slate-300/20',
          },
        ]"
        :key="card.label"
        :class="[card.bg, card.border]"
        class="relative overflow-hidden p-5 rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.02]"
      >
        <p
          class="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2"
        >
          {{ card.label }}
        </p>
        <p :class="card.color" class="text-4xl font-black tracking-tighter">
          {{ card.val }}
        </p>
        <div class="absolute -right-2 -bottom-2 opacity-5 scale-150">
          <MessageSquare class="size-20" />
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
      <div class="flex flex-col gap-4 w-full lg:w-72 shrink-0">
        <div
          v-for="item in [
            {
              label: 'Tempo de Espera',
              key: 'tempoEspera',
              color: 'text-amber-400',
            },
            {
              label: 'Primeira Resposta',
              key: 'tempoPrimeiraResp',
              color: 'text-sky-400',
            },
            {
              label: 'Resolução Total',
              key: 'tempoResolucao',
              color: 'text-emerald-400',
            },
          ]"
          :key="item.key"
          class="group bg-slate-900/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex-1 flex flex-col justify-center"
        >
          <div class="flex items-center gap-2 mb-1">
            <Clock class="size-3 text-slate-500" />
            <p
              class="text-[10px] text-slate-500 font-bold uppercase tracking-tight group-hover:text-slate-300 transition-colors"
            >
              {{ item.label }}
            </p>
          </div>
          <p :class="item.color" class="text-xl font-bold tracking-tight">
            {{ formatTime(props.metrics[item.key as keyof DashboardMetrics]) }}
          </p>
        </div>
      </div>

      <div
        class="flex-1 bg-[#0b0f1a] rounded-3xl border border-white/5 p-6 flex flex-col shadow-2xl relative overflow-hidden"
      >
        <div class="flex items-center justify-between mb-6 shrink-0">
          <h3
            class="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <span
              class="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            ></span>
            Performance Histórica
          </h3>
          <div class="flex gap-4">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-sm bg-blue-600"></span
              ><span class="text-[10px] text-slate-500 font-bold uppercase"
                >Resolvidos</span
              >
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-sm bg-emerald-500"></span
              ><span class="text-[10px] text-slate-500 font-bold uppercase"
                >Pendentes</span
              >
            </div>
          </div>
        </div>

        <div class="flex-1 min-h-0 relative">
          <client-only>
            <DashboardChart :data="chartData" />
            
            <template #placeholder>
              <div class="flex items-center justify-center h-full w-full bg-slate-900/50 animate-pulse rounded-xl border border-white/5">
                <span class="text-xs text-slate-700 font-medium uppercase tracking-widest">Aguardando dados...</span>
              </div>
            </template>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
