import { locationOptions } from "../../data/quizOptions";

export default function LocationStep({ formData, onFieldChange, error }) {
  return (
    <section className="step">
      <div className="step__header">
        <p className="eyebrow">Условия монтажа</p>
        <h2>Местоположение</h2>
        <p>Где будет расположен Ваш бассейн?</p>
      </div>
      <div className="choice-list choice-list--inline">
        {locationOptions.map((option) => (
          <button
            key={option.value}
            className={`choice choice--large ${formData.location === option.value ? "is-selected" : ""}`}
            type="button"
            onClick={() => onFieldChange("location", option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error ? <p className="field-error">{error}</p> : null}
    </section>
  );
}
