<script setup lang="ts">
import DashboardChart from "./DashboardChart.vue";
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

const formatMinutesLabel = (minStr: string | number) => {
  const min = Number(minStr);
  if (isNaN(min) || min === 0) return minStr;
  const d = Math.floor(min / 1440),
    h = Math.floor((min % 1440) / 60),
    m = min % 60;
  return `${d > 0 ? d + "D " : ""}${h > 0 ? h + "H " : ""}${m}M`;
};

const metricItems = [
  { label: "Espera", key: "tempoEspera" as keyof DashboardMetrics },
  { label: "1ª Resp.", key: "tempoPrimeiraResp" as keyof DashboardMetrics },
  { label: "Resolução", key: "tempoResolucao" as keyof DashboardMetrics },
];
</script>

<template>
  <div class="flex flex-col gap-4 w-full h-full overflow-hidden">
    <div class="text-center shrink-0">
      <h1 class="text-2xl font-bold text-sky-400">{{ title }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
      <div
        v-for="card in [
          { label: 'Pendentes', val: metrics.pendentes },
          { label: 'Em Atendimento', val: metrics.abertas },
          { label: 'Total Atendimentos', val: metrics.todos },
        ]"
        :key="card.label"
        class="bg-slate-900/50 p-4 rounded-xl border border-white/10 text-center"
      >
        <p class="text-slate-400 text-xs mb-0.5">{{ card.label }}</p>
        <p class="text-2xl font-bold text-white leading-none">{{ card.val }}</p>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
      <div class="flex flex-col gap-2 w-full lg:w-64 shrink-0">
        <div
          v-for="item in metricItems"
          :key="item.key"
          class="bg-slate-900/50 p-3 rounded-lg border border-white/5 text-center flex-1 flex flex-col justify-center"
        >
          <p class="text-[10px] text-slate-500 uppercase tracking-tighter">
            {{ item.label }}
          </p>
          <p class="text-lg font-semibold text-blue-400 leading-tight">
            {{ formatMinutesLabel(props.metrics[item.key]) }}
          </p>
        </div>
      </div>

      <div
        class="flex-1 bg-slate-900/80 p-4 rounded-xl border border-white/10 flex flex-col min-h-0"
      >
        <h3
          class="text-white font-medium mb-2 text-[10px] opacity-50 uppercase text-center shrink-0"
        >
          Histórico de Atendimentos
        </h3>
        <div class="flex-1 min-h-0 relative">
          <DashboardChart :data="chartData" />
        </div>
      </div>
    </div>
  </div>
</template>
