export const VERSION = "v7-robust-ru";
export const PRESENTATION_URL = `${import.meta.env.BASE_URL}presentation.pdf`;

export const LEAD_SOURCE = "Авито / квиз";

export const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || "";

export const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "";
export const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || "";
export const TELEGRAM_API_URL = import.meta.env.VITE_TELEGRAM_API_URL || "";

export const TELEGRAM_PROXIES = [
  "https://tgproxy.site",
  "https://api.telegram-proxy.org",
  TELEGRAM_API_URL,
  "https://tg.i-c-a.su",
  "https://telegg.xyz",
  "https://thingproxy.freeboard.io/fetch/",
  "https://corsproxy.org/?url=",
  "https://cors-proxy.htmldriven.com/?url=",
].filter(Boolean);

export const EMAIL_SETTINGS_PLACEHOLDER = {
  to: "owner@example.com",
  subject: "Новая заявка на расчет бассейна",
};
