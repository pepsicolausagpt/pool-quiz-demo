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
  const proxies = TELEGRAM_PROXIES.length > 0 ? TELEGRAM_PROXIES : ["https://api.telegram.org"];
  
  let lastError = null;

  for (const proxyBase of proxies) {
    try {
      const baseUrl = proxyBase.endsWith("/") ? proxyBase.slice(0, -1) : proxyBase;
      const botUrl = `${baseUrl}/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      for (const chunk of chunks) {
        const params = new URLSearchParams();
        params.append("chat_id", TELEGRAM_CHAT_ID);
        params.append("text", chunk);
        params.append("parse_mode", "HTML");
        params.append("disable_web_page_preview", "true");
        // Add cache buster
        params.append("_t", Date.now().toString());

        const url = `${botUrl}?${params.toString()}`;

        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          credentials: "omit",
        });

        if (!response.ok) {
          const errorBody = await response.text().catch(() => "Unknown error");
          throw new Error(`Telegram proxy ${proxyBase} returned ${response.status}: ${errorBody}`);
        }
      }
      
      return;
    } catch (error) {
      console.warn(`Telegram delivery failed via ${proxyBase}:`, error.message);
      lastError = error;
    }
  }

  throw lastError || new Error("All Telegram proxies failed");
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
