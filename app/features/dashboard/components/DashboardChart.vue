<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import * as echarts from "echarts";
import type { ChartHistoryItem } from "~/features/dashboard/types/DashboardTypes";

const props = defineProps<{ data?: ChartHistoryItem[] }>();

const chartRef = ref<HTMLDivElement>();

let chartInstance: echarts.ECharts | null = null;

const option = computed(() => {
  const data = props.data && props.data.length > 0 ? props.data : [];

  const opt = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: data.map((item) => {
        const dt = item?.dateTime || "";
        if (dt.includes(" ")) {
          const [, time = ""] = dt.split(" ");
          return time.substring(0, 5);
        }
        return dt;
      }),
      axisLabel: {
        rotate: 0,
        interval: 0
      }
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Resolvidos",
        type: "bar",
        data: data.map((item) => item?.atendimentosResolvidos ?? 0),
        barWidth: '35%',
        itemStyle: {
          color: '#3b82f6'
        }
      },
      {
        name: "Pendentes",
        type: "bar",
        data: data.map((item) => item?.atendimentosPendentes ?? 0),
        barWidth: '35%',
        itemStyle: {
          color: '#10b981'
        }
      },
    ],
  };
  return opt;
});

onMounted(async () => {
  await nextTick();
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(option.value);
  }
});

const updateChart = () => {
  if (chartInstance) {
    chartInstance.setOption(option.value, true);
  }
};

watch(() => props.data, (newData) => {
  updateChart();
}, { deep: true });

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<template>
  <div v-if="!props.data || props.data.length === 0" class="flex items-center justify-center h-full w-full">
    <span class="text-slate-500">Nenhum dado disponível para o gráfico</span>
  </div>
  <div v-else ref="chartRef" class="h-full w-full min-h-[350px]"></div>
</template>
