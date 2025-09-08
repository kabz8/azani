import express from "express";
import { registerRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Lightweight API logging for /api requests
app.use((req, res, next) => {
  const startTimeMs = Date.now();
  let capturedBody: unknown | undefined = undefined;

  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    capturedBody = body;
    return originalJson(body);
  };

  res.on("finish", () => {
    if (req.path.startsWith("/api")) {
      const durationMs = Date.now() - startTimeMs;
      let logLine = `${req.method} ${req.path} ${res.statusCode} in ${durationMs}ms`;
      if (capturedBody !== undefined) {
        try {
          const bodyStr = JSON.stringify(capturedBody);
          if (bodyStr) logLine += ` :: ${bodyStr}`;
        } catch {
          // ignore
        }
      }
      if (logLine.length > 200) logLine = logLine.slice(0, 199) + "…";
      console.log(logLine);
    }
  });

  next();
});

// Register API routes
void registerRoutes(app);

export default app;


