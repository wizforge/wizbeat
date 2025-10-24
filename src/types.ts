export interface RouteMetrics {
  totalRequests: number;
  totalTime: number;
  errors: number;
  last30s: number[];
}
