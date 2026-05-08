import {
  linerTypeOptions,
  poolDepthOptions,
  poolLengthOptions,
  poolWidthOptions,
} from "../../data/quizOptions";

function SelectField({ label, value, options, onChange, error }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value || ""} onChange={(event) => onChange(event.target.value)}>
        <option value="">Выберите</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}

export default function CustomSizeStep({ formData, onFieldChange, errors, onBackToCatalog }) {
  return (
    <section className="step step--custom-size">
      <div className="step__header">
        <p className="eyebrow">Индивидуальный расчет</p>
        <h2>Размер бассейна</h2>
      </div>
      <div className="custom-size-sections">
        <div className="choice-section custom-size-dimensions">
          <div className="choice-section__header">
            <h3>Укажите размеры чаши</h3>
          </div>
          <div className="form-grid">
            <SelectField
              label="Ширина бассейна, м"
              value={formData.poolWidth}
              options={poolWidthOptions}
              onChange={(value) => onFieldChange("poolWidth", value)}
              error={errors.poolWidth}
            />
            <SelectField
              label="Длина бассейна, м"
              value={formData.poolLength}
              options={poolLengthOptions}
              onChange={(value) => onFieldChange("poolLength", value)}
              error={errors.poolLength}
            />
            <SelectField
              label="Глубина бассейна, м"
              value={formData.poolDepth}
              options={poolDepthOptions}
              onChange={(value) => onFieldChange("poolDepth", value)}
              error={errors.poolDepth}
            />
          </div>
        </div>
        <div className="choice-section">
          <div className="choice-section__header">
            <h3>Выберите тип пленки</h3>
          </div>
          <div className="choice-list choice-list--inline">
            {linerTypeOptions.map((option) => (
              <button
                key={option.value}
                className={`choice ${formData.linerType === option.value ? "is-selected" : ""}`}
                type="button"
                onClick={() => onFieldChange("linerType", option.value)}
              >
                <span className="choice__label">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.linerType ? <p className="field-error">{errors.linerType}</p> : null}
        </div>
        <div className="notice">
          <p>Нужен бассейн меньше 6 метров? Выберите готовую модель из каталога стандартных бассейнов.</p>
          <button className="text-button" type="button" onClick={onBackToCatalog}>
            Перейти к стандартным моделям
          </button>
        </div>
      </div>
    </section>
  );
}
