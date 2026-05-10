import {
  counterflowOptions,
  equipmentItemOptions,
  waterDisinfectionOptions,
  waterHeatingOptions,
} from "../../data/quizOptions";

function ChoiceLabel({ label }) {
  const match = label.match(/^(.*?)(\s*\([^)]*\))$/);

  if (!match) {
    return <span className="choice__label">{label}</span>;
  }

  return (
    <span className="choice__label">
      <span className="choice__main">{match[1]}</span>
      <span className="choice__hint">{match[2].trim()}</span>
    </span>
  );
}

function ToggleSection({ title, options, value, type, onChange }) {
  const isCheckbox = type === "checkbox";

  const toggle = (optionValue) => {
    if (!isCheckbox) {
      onChange(optionValue);
      return;
    }

    const next = value.includes(optionValue)
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue];
    onChange(next);
  };

  return (
    <div className="choice-section">
      <div className="choice-section__header">
        <h3>{title}</h3>
      </div>
      <div className={`choice-list ${options.length === 3 ? "choice-list--three" : ""}`}>
        {options.map((option) => {
          const selected = isCheckbox ? value.includes(option.value) : value === option.value;

          return (
            <button
              key={option.value}
              className={`choice ${selected ? "is-selected" : ""}`}
              type="button"
              onClick={() => toggle(option.value)}
            >
              <ChoiceLabel label={option.label} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function EquipmentStep({ formData, onFieldChange }) {
  return (
    <section className="step step--equipment">
      <div className="step__header">
        <p className="eyebrow">Комплектация</p>
        <h2>Оборудование</h2>
      </div>
      <div className="equipment-sections">

        <ToggleSection
          title="Выберите необходимые элементы оборудования"
          options={equipmentItemOptions}
          value={formData.equipmentItems}
          type="checkbox"
          onChange={(value) => onFieldChange("equipmentItems", value)}
        />
        <ToggleSection
          title="Выберите необходимые варианты обеззараживания воды"
          options={waterDisinfectionOptions}
          value={formData.waterDisinfection}
          type="checkbox"
          onChange={(value) => onFieldChange("waterDisinfection", value)}
        />
        <ToggleSection
          title="Искусственное течение (противоток)"
          options={counterflowOptions}
          value={formData.counterflow}
          type="radio"
          onChange={(value) => onFieldChange("counterflow", value)}
        />
        <ToggleSection
          title="Нагрев воды"
          options={waterHeatingOptions}
          value={formData.waterHeating}
          type="radio"
          onChange={(value) => onFieldChange("waterHeating", value)}
        />
      </div>
    </section>
  );
}
