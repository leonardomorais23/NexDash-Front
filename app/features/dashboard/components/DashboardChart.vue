<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import type { ChartHistoryItem } from "@/features/dashboard/types/dashboardTypes";
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const props = defineProps<{ data: ChartHistoryItem[] }>();

const option = computed(() => ({
  backgroundColor: "transparent",
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  legend: { textStyle: { color: "#B0B3C6" } },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: {
    type: "category",
    data:
      props.data?.map(
        (item) => item.dateTime?.split(" ")[1]?.substring(0, 5) || "",
      ) || [],
    axisLabel: { color: "#B0B3C6" },
  },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#333" } } },
  series: [
    {
      name: "Resolvidos",
      type: "bar",
      stack: "total",
      color: "#0284c7",
      data: props.data?.map((item) => item.atendimentosResolvidos) || [],
    },
    {
      name: "Pendentes",
      type: "bar",
      stack: "total",
      color: "#10b981",
      data: props.data?.map((item) => item.atendimentosPendentes) || [],
    },
  ],
}));
</script>

<template>
  <client-only>
    <v-chart class="h-100 w-full" :option="option" autoresize />
  </client-only>
</template>
