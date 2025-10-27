const express = require('express');
const os = require('os');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, images)

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

// About Route (HTML Dashboard)
app.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CI/CD Node.js Dashboard</title>
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #141E30, #243B55);
          color: #fff;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px 40px;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
          max-width: 600px;
          text-align: center;
        }
        h1 {
          color: #00ffcc;
          font-size: 2.2rem;
        }
        p {
          line-height: 1.6;
          font-size: 1rem;
        }
        .stack {
          margin-top: 20px;
        }
        .stack span {
          display: inline-block;
          background: #00ffcc;
          color: #141E30;
          padding: 6px 12px;
          border-radius: 20px;
          margin: 5px;
          font-weight: 500;
        }
        a {
          color: #00ffcc;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        footer {
          margin-top: 20px;
          font-size: 0.9rem;
          color: #ccc;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 CI/CD Node.js Dashboard</h1>
        <p><strong>Built By:</strong> Vishakha Bhushan Gujar</p>
        <p>This app showcases how to integrate Node.js with GitHub Actions for continuous integration and deployment.</p>
        <div class="stack">
          <span>Node.js</span>
          <span>Express.js</span>
          <span>GitHub Actions</span>
          <span>Docker</span>
          <span>CI/CD Pipeline</span>
        </div>
        <p>🔗 <a href="https://github.com/vishakhachachare/CI-CD-node-app-project01" target="_blank">View on GitHub</a></p>
        <footer>
          🌐 Environment: <strong>${ENV}</strong> | 💻 Host: <strong>${os.hostname()}</strong>
        </footer>
      </div>
    </body>
    </html>
  `);
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
