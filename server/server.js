import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import http from "node:http";

dotenv.config();

const app = express();
const requestedPort = Number(process.env.PORT) || 5000;
const API_KEY = process.env.VITE_REACT_API_KEY;

if (!API_KEY) {
  console.error("YouTube API key missing in .env!");
  process.exit(1);
}

const allowedOrigins = [
  "http://localhost:5173",
  "https://youtube-clone-nu-gold.vercel.app",
  "https://vercel.com/marshal-rams-projects/youtube-clone/71LaU43FuGA6g6ZY1zDzsW7cUb7D",
  "https://youtube-clone-git-main-marshal-rams-projects.vercel.app/",
  "https://youtube-clone-35jh2en1l-marshal-rams-projects.vercel.app/",
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  if (allowedOrigins.includes(origin)) return true;

  return (
    /^http:\/\/localhost:\d+$/.test(origin) ||
    /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
  );
};
// app.use(cors);
app.use(
  cors({
    origin: function (origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

// ==================== Fetch list of videos ====================
app.get("/api/videos", async (req, res) => {
  const { q, pageToken } = req.query;
  const query = q?.trim() || "New";

  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        part: "snippet",
        maxResults: 50,
        q: query,
        pageToken,
        key: API_KEY,
        type: "video",
      },
    });

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    res.status(status).json({ error: message });
  }
});

// ==================== Fetch single video details ====================
app.get("/api/video/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Video ID is required" });

  try {
    const response = await axios.get(`${YOUTUBE_BASE_URL}/videos`, {
      params: {
        part: "snippet,statistics",
        id,
        key: API_KEY,
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Return single video object directly
    res.json(response.data.items[0]);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message;
    res.status(status).json({ error: message });
  }
});

const MAX_PORT_RETRIES = 10;

const startServer = (port, retriesLeft = MAX_PORT_RETRIES) => {
  const server = http.createServer(app);

  server.once("listening", () => {
    console.log(`✅ Server running locally on http://localhost:${port}`);
  });

  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && retriesLeft > 0) {
      const nextPort = port + 1;
      console.warn(
        `⚠️ Port ${port} is in use. Retrying on http://localhost:${nextPort}`,
      );
      startServer(nextPort, retriesLeft - 1);
      return;
    }

    console.error("Failed to start server:", err);
    process.exit(1);
  });

  server.listen(port);
};

startServer(requestedPort);

export default app;
