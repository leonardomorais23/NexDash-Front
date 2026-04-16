import type { s } from "vue-router/dist/router-CWoNjPRp.mjs";

export interface DashboardMetrics {
  pendentes: number | string;
  abertas: number | string;
  todos: number | string;
  tempoEspera: string;
  tempoPrimeiraResp: string;
  tempoResolucao: string;
}

export interface ChartHistoryItem {
  dateTime: string;
  atendimentosResolvidos: number;
  atendimentosPendentes: number;
}

export interface DashboardResponse {
  metrics: DashboardMetrics;
  history: ChartHistoryItem[];
}

export interface DashboardConfig {
  id: number;
  slug: string;
  title: string;
  status: string;
  color: string;
}
