const formatPhone = (value) => {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits && !digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);

  if (!digits) {
    return "";
  }

  const local = digits.startsWith("7") ? digits.slice(1) : digits;
  const area = local.slice(0, 3);
  const first = local.slice(3, 6);
  const second = local.slice(6, 8);
  const third = local.slice(8, 10);

  let formatted = "+7";
  if (area) formatted += ` ${area}`;
  if (first) formatted += ` ${first}`;
  if (second) formatted += `-${second}`;
  if (third) formatted += `-${third}`;

  return formatted;
};

const isPhoneKeyAllowed = (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return true;
  }

  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
    "Tab",
    "Enter",
  ];

  return allowedKeys.includes(event.key) || /^\d$/.test(event.key);
};

export default function ContactStep({ formData, onFieldChange, errors }) {
  return (
    <section className="step step--contact">
      <div className="step__header">
        <p className="eyebrow">Финальный шаг</p>
        <h2>Куда отправить расчет?</h2>
        <p>Оставьте контакты — специалист подготовит расчет и уточнит детали по вашему бассейну.</p>
      </div>
      <div className="contact-form">
        <div className="form-grid form-grid--contact">
          <label className="field">
            <span>Ваше имя</span>
            <input
              type="text"
              value={formData.fullName}
              onChange={(event) => onFieldChange("fullName", event.target.value)}
              autoComplete="name"
              placeholder="Например, Анна"
            />
            {errors.fullName ? <span className="field-error">{errors.fullName}</span> : null}
          </label>
          <label className="field">
            <span>Город поставки</span>
            <input
              type="text"
              value={formData.deliveryCity}
              onChange={(event) => onFieldChange("deliveryCity", event.target.value)}
              autoComplete="address-level2"
              placeholder="Например, Москва"
            />
            {errors.deliveryCity ? <span className="field-error">{errors.deliveryCity}</span> : null}
          </label>
          <label className="field">
            <span>Контактный телефон</span>
            <input
              type="tel"
              value={formData.phone}
              onChange={(event) => onFieldChange("phone", formatPhone(event.target.value))}
              onKeyDown={(event) => {
                if (!isPhoneKeyAllowed(event)) {
                  event.preventDefault();
                }
              }}
              autoComplete="tel"
              inputMode="numeric"
              placeholder="+7 900 000-00-00"
            />
            <small>Проверьте номер: по нему специалист сможет связаться для уточнения расчета.</small>
            {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
          </label>
          <label className="field">
            <span>Email для получения расчета</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => onFieldChange("email", event.target.value)}
              autoComplete="email"
              placeholder="name@example.ru"
            />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </label>
        </div>
        <div className="contact-assurance">
          <span>Расчет ни к чему не обязывает</span>
          <span>Данные используются только для подготовки предложения</span>
          <span>Ответим в рабочее время</span>
        </div>
      </div>
    </section>
  );
}
