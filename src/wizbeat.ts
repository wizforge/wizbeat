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

import { startPulse } from './reporter';
import { middleware } from './middleware';
import { metrics } from './pulseTracker';
import { calculateMetrics } from './healthCalculator';

class WizBeat {
  constructor() {
    // Constructor no longer takes configuration
  }

  // Express middleware
  middleware(): any {
    return middleware();
  }

  // Start monitoring
  start(interval: number = 5000) {
    return startPulse(interval);
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
    <title>⚡ WizBeat Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            min-height: 100vh;
            padding: 20px;
            color: #e2e8f0;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { 
            text-align: center; 
            color: #64ffda; 
            margin-bottom: 30px;
            text-shadow: 0 2px 8px rgba(100, 255, 218, 0.3);
        }
        .header h1 { 
            font-size: 2.5em; 
            margin-bottom: 10px; 
            background: linear-gradient(45deg, #64ffda, #00bcd4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .header p { color: #94a3b8; font-size: 1.1em; }
        .metrics-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
            gap: 20px; 
        }
        .metric-card { 
            background: linear-gradient(145deg, #1e293b, #334155);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 
                        0 1px 3px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(100, 255, 218, 0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .metric-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
                        0 0 20px rgba(100, 255, 218, 0.1);
        }
        .route-name { 
            font-size: 1.2em; 
            font-weight: 600; 
            margin-bottom: 15px;
            color: #64ffda;
            border-bottom: 2px solid rgba(100, 255, 218, 0.2);
            padding-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .stat { 
            text-align: center; 
            padding: 12px;
            background: rgba(15, 23, 42, 0.4);
            border-radius: 8px;
            border: 1px solid rgba(100, 255, 218, 0.1);
        }
        .stat-value { 
            font-size: 1.8em; 
            font-weight: 700; 
            margin-bottom: 5px;
        }
        .stat-label { 
            font-size: 0.85em; 
            color: #94a3b8; 
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 500;
        }
        .health-good { color: #10b981; text-shadow: 0 0 8px rgba(16, 185, 129, 0.3); }
        .health-warning { color: #f59e0b; text-shadow: 0 0 8px rgba(245, 158, 11, 0.3); }
        .health-danger { color: #ef4444; text-shadow: 0 0 8px rgba(239, 68, 68, 0.3); }
        .pulse { color: #3b82f6; text-shadow: 0 0 8px rgba(59, 130, 246, 0.3); }
        .response-time { color: #8b5cf6; text-shadow: 0 0 8px rgba(139, 92, 246, 0.3); }
        .error-rate { color: #f97316; text-shadow: 0 0 8px rgba(249, 115, 22, 0.3); }
        .refresh-info { 
            text-align: center; 
            color: #64748b; 
            margin-top: 30px;
            font-size: 0.9em;
            background: rgba(30, 41, 59, 0.6);
            padding: 15px;
            border-radius: 8px;
            border: 1px solid rgba(100, 255, 218, 0.1);
        }
        .no-data {
            text-align: center;
            color: #64748b;
            font-size: 1.1em;
        }
        .no-data h3 {
            color: #64ffda;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚡ WizBeat Dashboard</h1>
            <p>Real-time API Performance Monitoring</p>
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
                        container.innerHTML = '<div class="metric-card no-data"><h3>No metrics available</h3><p>Start making API requests to see monitoring data!</p></div>';
                        return;
                    }
                    
                    container.innerHTML = data.metrics.map(metric => {
                        const healthClass = metric.health >= 80 ? 'health-good' : 
                                          metric.health >= 60 ? 'health-warning' : 'health-danger';
                        
                        return \`
                            <div class="metric-card">
                                <div class="route-name">🌐 \${metric.route}</div>
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

// Export both named and default
export default wizbeat;
export { WizBeat };

// For CommonJS compatibility
module.exports = wizbeat;
module.exports.default = wizbeat;
module.exports.WizBeat = WizBeat;
