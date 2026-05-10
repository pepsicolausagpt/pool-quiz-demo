export function validateStep(stepId, formData) {
  const errors = {};
  const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

  const requireField = (field, message = "Заполните поле") => {
    const value = formData[field];
    if (Array.isArray(value) ? value.length === 0 : !value) {
      errors[field] = message;
    }
  };

  if (stepId === "poolType") {
    requireField("poolType", "Выберите вид бассейна");
  }

  if (stepId === "model") {
    requireField("selectedModel", "Выберите модель бассейна");
  }

  if (stepId === "customSize") {
    requireField("poolWidth", "Выберите ширину");
    requireField("poolLength", "Выберите длину");
    requireField("linerType", "Выберите тип пленки");
  }

  if (stepId === "location") {
    requireField("location", "Выберите местоположение");
  }

  if (stepId === "budgetCatalog") {
    requireField("implementationTime", "Выберите срок реализации");
    requireField("budgetLevel", "Выберите оценку бюджета");
    requireField("implementationScheme", "Выберите схему реализации");
    requireField("budgetLimit", "Выберите бюджет");
  }

  if (stepId === "budgetCustom") {
    requireField("implementationTime", "Выберите срок реализации");
    requireField("budgetLevel", "Выберите оценку бюджета");
    requireField("budgetLimit", "Выберите бюджет");
  }

  if (stepId === "contact") {
    requireField("fullName", "Укажите имя");
    requireField("deliveryCity", "Укажите город поставки");
    requireField("phone", "Укажите контактный телефон");
    requireField("email", "Укажите email для получения расчета");

    if (formData.phone && formData.phone.replace(/\D/g, "").length !== 11) {
      errors.phone = "Укажите номер телефона полностью";
    }

    if (formData.email && !emailPattern.test(formData.email)) {
      errors.email = "Проверьте формат email";
    }
  }

  return errors;
}

export function isStepValid(stepId, formData) {
  return Object.keys(validateStep(stepId, formData)).length === 0;
}
