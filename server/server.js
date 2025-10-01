import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { handleSubmit } from "./api/submit.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints (before static files)
app.get("/health", (req, res) => {
  res.json({ status: "online", timestamp: new Date().toISOString() });
});

app.post("/api/submit", handleSubmit);

// Serve static files from dist folder (built by Vite at root level)
app.use(express.static(path.join(__dirname, "../dist")));

// All other routes serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🎨 Serving frontend from dist folder`);
});
