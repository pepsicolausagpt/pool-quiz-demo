export const PRESENTATION_URL = `${import.meta.env.BASE_URL}presentation.pdf`;

export const LEAD_SOURCE = "РђРІРёС‚Рѕ / РєРІРёР·";

export const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT ?? "/api/lead";

export const TELEGRAM_BOT_TOKEN =
  import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "8454877515:AAHSHrHEXhFwBWnm-SXIJ-delBrUsZ8goo0";

export const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || "730519432";

export const EMAIL_SETTINGS_PLACEHOLDER = {
  to: "owner@example.com",
  subject: "РќРѕРІР°СЏ Р·Р°СЏРІРєР° РЅР° СЂР°СЃС‡РµС‚ Р±Р°СЃСЃРµР№РЅР°",
};
