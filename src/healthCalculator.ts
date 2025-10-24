/**
 * WizBeat - Real-time API Monitoring Library
 * Copyright (c) 2025 Parth Tyagi
 * Licensed under MIT License
 * 
 * Health calculation module - Calculates API health metrics and scores
 */

import { RouteMetrics } from "./types";

export function calculateMetrics(route: string, data: RouteMetrics) {
  const pulseRate = data.last30s.length / 30; // requests per second
  const avgResponseTime = data.totalTime / data.totalRequests;
  const errorRate = data.errors / data.totalRequests;

  const threshold = 200; // 200ms ideal response
  let health = 100 - (avgResponseTime / threshold) * 30 - errorRate * 50;
  health = Math.max(0, Math.min(100, health));

  return { pulseRate, avgResponseTime, errorRate, health };
}
