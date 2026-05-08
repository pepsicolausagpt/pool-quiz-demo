import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sendTelegramMessage } from "./telegramClient.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const app = express();
const port = Number(process.env.PORT || 3001);
const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

app.use(express.json({ limit: "1mb" }));

const telegramRequiredEnv = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"];

const hasTelegramSettings = () => telegramRequiredEnv.every((key) => process.env[key]);

const getTelegramSettings = () => ({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  chatId: process.env.TELEGRAM_CHAT_ID,
});

app.post("/api/lead", async (request, response) => {
  try {
    const { subject, message, telegramMessage, email, phone } = request.body || {};

    if (!message || !phone || !email) {
      response.status(400).json({ ok: false, error: "Missing required lead fields" });
      return;
    }

    if (!emailPattern.test(String(email))) {
      response.status(400).json({ ok: false, error: "Invalid email" });
      return;
    }

    const emailSubject = subject || "Новая заявка на расчет бассейна";
    const text = telegramMessage || String(message);

    if (!hasTelegramSettings()) {
      throw new Error("Missing Telegram settings: configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID");
    }

    await sendTelegramMessage({
      ...getTelegramSettings(),
      text: `${emailSubject}\n\n${text}`,
    });

    response.json({ ok: true });
  } catch (error) {
    console.error("Lead delivery failed", error);
    response.status(500).json({
      ok: false,
      error: "Не удалось отправить заявку. Попробуйте еще раз или свяжитесь по телефону.",
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
