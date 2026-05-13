import {
  catalogBudgetLimitOptions,
  implementationSchemeOptions,
  implementationTimeOptions,
} from "../../data/quizOptions";

function RadioGroup({ title, options, value, onChange, error }) {
  return (
    <div className="choice-section">
      <div className="choice-section__header">
        <h3>{title}</h3>
      </div>
      <div className="choice-list">
        {options.map((option) => (
          <button
            key={option.value}
            className={`choice ${value === option.value ? "is-selected" : ""}`}
            type="button"
            onClick={() => onChange(option.value)}
          >
            <span className="choice__label">{option.label}</span>
          </button>
        ))}
      </div>
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}

export default function BudgetStepCatalog({ formData, onFieldChange, errors }) {
  return (
    <section className="step step--budget">
      <div className="step__header">
        <p className="eyebrow">Планирование</p>
        <h2>Время, бюджет и схема реализации</h2>
        <p>Ответьте на несколько вопросов — они помогут подготовить расчет под ваш формат работ и ожидаемый бюджет.</p>
      </div>
      <div className="planning-sections">
        <RadioGroup
          title="Предполагаемый срок реализации устройства бассейна"
          options={implementationTimeOptions}
          value={formData.implementationTime}
          onChange={(value) => onFieldChange("implementationTime", value)}
          error={errors.implementationTime}
        />
        <RadioGroup
          title="Ваша оценка бюджетности и планируемый бюджет"
          options={catalogBudgetLimitOptions}
          value={formData.budgetLimit}
          onChange={(value) => {
            const option = catalogBudgetLimitOptions.find((opt) => opt.value === value);
            onFieldChange("budgetLevel", option?.level || "");
            onFieldChange("budgetLimit", value);
          }}
          error={errors.budgetLimit}
        />
        <RadioGroup
          title="Планируемая схема реализации возведения"
          options={implementationSchemeOptions}
          value={formData.implementationScheme}
          onChange={(value) => onFieldChange("implementationScheme", value)}
          error={errors.implementationScheme}
        />
        <label className="field planning-comment">
          <span>Комментарий</span>
          <textarea value={formData.comment} onChange={(event) => onFieldChange("comment", event.target.value)} />
        </label>
      </div>
    </section>
  );
}
