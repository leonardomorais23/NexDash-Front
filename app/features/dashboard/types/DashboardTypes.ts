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
  name: string;
  status: string;
  color: string;
}
