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
  id: string;
  title: string;
  color: string;
}
