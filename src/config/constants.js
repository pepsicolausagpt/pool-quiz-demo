export const VERSION = "v8-ivan-api";
export const PRESENTATION_URL = `${import.meta.env.BASE_URL}presentation.pdf`;

export const LEAD_SOURCE = "Авито / квиз";

// Новая точка входа для отправки заявок (Шлюз Ивана)
export const IVAN_API_URL = import.meta.env.VITE_IVAN_API_URL || "";

// Старый эндпоинт (можно оставить для тестов или проксирования)
export const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || "";

export const EMAIL_SETTINGS_PLACEHOLDER = {
  subject: "Новая заявка на расчет бассейна",
};
