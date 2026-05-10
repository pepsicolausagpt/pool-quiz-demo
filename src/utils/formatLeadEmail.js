import { optionLabels } from "../data/quizOptions";
import { pools } from "../data/pools";

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.length ? value.map((item) => optionLabels[item] || item).join(", ") : "Не выбрано";
  }

  if (value === null || value === undefined || value === "") {
    return "Не указано";
  }

  return optionLabels[value] || String(value);
};

const formatPrice = (value) =>
  value || value === 0 ? `${Number(value).toLocaleString("ru-RU")} руб.` : "Не указано";

const formatDate = (isoDate) =>
  new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));

const formatModelSize = (model) => {
  if (!model) {
    return formatValue(null);
  }

  const base = model.diameter
    ? `Диаметр: ${formatValue(model.diameter)}`
    : `${formatValue(model.length)} x ${formatValue(model.width)}`;

  return model.extraSpec ? `${base}, ${model.extraSpec.label}: ${model.extraSpec.value}` : base;
};

const escapeHtml = (unsafe) => {
  if (typeof unsafe !== "string") return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export function formatTelegramMessage(leadData) {
  const contact = leadData.contact;
  const formatDateLocal = (isoDate) =>
    new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoDate));

  const formatPriceLocal = (value) =>
    value || value === 0 ? `${Number(value).toLocaleString("ru-RU")} руб.` : "Не указано";

  const rows = [
    "<b>🚀 Новая заявка на расчет бассейна</b>",
    "",
    "<b>👤 Клиент:</b>",
    `Имя: ${escapeHtml(formatValue(contact.fullName))}`,
    `📍 Город: ${escapeHtml(formatValue(contact.deliveryCity))}`,
    `📞 Тел: <code>${escapeHtml(formatValue(contact.phone))}</code>`,
    `📧 Email: ${escapeHtml(formatValue(contact.email))}`,
    "",
    "<b>🏊 Параметры бассейна:</b>",
  ];

  rows.push(
    `<i>Тип: Готовая модель (${escapeHtml(pools[leadData.poolType]?.title || leadData.poolType)})</i>`,
    `Модель: <b>${escapeHtml(formatValue(leadData.selectedModel?.name))}</b>`,
    `Габариты: ${escapeHtml(formatModelSize(leadData.selectedModel))}`,
    `Цена чаши: ${formatPriceLocal(leadData.selectedModel?.poolPrice)}`,
  );

  rows.push(
    "",
    "<b>⚙️ Оборудование и опции:</b>",
    `Локация: ${escapeHtml(formatValue(leadData.location))}`,

    `Элементы: ${escapeHtml(formatValue(leadData.equipmentItems))}`,
    `Дезинфекция: ${escapeHtml(formatValue(leadData.waterDisinfection))}`,
    `Противоток: ${escapeHtml(formatValue(leadData.counterflow))}`,
    `Нагрев: ${escapeHtml(formatValue(leadData.waterHeating))}`,
    "",
    "<b>💰 Сроки и бюджет:</b>",
    `Срок: ${escapeHtml(formatValue(leadData.implementationTime))}`,
    `Бюджет: <b>${escapeHtml(formatValue(leadData.budgetLimit))}</b>`,
    `Схема: ${escapeHtml(formatValue(leadData.implementationScheme))}`,
    `Комментарий: <i>${escapeHtml(formatValue(leadData.comment))}</i>`,
    "",
    `📅 Дата: ${formatDateLocal(leadData.createdAt)}`,
    `🔗 Источник: ${escapeHtml(leadData.source)}`,
  );

  return rows.join("\n");
}

export function formatLeadEmail(leadData) {
  const contact = leadData.contact;
  const base = [
    "Новая заявка на расчет бассейна",
    "",
    "Контакты клиента:",
    `Имя: ${formatValue(contact.fullName)}`,
    `Город поставки: ${formatValue(contact.deliveryCity)}`,
    `Телефон: ${formatValue(contact.phone)}`,
    `Email: ${formatValue(contact.email)}`,
    "",
    "Параметры бассейна:",
  ];

  const poolBlock = [
    "Тип расчета: Готовая модель",
    `Вид бассейна: ${pools[leadData.poolType]?.title || leadData.poolType}`,
    `Модель: ${formatValue(leadData.selectedModel?.name)}`,
    `Габариты: ${formatModelSize(leadData.selectedModel)}`,

    `Цена чаши: ${formatPrice(leadData.selectedModel?.poolPrice)}`,
  ];

  const budgetBlock = [
    "Сроки и бюджет:",
    `Срок реализации: ${formatValue(leadData.implementationTime)}`,
    `Оценка бюджета: ${formatValue(leadData.budgetLevel)}`,
    `Схема реализации: ${formatValue(leadData.implementationScheme)}`,
    `Бюджет: ${formatValue(leadData.budgetLimit)}`,
    `Комментарий: ${formatValue(leadData.comment)}`,
  ];

  return [
    ...base,
    ...poolBlock,
    "",
    "Местоположение:",
    `Где будет расположен бассейн: ${formatValue(leadData.location)}`,
    "",
    "Оборудование:",

    `Элементы оборудования: ${formatValue(leadData.equipmentItems)}`,
    `Обеззараживание воды: ${formatValue(leadData.waterDisinfection)}`,
    `Противоток: ${formatValue(leadData.counterflow)}`,
    `Нагрев воды: ${formatValue(leadData.waterHeating)}`,
    "",
    "Дополнительно:",
    `Дополнительные товары: ${formatValue(leadData.additionalItems)}`,
    "",
    ...budgetBlock,
    "",
    `Источник: ${leadData.source}`,
    `Дата заявки: ${formatDate(leadData.createdAt)}`,
  ].join("\n");
}
