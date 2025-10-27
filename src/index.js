// index.js
const express = require('express');
const os = require('os');
const app = express();

// Middleware
app.use(express.json());

// Config
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to the CI/CD Node.js Application!',
    description: 'This app demonstrates CI/CD pipeline integration using GitHub Actions and Docker.',
    environment: ENV,
    uptime: `${process.uptime().toFixed(2)} seconds`
  });
});

// About Route
app.get('/about', (req, res) => {
  res.json({
    project: "CI/CD Node.js Application",
    builtBy: "Vishakha Bhushan Gujar",
    purpose: "This app showcases how to integrate Node.js with GitHub Actions for continuous integration and deployment.",
    techStack: ["Node.js", "Express.js", "GitHub Actions", "Docker", "CI/CD Pipeline"],
    github: "https://github.com/vishakhachachare/CI-CD-node-app-project01",
  });
});

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: '✅ UP',
    timestamp: new Date().toISOString(),
    server: os.hostname(),
  });
});

// Version Info
app.get('/version', (req, res) => {
  res.json({
    version: '1.0.0',
    author: 'Vishakha Gujar',
    lastDeployed: new Date().toLocaleString(),
  });
});

// Echo Route
app.post('/echo', (req, res) => {
  res.json({
    received: req.body,
    message: 'Echo successful!',
  });
});

// Catch-All Route
app.use((req, res) => {
  res.status(404).json({
    error: '❌ Route not found',
    hint: 'Try /, /about, /health, or /version',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT} in ${ENV} mode`);
});
