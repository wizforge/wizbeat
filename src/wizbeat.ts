/**
 * WizBeat - Real-time API Monitoring Library
 * Copyright (c) 2025 Parth Tyagi
 * Licensed under MIT License
 * 
 * Main WizBeat class - Central API for monitoring and dashboard functionality
 * 
 * @author Parth Tyagi
 * @version 1.0.0
 * @license MIT
 */

import { WizBeatConfig } from './types';
import { startPulse } from './reporter';
import { middleware } from './middleware';
import { metrics } from './pulseTracker';
import { calculateMetrics } from './healthCalculator';

class WizBeat {
  private config: WizBeatConfig = {
    autoStart: true,
    interval: 5000,
    routes: {}
  };

  constructor(config?: Partial<WizBeatConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  // Express middleware
  middleware(): any {
    return middleware();
  }

  // Start monitoring
  start(interval?: number) {
    const monitorInterval = interval || this.config.interval;
    return startPulse(monitorInterval);
  }

  // Configure WizBeat
  configure(config: Partial<WizBeatConfig>) {
    this.config = { ...this.config, ...config };
    return this;
  }

  // Get current metrics as JSON for frontend
  getMetrics() {
    const result: any[] = [];
    
    for (const [route, data] of metrics) {
      const { pulseRate, avgResponseTime, health, errorRate } = calculateMetrics(route, data);
      result.push({
        route,
        pulseRate: Number(pulseRate.toFixed(2)),
        avgResponseTime: Number(avgResponseTime.toFixed(1)),
        health: Number(health.toFixed(0)),
        errorRate: Number((errorRate * 100).toFixed(1)),
        totalRequests: data.totalRequests,
        totalErrors: data.errors,
        lastUpdated: new Date().toISOString()
      });
    }
    
    return result;
  }

  // Express route handler for API endpoint
  apiRoute() {
    return (req: any, res: any) => {
      res.json({
        status: 'success',
        timestamp: new Date().toISOString(),
        metrics: this.getMetrics()
      });
    };
  }

  // Generate HTML dashboard
  dashboardRoute() {
    return (req: any, res: any) => {
      const html = this.generateDashboardHTML();
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    };
  }

  // Generate dashboard HTML
  private generateDashboardHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💓 WizBeat Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { 
            text-align: center; 
            color: white; 
            margin-bottom: 30px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .metrics-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
            gap: 20px; 
        }
        .metric-card { 
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        .route-name { 
            font-size: 1.2em; 
            font-weight: bold; 
            margin-bottom: 15px;
            color: #333;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
        }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .stat { text-align: center; }
        .stat-value { 
            font-size: 1.8em; 
            font-weight: bold; 
            margin-bottom: 5px;
        }
        .stat-label { 
            font-size: 0.9em; 
            color: #666; 
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .health-good { color: #27ae60; }
        .health-warning { color: #f39c12; }
        .health-danger { color: #e74c3c; }
        .pulse { color: #3498db; }
        .response-time { color: #9b59b6; }
        .error-rate { color: #e67e22; }
        .refresh-info { 
            text-align: center; 
            color: rgba(255,255,255,0.8); 
            margin-top: 20px;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💓 WizBeat Dashboard</h1>
            <p>Real-time API Monitoring</p>
        </div>
        <div id="metrics" class="metrics-grid">
            <!-- Metrics will be loaded here -->
        </div>
        <div class="refresh-info">
            🔄 Auto-refreshes every 3 seconds | Last updated: <span id="lastUpdated">-</span>
        </div>
    </div>

    <script>
        function updateMetrics() {
            fetch('/wizbeat/api')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('metrics');
                    const lastUpdated = document.getElementById('lastUpdated');
                    
                    if (data.metrics.length === 0) {
                        container.innerHTML = '<div class="metric-card"><h3>No metrics yet</h3><p>Start making requests to see data!</p></div>';
                        return;
                    }
                    
                    container.innerHTML = data.metrics.map(metric => {
                        const healthClass = metric.health >= 80 ? 'health-good' : 
                                          metric.health >= 60 ? 'health-warning' : 'health-danger';
                        
                        return \`
                            <div class="metric-card">
                                <div class="route-name">📍 \${metric.route}</div>
                                <div class="stats">
                                    <div class="stat">
                                        <div class="stat-value pulse">\${metric.pulseRate}</div>
                                        <div class="stat-label">req/s</div>
                                    </div>
                                    <div class="stat">
                                        <div class="stat-value response-time">\${metric.avgResponseTime}ms</div>
                                        <div class="stat-label">avg time</div>
                                    </div>
                                    <div class="stat">
                                        <div class="stat-value \${healthClass}">\${metric.health}%</div>
                                        <div class="stat-label">health</div>
                                    </div>
                                    <div class="stat">
                                        <div class="stat-value error-rate">\${metric.errorRate}%</div>
                                        <div class="stat-label">errors</div>
                                    </div>
                                </div>
                            </div>
                        \`;
                    }).join('');
                    
                    lastUpdated.textContent = new Date().toLocaleTimeString();
                })
                .catch(error => {
                    console.error('Error fetching metrics:', error);
                });
        }
        
        // Initial load
        updateMetrics();
        
        // Auto-refresh every 3 seconds
        setInterval(updateMetrics, 3000);
    </script>
</body>
</html>
    `;
  }
}

// Create singleton instance
const wizbeat = new WizBeat();

export default wizbeat;
export { WizBeat };
