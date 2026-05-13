import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const app = express();
const port = Number(process.env.PORT || 3001);
const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

app.use(express.json({ limit: "1mb" }));

app.post("/api/lead", async (request, response) => {
  try {
    const { subject, message, email, phone } = request.body || {};

    if (!message || !phone || !email) {
      response.status(400).json({ ok: false, error: "Missing required lead fields" });
      return;
    }

    if (!emailPattern.test(String(email))) {
      response.status(400).json({ ok: false, error: "Invalid email" });
      return;
    }

    console.info("Lead received on server (TG disabled):", { subject, email, phone });
    
    // Server-side delivery is currently disabled in favor of client-side Ivan API gateway.
    // If needed, SMTP or other logic can be added here.
    
    response.json({ ok: true, note: "Server received lead but delivery is handled by client-side API" });
  } catch (error) {
    console.error("Lead processing failed", error);
    response.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

app.use(express.static(distDir));

app.use((request, response, next) => {
  if (request.method !== "GET") {
    next();
    return;
  }

  response.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Pool quiz server is running: http://127.0.0.1:${port}`);
});
