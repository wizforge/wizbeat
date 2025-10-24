<div align="center">

# wizbeat

### Real-time API Monitoring Made Simple

*A lightweight, powerful monitoring library for Node.js applications with beautiful dashboards*

[![NPM Version](https://img.shields.io/npm/v/wizbeat.svg)](https://www.npmjs.com/package/wizbeat)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-Compatible-green.svg)](https://expressjs.com/)

### 🚀 Quick 🛠️ Advanced Usage

### Multiple Dashboard Instances • 
[📊 Features](#-features) • 
[🌐 Dashboard](#-dashboard-integration) • 
[📖 Examples](#-examples) • 
[💡 API](#-api-reference)

</div>

---

## 🤔 Why wizbeat?

Building APIs is easy. **Monitoring them shouldn't be hard.**

WizBeat gives you instant insights into your API's health with **zero configuration**. Just add one line of code and get:

- 📈 **Real-time metrics** - See request rates, response times, and health scores
- 🎨 **Beautiful dashboards** - Built-in web UI that works out of the box  
- 🔧 **Developer-friendly** - TypeScript support, Express integration, flexible APIs
- ⚡ **Lightweight** - Minimal performance impact on your application

## 🚀 Quick Start

### Installation

```bash
npm install wizbeat
```

### 30-Second Setup

Add monitoring to your Express app in **just 3 lines**:

```javascript
const express = require('express');
const wizbeat = require('wizbeat').default;

const app = express();

// 🎯 ONE LINE - Auto-tracks all routes!
app.use(wizbeat.middleware());

// Your existing API routes work unchanged
app.get('/api/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

app.get('/api/orders', (req, res) => {
  res.json({ orders: [{ id: 1, total: 100 }] });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
  
  // 📊 Start live console monitoring
  wizbeat.start();
});
```

### ✨ See It In Action

```bash
💓 WizBeat Live Metrics
📍 GET /api/users — 2.50 req/s | avg 150.2ms | health 85%
📍 GET /api/orders — 1.20 req/s | avg 89.5ms | health 95%
📍 POST /api/auth — 0.80 req/s | avg 234.1ms | health 78%
```

**That's it!** Your API is now monitored. No configuration files, no complex setup.


## 📊 Features

<table>
<tr>
<td width="50%">

### 🎯 **Zero Configuration**
- Works immediately after installation
- Auto-detects routes and methods
- No config files needed

### ⚡ **Real-time Monitoring**
- Live request rate tracking
- Response time measurement
- Health score calculation
- Error rate monitoring

### 🎨 **Beautiful Dashboards**
- Built-in web interface
- Console-based monitoring
- Mobile-responsive design
- Auto-refreshing metrics

</td>
<td width="50%">

### � **Developer Experience**
- Full TypeScript support
- Express.js integration
- Flexible API design
- Rich documentation

### 🚀 **Production Ready**
- Lightweight & fast
- Minimal memory footprint
- No external dependencies
- MIT licensed

### 🌐 **Frontend Integration**
- JSON API endpoint
- React components
- Vanilla JS widgets
- Custom dashboard support

</td>
</tr>
</table>

## 📈 What wizbeat Tracks

| Metric | Description | Use Case |
|--------|-------------|----------|
| **Request Rate** | Requests per second for each route | Monitor traffic patterns, detect spikes |
| **Response Time** | Average response time in milliseconds | Identify slow endpoints, optimize performance |
| **Health Score** | Overall route health (0-100%) | Quick health assessment, alerting |
| **Error Rate** | Percentage of 4xx/5xx responses | Monitor API reliability, catch issues |
| **Total Requests** | Cumulative request count | Usage analytics, capacity planning |

### 🧮 Health Score Calculation

WizBeat calculates health scores using a smart algorithm:

```
Health = 100 - (Response Time Impact) - (Error Rate Impact)

- Response Time Impact: (avg_response_time / 200ms) × 30%
- Error Rate Impact: error_rate × 50%
- Score Range: 0-100%
```

**Example:** A route with 150ms avg response time and 2% error rate gets **~75% health score**.

## � Examples

### Basic Express Integration

```javascript
const express = require('express');
const wizbeat = require('wizbeat').default;

const app = express();

// Enable monitoring
app.use(wizbeat.middleware());

// Your routes
app.get('/users', (req, res) => res.json({ users: [] }));
app.post('/users', (req, res) => res.json({ created: true }));

// Start server with monitoring
app.listen(3000, () => {
  wizbeat.start(); // Console monitoring
});
```

### TypeScript Integration

```typescript
import express from 'express';
import wizbeat from 'wizbeat';

const app = express();

app.use(wizbeat.middleware());

// Add web dashboard
app.get('/wizbeat/dashboard', wizbeat.dashboardRoute());
app.get('/wizbeat/api', wizbeat.apiRoute());

app.listen(3000, () => {
  console.log('🚀 Server: http://localhost:3000');
  console.log('📊 Dashboard: http://localhost:3000/dashboard');
  wizbeat.start();
});
```

## 🌐 Dashboard Integration

### Option 1: Built-in Web Dashboard ⭐ **Recommended**

Add a beautiful web dashboard with **2 lines of code**:

```javascript
const express = require('express');
const wizbeat = require('wizbeat').default;

const app = express();
app.use(wizbeat.middleware());

// 🎨 Add web dashboard routes
app.get('/wizbeat/dashboard', wizbeat.dashboardRoute());
app.get('/wizbeat/api', wizbeat.apiRoute());

app.listen(3000, () => {
  console.log('📊 Dashboard: http://localhost:3000/wizbeat/dashboard');
});
```

**Features:**
- 📱 Responsive design (mobile-friendly)
- 🔄 Auto-refreshes every 3 seconds  
- 🎨 Modern, clean interface
- 📊 Color-coded health indicators

### Option 2: JSON API for Custom Frontends

```javascript
// GET /wizbeat/api returns clean JSON
{
  "status": "success",
  "timestamp": "2025-10-24T10:30:00.000Z",
  "metrics": [
    {
      "route": "GET /api/users",
      "pulseRate": 2.5,
      "avgResponseTime": 150.2,
      "health": 85,
      "errorRate": 2.1,
      "totalRequests": 1250,
      "totalErrors": 26,
      "lastUpdated": "2025-10-24T10:30:00.000Z"
    }
  ]
}
```

### Option 3: React Component Integration

```tsx
import React from 'react';
import WizBeatDashboard from 'wizbeat/react';

function AdminPanel() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <WizBeatDashboard 
        apiUrl="/wizbeat/api"
        refreshInterval={5000}
      />
    </div>
  );
}
```

### Option 4: Vanilla JavaScript Widget

```html
<!DOCTYPE html>
<html>
<body>
    <div id="wizbeat-dashboard"></div>
    <script>
        // Initialize WizBeat dashboard
        const dashboard = new WizBeatDashboard('wizbeat-dashboard', {
            apiUrl: '/wizbeat/api',
            refreshInterval: 3000
        });
    </script>
</body>
</html>
```

## � API Reference

### WizBeat Class

```typescript
import wizbeat from 'wizbeat';
```

#### `wizbeat.middleware()`
Returns Express middleware that automatically tracks all requests.

```javascript
app.use(wizbeat.middleware());
```

#### `wizbeat.start(interval?: number)`
Starts console monitoring with optional refresh interval (default: 5000ms).

```javascript
wizbeat.start(3000); // Update every 3 seconds
```

#### `wizbeat.dashboardRoute()`
Returns Express route handler for web dashboard.

```javascript
app.get('wizbeat/dashboard', wizbeat.dashboardRoute());
```

#### `wizbeat.apiRoute()`
Returns Express route handler for JSON API.

```javascript
app.get('wizbeat/api', wizbeat.apiRoute());
```

#### `wizbeat.getMetrics()`
Get current metrics programmatically.

```javascript
const metrics = wizbeat.getMetrics();
console.log(metrics);
```

### Manual Tracking Functions

```typescript
import { trackRequest, startPulse } from 'wizbeat';
```

#### `trackRequest(route: string, status: number, duration: number)`
Manually track a request.

```javascript
trackRequest('GET /api/users', 200, 150);
```

#### `startPulse(interval?: number)`
Start console monitoring without Express integration.

```javascript
startPulse(5000);
```

### TypeScript Interfaces

```typescript
interface Metric {
  route: string;
  pulseRate: number;
  avgResponseTime: number;
  health: number;
  errorRate: number;
  totalRequests: number;
  totalErrors: number;
  lastUpdated: string;
}
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Found a Bug?
1. Check [existing issues](https://github.com/wizforge/wizbeat/issues)
2. Create a new issue with reproduction steps
3. Include your Node.js and Express versions

### 💡 Have an Idea?
1. Open a feature request issue
2. Describe the use case and benefits
3. We'll discuss implementation approach

### 🛠️ Want to Contribute Code?
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run `npm run build` and ensure it passes
5. Submit a pull request

### 📝 Development Setup
```bash
git clone https://github.com/your-username/wizbeat.git
cd wizbeat
npm install
npm run build
npm run example  # Test with example server
```

## 🌟 Support

- ⭐ **Star this repo** if WizBeat helps you!
- 🐛 **Report issues** on [GitHub Issues](https://github.com/your-username/wizbeat/issues)
- 💬 **Join discussions** on [GitHub Discussions](https://github.com/your-username/wizbeat/discussions)
- 📧 **Email support**: your-email@example.com

## 📋 Changelog

### v1.0.0 (2025-10-24)
- 🎉 Initial release
- ✅ Express middleware integration
- ✅ Real-time console monitoring
- ✅ Web dashboard
- ✅ JSON API
- ✅ TypeScript support
- ✅ React and Vanilla JS examples

## 📄 License

MIT © 2025 [Parth Tyagi](https://github.com/Parthh191)

**Made with ❤️ by developers, for developers.**

---

<div align="center">

### 🚀 Ready to monitor your APIs?

```bash
npm install wizbeat
```

**Give us a ⭐ if WizBeat helps you build better APIs!**

[🏠 Homepage](https://github.com/wizforge/wizbeat) • 
[📚 Documentation](https://github.com/wizforge/wizbeat#readme) • 
[🐛 Issues](https://github.com/wizforge/wizbeat/issues) • 
[💬 Discussions](https://github.com/wizforge/wizbeat/discussions)

</div>
