/**
 * WizBeat Example Server
 * Copyright (c) 2025 Parth Tyagi
 * Licensed under MIT License
 * 
 * Example Express.js server demonstrating WizBeat integration
 * Run with: npm run example
 */

const express = require('express');
const wizbeat = require('./dist/wizbeat.js'); // Direct import - most reliable

const app = express();

// 🎯 ONE LINE SETUP - Auto-tracks all routes!
app.use(wizbeat.middleware());

// 📊 Add WizBeat dashboard routes
app.get('/wizbeat/dashboard', wizbeat.dashboardRoute()); // Web dashboard
app.get('/wizbeat/api', wizbeat.apiRoute());             // JSON API for custom frontends

// Sample API routes
app.get('/api/users', (req, res) => {
  // Simulate some processing time
  setTimeout(() => {
    res.json({ users: ['Alice', 'Bob', 'Charlie'] });
  }, Math.random() * 200);
});

app.get('/api/orders', (req, res) => {
  setTimeout(() => {
    res.json({ orders: [{ id: 1, total: 100 }] });
  }, Math.random() * 150);
});

app.post('/api/auth', (req, res) => {
  // Sometimes return error for demo
  if (Math.random() > 0.8) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  setTimeout(() => {
    res.json({ token: 'abc123' });
  }, Math.random() * 300);
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
  console.log('');
  console.log('📊 WizBeat Dashboards:');
  console.log('  🌐 Web Dashboard: http://localhost:3000/wizbeat/dashboard');
  // 📊 Start console monitoring (optional)
  wizbeat.start();
});
