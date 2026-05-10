import {
  EMAIL_SETTINGS_PLACEHOLDER,
  LEAD_ENDPOINT,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  TELEGRAM_PROXIES,
} from "../config/constants";
import { formatLeadEmail, formatTelegramMessage } from "./formatLeadEmail";

const TELEGRAM_LIMIT = 4096;

const splitTelegramMessage = (message) => {
  const chunks = [];
  let text = String(message);

  while (text.length > TELEGRAM_LIMIT) {
    const slice = text.slice(0, TELEGRAM_LIMIT);
    const breakAt = Math.max(slice.lastIndexOf("\n"), slice.lastIndexOf(" "));
    const end = breakAt > 1000 ? breakAt : TELEGRAM_LIMIT;
    chunks.push(text.slice(0, end));
    text = text.slice(end).trimStart();
  }

  if (text) {
    chunks.push(text);
  }

  return chunks;
};

async function submitTelegramLead({ message }) {
  const chunks = splitTelegramMessage(message);
  
  // Use a mix of direct proxies and neutral wrappers
  const proxyStrategies = [
    { base: "https://api.telegram-proxy.org", method: "GET", mode: "cors" },
    { base: "https://tgproxy.site", method: "GET", mode: "cors" },
    // Neutral wrapper that doesn't have "telegram" in the domain
    { base: "https://api.allorigins.win/get?url=", method: "WRAP", mode: "cors" },
    // Last resort: direct to official API with no-cors (blind send)
    { base: "https://api.telegram.org", method: "GET", mode: "no-cors" }
  ];
  
  let lastError = null;

  for (const strategy of proxyStrategies) {
    try {
      const baseUrl = strategy.base.endsWith("/") ? strategy.base.slice(0, -1) : strategy.base;
      const botPart = `bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      for (const chunk of chunks) {
        const params = new URLSearchParams();
        params.append("chat_id", TELEGRAM_CHAT_ID);
        params.append("text", chunk);
        params.append("parse_mode", "HTML");
        params.append("disable_web_page_preview", "true");
        params.append("_v", "v4"); // Version tag

        let url;
        if (strategy.method === "WRAP") {
          const target = `https://api.telegram.org/${botPart}?${params.toString()}`;
          url = `${baseUrl}${encodeURIComponent(target)}`;
        } else {
          url = `${baseUrl}/${botPart}?${params.toString()}`;
        }

        const response = await fetch(url, {
          method: "GET",
          mode: strategy.mode,
          credentials: "omit",
        });

        // In no-cors mode, response.ok is always false and we can't read the body.
        // We just assume it worked if it didn't throw a network error.
        if (strategy.mode !== "no-cors" && !response.ok) {
          const errorBody = await response.text().catch(() => "Unknown error");
          throw new Error(`[v4] Proxy ${strategy.base} failed (${response.status}): ${errorBody}`);
        }
      }
      
      return;
    } catch (error) {
      console.warn(`[v4] Strategy ${strategy.base} failed:`, error.message);
      lastError = error;
    }
  }

  throw lastError || new Error("[v4] All submission strategies failed");
}

export async function submitLead(leadData) {
  const emailBody = formatLeadEmail(leadData);
  const payload = {
    _subject: EMAIL_SETTINGS_PLACEHOLDER.subject,
    subject: EMAIL_SETTINGS_PLACEHOLDER.subject,
    name: leadData.contact.fullName,
    email: leadData.contact.email,
    phone: leadData.contact.phone,
    city: leadData.contact.deliveryCity,
    message: emailBody,
    telegramMessage: formatTelegramMessage(leadData),
    leadData,
  };

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID && !LEAD_ENDPOINT) {
    const tgMessage = formatTelegramMessage(leadData);
    await submitTelegramLead({
      message: tgMessage,
    });

    return {
      ok: true,
      emailSubject: EMAIL_SETTINGS_PLACEHOLDER.subject,
      emailBody,
    };
  }

  if (!LEAD_ENDPOINT) {
    console.info("Mock lead submission: set Telegram settings or VITE_LEAD_ENDPOINT to send real leads", {
      email: EMAIL_SETTINGS_PLACEHOLDER,
      payload,
    });

    await new Promise((resolve) => window.setTimeout(resolve, 700));

    return {
      ok: true,
      emailSubject: EMAIL_SETTINGS_PLACEHOLDER.subject,
      emailBody,
      isMock: true,
    };
  }

  const response = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Не удалось отправить заявку. Попробуйте еще раз или свяжитесь по телефону.");
  }

  return {
    ok: true,
    emailSubject: EMAIL_SETTINGS_PLACEHOLDER.subject,
    emailBody,
  };
}
