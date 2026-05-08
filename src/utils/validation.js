const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

const setRequired = (errors, field, value, message = "Заполните поле") => {
  if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
    errors[field] = message;
  }
};

export function validateStep(step, formData) {
  const errors = {};

  if (step === "poolType") {
    setRequired(errors, "poolType", formData.poolType, "Выберите тип бассейна");
  }

  if (step === "model") {
    setRequired(errors, "selectedModel", formData.selectedModel, "Выберите модель");
  }

  if (step === "customSize") {
    setRequired(errors, "poolWidth", formData.poolWidth);
    setRequired(errors, "poolLength", formData.poolLength);
    setRequired(errors, "poolDepth", formData.poolDepth);
    setRequired(errors, "linerType", formData.linerType, "Выберите тип пленки");
  }

  if (step === "location") {
    setRequired(errors, "location", formData.location, "Выберите расположение бассейна");
  }

  if (step === "budgetCatalog") {
    setRequired(errors, "implementationTime", formData.implementationTime);
    setRequired(errors, "budgetLevel", formData.budgetLevel);
    setRequired(errors, "implementationScheme", formData.implementationScheme);
    setRequired(errors, "budgetLimit", formData.budgetLimit);
  }

  if (step === "budgetCustom") {
    setRequired(errors, "implementationTime", formData.implementationTime);
    setRequired(errors, "budgetLevel", formData.budgetLevel);
    setRequired(errors, "budgetLimit", formData.budgetLimit);
  }

  if (step === "contact") {
    setRequired(errors, "fullName", formData.fullName, "Укажите имя");
    setRequired(errors, "deliveryCity", formData.deliveryCity, "Укажите город");
    setRequired(errors, "phone", formData.phone, "Укажите телефон");
    setRequired(errors, "email", formData.email, "Укажите email");

    if (formData.email && !emailPattern.test(String(formData.email))) {
      errors.email = "Укажите корректный email";
    }
  }

  return errors;
}

export function isStepValid(step, formData) {
  return Object.keys(validateStep(step, formData)).length === 0;
}
