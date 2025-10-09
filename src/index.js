// src/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const packageJson = require('../package.json');

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to the CI/CD Node.js App!',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Version info (useful for CI/CD tagging)
app.get('/version', (req, res) => {
  res.json({ version: packageJson.version });
});

// Simple POST route (for testing)
app.post('/echo', (req, res) => {
  res.json({
    received: req.body,
    message: 'Echo successful!',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
