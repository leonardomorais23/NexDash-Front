<script setup lang="ts">
import { computed } from "vue";
import { use, graphic } from "echarts/core";
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

const props = defineProps<{ data?: ChartHistoryItem[] }>();

const option = computed(() => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "#0f172a",
    borderColor: "#334155",
    borderWidth: 1,
    textStyle: {
      color: "#f8fafc",
      fontSize: 12,
      fontFamily: "Inter, sans-serif",
    },
    padding: [10, 15],
    formatter: (params: any) => {
      let res = `<div class="text-[10px] uppercase tracking-widest text-slate-500 mb-2">${params[0].name}h</div>`;
      params.forEach((item: any) => {
        res += `<div class="flex items-center justify-between gap-8 mb-1">
                  <span class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" style="background-color: ${item.color.colorStops[0].color}"></span>
                    <span class="text-slate-300">${item.seriesName}</span>
                  </span>
                  <span class="font-bold text-white">${item.value}</span>
                </div>`;
      });
      return res;
    },
  },
  grid: {
    top: "12%",
    left: "1%",
    right: "1%",
    bottom: "0%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data:
      props.data?.map((item) => {
        const dt = item?.dateTime || "";
        if (dt.includes(" ")) {
          const [, time = ""] = dt.split(" ");
          return time.substring(0, 5);
        }
        return dt;
      }) || [],
    axisLabel: {
      color: "#64748b",
      fontWeight: "600",
      fontSize: 10,
      margin: 15,
    },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: { color: "#1e293b", type: "dashed", opacity: 0.5 },
    },
    axisLabel: { color: "#475569", fontSize: 10 },
    axisLine: { show: false },
  },
  series: [
    {
      name: "Resolvidos",
      type: "bar",
      stack: "total",
      barWidth: "40%",
      itemStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#3b82f6" },
          { offset: 1, color: "#1d4ed8" },
        ]),
        borderRadius: [0, 0, 0, 0],
      },
      emphasis: { itemStyle: { opacity: 0.9 } },
      data: props.data?.map((item) => item?.atendimentosResolvidos ?? 0) || [],
    },
    {
      name: "Pendentes",
      type: "bar",
      stack: "total",
      itemStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#10b981" },
          { offset: 1, color: "#059669" },
        ]),
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: { itemStyle: { opacity: 0.9 } },
      data: props.data?.map((item) => item?.atendimentosPendentes ?? 0) || [],
    },
  ],
}));
</script>
<template>
  <client-only>
    <v-chart class="h-full w-full min-h-[350px]" :option="option" autoresize />
  </client-only>
</template>
