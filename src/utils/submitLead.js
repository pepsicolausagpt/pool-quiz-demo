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

async function fetchWithTimeout(url, options = {}, timeout = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

async function submitTelegramLead({ message }) {
  const chunks = splitTelegramMessage(message);
  
  // v5: More neutral proxies and significantly longer timeouts for free services
  const proxyStrategies = [
    { base: "https://tg.i-c-a.su", method: "GET", mode: "cors", timeout: 8000 },
    { base: "https://api.telegram-proxy.org", method: "GET", mode: "cors", timeout: 8000 },
    { base: "https://tgproxy.site", method: "GET", mode: "cors", timeout: 8000 },
    // Neutral wrappers (no "telegram" in domain) - these are slower, so 15s timeout
    { base: "https://api.allorigins.win/get?url=", method: "WRAP", mode: "cors", timeout: 15000 },
    { base: "https://api.codetabs.com/v1/proxy?quest=", method: "WRAP", mode: "cors", timeout: 15000 },
    { base: "https://corsproxy.io/?url=", method: "WRAP", mode: "cors", timeout: 15000 },
    // Last resort: direct send (blind)
    { base: "https://api.telegram.org", method: "GET", mode: "no-cors", timeout: 10000 }
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
        params.append("_v", "v5");

        let url;
        if (strategy.method === "WRAP") {
          const target = `https://api.telegram.org/${botPart}?${params.toString()}`;
          url = `${baseUrl}${encodeURIComponent(target)}`;
        } else {
          url = `${baseUrl}/${botPart}?${params.toString()}`;
        }

        const response = await fetchWithTimeout(url, {
          method: "GET",
          mode: strategy.mode,
          credentials: "omit",
        }, strategy.timeout);

        if (strategy.mode !== "no-cors" && !response.ok) {
          const errorBody = await response.text().catch(() => "Unknown error");
          throw new Error(`[v5] Proxy ${strategy.base} failed (${response.status})`);
        }
      }
      
      return;
    } catch (error) {
      const errorMsg = error.name === "AbortError" ? "Timeout" : error.message;
      console.warn(`[v5] Strategy ${strategy.base} failed:`, errorMsg);
      lastError = new Error(`[v5] Last strategy (${strategy.base}) failed: ${errorMsg}`);
    }
  }

  throw lastError || new Error("[v5] All submission strategies failed");
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
