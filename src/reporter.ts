import { metrics } from "./pulseTracker";
import { calculateMetrics } from "./healthCalculator";

export function startPulse(interval = 5000) {
  setInterval(() => {
    console.clear();
    console.log("💓 WizBeat Live Metrics");

    for (const [route, data] of metrics) {
      const { pulseRate, avgResponseTime, health } = calculateMetrics(route, data);
      console.log(`📍 ${route} — ${pulseRate.toFixed(2)} req/s | avg ${avgResponseTime.toFixed(1)}ms | health ${health.toFixed(0)}%`);
    }
  }, interval);
}
