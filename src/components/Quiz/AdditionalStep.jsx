import { additionalItemOptions } from "../../data/quizOptions";

export default function AdditionalStep({ formData, onFieldChange }) {
  const toggleAdditional = (value) => {
    const next = formData.additionalItems.includes(value)
      ? formData.additionalItems.filter((item) => item !== value)
      : [...formData.additionalItems, value];
    onFieldChange("additionalItems", next);
  };

  return (
    <section className="step step--additional">
      <div className="step__header">
        <p className="eyebrow">Опции</p>
        <h2>Дополнительно я хотел бы приобрести</h2>
      </div>
      <div className="additional-sections">
        <div className="choice-section">
          <div className="choice-section__header">
            <h3>Дополнительные товары</h3>
          </div>
          <div className="choice-list">
            {additionalItemOptions.map((option) => (
              <button
                key={option.value}
                className={`choice ${formData.additionalItems.includes(option.value) ? "is-selected" : ""}`}
                type="button"
                onClick={() => toggleAdditional(option.value)}
              >
                <span className="choice__label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
