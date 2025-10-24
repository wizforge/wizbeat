/**
 * WizBeat - Real-time API Monitoring Library
 * Copyright (c) 2025 Parth Tyagi
 * Licensed under MIT License
 * 
 * Type definitions for WizBeat monitoring system
 */

export interface RouteMetrics {
  totalRequests: number;
  totalTime: number;
  errors: number;
  last30s: number[];
}

export interface RouteConfig {
  healthThreshold?: number;
  maxResponseTime?: number;
  alertEmail?: string;
}

export interface WizBeatConfig {
  autoStart?: boolean;
  interval?: number;
  routes?: { [route: string]: RouteConfig };
}
