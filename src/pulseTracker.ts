/**
 * WizBeat - Real-time API Monitoring Library
 * Copyright (c) 2025 Parth Tyagi
 * Licensed under MIT License
 * 
 * Pulse tracking module - Tracks API requests and response metrics
 */

import { RouteMetrics } from "./types";

export const metrics = new Map<string, RouteMetrics>();

export function trackRequest(route: string, status: number, duration: number) {
  if (!metrics.has(route)) {
    metrics.set(route, { totalRequests: 0, totalTime: 0, errors: 0, last30s: [] });
  }

  const data = metrics.get(route)!;
  data.totalRequests++;
  data.totalTime += duration;
  if (status >= 400) data.errors++;

  const now = Date.now();
  data.last30s.push(now);
  data.last30s = data.last30s.filter(t => now - t < 30000);
}
