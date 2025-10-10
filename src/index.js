// src/index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const packageJson = require("../package.json");

// Middleware
app.use(express.json());

// 🌐 Home Route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to the CI/CD Node.js App with Express!",
    environment: process.env.NODE_ENV || "development",
    description:
      "This project demonstrates automated deployment using GitHub Actions, CI/CD pipeline, and Node.js best practices.",
    features: [
      "✅ Health monitoring endpoint",
      "✅ Version info from package.json",
      "✅ POST request testing endpoint",
      "✅ Auto-deployment support",
      "✅ JSON middleware integration",
    ],
    tips: "Try /health or /version in your browser to test endpoints.",
  });
});

// 🩺 Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "CI/CD Node App",
    checkedAt: new Date().toISOString(),
  });
});

// 🧭 Version Info Route
app.get("/version", (req, res) => {
  res.json({
    version: packageJson.version,
    app: packageJson.name,
    author: packageJson.author || "Vishakha Bhushan Gujar",
  });
});

// 📨 Echo POST Route
app.post("/echo", (req, res) => {
  res.json({
    receivedData: req.body,
    message: "Your data was received successfully!",
    timestamp: new Date().toISOString(),
  });
});

// 🧠 About Project
app.get("/about", (req, res) => {
  res.json({
    project: "CI/CD Node.js Application",
    builtBy: "Vishakha Bhushan Gujar",
    purpose:
      "This app showcases how to integrate Node.js with GitHub Actions for continuous integration and deployment.",
    techStack: ["Node.js", "Express.js", "GitHub Actions", "CI/CD Pipeline"],
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
