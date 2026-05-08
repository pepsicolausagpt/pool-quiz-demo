const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "Не выбрано";
  }

  if (value === null || value === undefined || value === "") {
    return "Не указано";
  }

  return String(value);
};

const formatDate = (isoDate) => {
  if (!isoDate) {
    return "Не указано";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
};

export function formatLeadEmail(leadData) {
  const contact = leadData.contact || {};
  const selectedModel = leadData.selectedModel || {};
  const customPool = leadData.customPool || {};

  return [
    "Новая заявка на расчет бассейна",
    "",
    "Контакты клиента:",
    `Имя: ${formatValue(contact.fullName)}`,
    `Город поставки: ${formatValue(contact.deliveryCity)}`,
    `Телефон: ${formatValue(contact.phone)}`,
    `Email: ${formatValue(contact.email)}`,
    "",
    "Параметры бассейна:",
    `Тип расчета: ${leadData.branch === "custom_large_pool" ? "Индивидуальный бассейн" : "Готовая модель"}`,
    `Вид бассейна: ${formatValue(leadData.poolType)}`,
    `Модель: ${formatValue(selectedModel.name)}`,
    `Размеры модели: ${formatValue(selectedModel.length || selectedModel.diameter)} x ${formatValue(selectedModel.width)} x ${formatValue(selectedModel.depth)}`,
    `Ширина индивидуального бассейна: ${formatValue(customPool.width)}`,
    `Длина индивидуального бассейна: ${formatValue(customPool.length)}`,
    `Глубина индивидуального бассейна: ${formatValue(customPool.depth)}`,
    `Тип пленки: ${formatValue(customPool.linerType)}`,
    "",
    "Местоположение и оборудование:",
    `Расположение: ${formatValue(leadData.location)}`,
    `Решение по оборудованию: ${formatValue(leadData.equipmentSolution)}`,
    `Оборудование: ${formatValue(leadData.equipmentItems)}`,
    `Обеззараживание воды: ${formatValue(leadData.waterDisinfection)}`,
    `Противоток: ${formatValue(leadData.counterflow)}`,
    `Нагрев воды: ${formatValue(leadData.waterHeating)}`,
    `Дополнительные товары: ${formatValue(leadData.additionalItems)}`,
    `Акция: ${formatValue(leadData.promotion)}`,
    "",
    "Сроки и бюджет:",
    `Срок реализации: ${formatValue(leadData.implementationTime)}`,
    `Оценка бюджета: ${formatValue(leadData.budgetLevel)}`,
    `Схема реализации: ${formatValue(leadData.implementationScheme)}`,
    `Бюджет: ${formatValue(leadData.budgetLimit)}`,
    `Комментарий: ${formatValue(leadData.comment)}`,
    "",
    `Источник: ${formatValue(leadData.source)}`,
    `Дата заявки: ${formatDate(leadData.createdAt)}`,
  ].join("\n");
}
