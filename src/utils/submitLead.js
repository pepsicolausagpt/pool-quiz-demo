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

  // Используем FormData для отправки параметров header и msg
  const formData = new FormData();
  formData.append("header", header);
  formData.append("msg", msg);

  const response = await fetch(IVAN_API_URL, {
    method: "POST",
    body: formData,
    // Режим cors важен для запросов с одного домена на другой
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }

  const resultText = await response.text();
  if (resultText.includes("ERROR")) {
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
