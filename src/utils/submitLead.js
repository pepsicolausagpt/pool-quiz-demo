import {
  EMAIL_SETTINGS_PLACEHOLDER,
  IVAN_API_URL,
  VERSION,
} from "../config/constants";
import { formatLeadEmail } from "./formatLeadEmail";

async function submitToIvanApi({ header, msg }) {
  if (!IVAN_API_URL) {
    throw new Error("API URL не настроен");
  }

  // Используем URLSearchParams для отправки параметров в формате application/x-www-form-urlencoded
  // Это часто более совместимо с простыми PHP-скриптами и обходит некоторые проблемы CORS
  const params = new URLSearchParams();
  params.append("header", header);
  params.append("msg", msg);

  console.info("Sending lead to Ivan API...", { url: IVAN_API_URL, header });

  const response = await fetch(IVAN_API_URL, {
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
  }

  const resultText = await response.text();
  console.info("Ivan API response:", resultText);

  if (resultText.trim().includes("ERROR")) {
    throw new Error(`API вернул ошибку: ${resultText}`);
  }

  return resultText;
}

export async function submitLead(leadData) {
  const emailBody = formatLeadEmail(leadData);
  const subject = `${EMAIL_SETTINGS_PLACEHOLDER.subject}: ${leadData.contact.fullName}`;

  try {
    // Основная и единственная отправка через шлюз Ивана
    await submitToIvanApi({
      header: subject,
      msg: emailBody,
    });

    return {
      ok: true,
      emailSubject: subject,
      emailBody,
    };
  } catch (error) {
    console.error("Lead submission failed:", error);
    
    // Если API не настроено или это локальная разработка без интернета
    if (!IVAN_API_URL) {
      console.info("Mock lead submission (no API URL)", { subject, emailBody });
      await new Promise((resolve) => window.setTimeout(resolve, 800));
      return {
        ok: true,
        isMock: true,
        emailSubject: subject,
        emailBody,
      };
    }

    throw new Error(`Не удалось отправить заявку: ${error.message}. Попробуйте еще раз или свяжитесь по телефону.`);
  }
}
