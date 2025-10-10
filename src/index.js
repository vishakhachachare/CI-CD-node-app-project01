// src/index.js
const express = require("express");
const os = require("os");
const packageJson = require("../package.json");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ✅ Root Route — HTML Landing Page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>🚀 CI/CD Node.js App</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #007BFF, #6610f2);
            color: white;
            text-align: center; 
            margin-top: 80px;
          }
          h1 { font-size: 2.5em; }
          p { font-size: 1.2em; }
          .routes { margin-top: 40px; }
          a { color: #ffeb3b; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>🚀 Welcome to the CI/CD Node.js App</h1>
        <p>Environment: <b>${process.env.NODE_ENV || "development"}</b></p>
        <p>Version: <b>${packageJson.version}</b></p>
        <div class="routes">
          <h3>🔗 Useful Routes:</h3>
          <p><a href="/health">/health</a> - Health check</p>
          <p><a href="/version">/version</a> - Version info</p>
          <p><a href="/info">/info</a> - System info</p>
          <p><a href="/quote">/quote</a> - Random Dev Quote</p>
        </div>
      </body>
    </html>
  `);
});

// ✅ Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "UP", 
    timestamp: new Date().toISOString() 
  });
});

// ✅ Version info route
app.get("/version", (req, res) => {
  res.json({ 
    version: packageJson.version, 
    environment: process.env.NODE_ENV || "development" 
  });
});

// ✅ System info route
app.get("/info", (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
    memory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
    nodeVersion: process.version,
  });
});

// ✅ Random Quote Route
const quotes = [
  "Code. Build. Deploy. Repeat. 🚀",
  "Automation is the key to DevOps success 🔑",
  "CI/CD is not a tool, it’s a culture 💡",
  "Deploy often, fail fast, learn faster 💪",
  "Small commits, big impact ⚡"
];

app.get("/quote", (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random });
});

// ✅ Simple POST route (for testing)
app.post("/echo", (req, res) => {
  res.json({
    received: req.body,
    message: "Echo successful!",
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log("\x1b[36m%s\x1b[0m", "-----------------------------------");
  console.log("\x1b[32m%s\x1b[0m", `✅ Server running at: http://localhost:${PORT}`);
  console.log("\x1b[35m%s\x1b[0m", "🌍 CI/CD Node App is live!");
  console.log("\x1b[36m%s\x1b[0m", "-----------------------------------");
});
