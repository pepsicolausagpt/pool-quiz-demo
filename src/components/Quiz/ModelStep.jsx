import { pools } from "../../data/pools";
import OptionCard from "./OptionCard";

const formatPrice = (value) =>
  value || value === 0 ? `${Number(value).toLocaleString("ru-RU")} руб.` : "не указана";

export default function ModelStep({ formData, onFieldChange, error }) {
  const pool = pools[formData.poolType];
  const models = pool?.models || [];

  return (
    <section className="step">
      <div className="step__header">
        <p className="eyebrow">{pool?.title || "Каталог"}</p>
        <h2>Выберите модель бассейна</h2>
      </div>
      <div className="card-grid card-grid--models">
        {models.map((model) => (
          <OptionCard
            key={model.id}
            title={model.name}
            image={model.image}
            selected={formData.selectedModel?.id === model.id}
            onClick={() => onFieldChange("selectedModel", model)}
          >
            <dl className="model-specs">
              {model.diameter ? (
                <div>
                  <dt>Диаметр</dt>
                  <dd>{model.diameter}</dd>
                </div>
              ) : (
                <>
                  <div>
                    <dt>Длина</dt>
                    <dd>{model.length}</dd>
                  </div>
                  <div>
                    <dt>Ширина</dt>
                    <dd>{model.width}</dd>
                  </div>
                </>
              )}
              {model.extraSpec ? (
                <div>
                  <dt>{model.extraSpec.label}</dt>
                  <dd>{model.extraSpec.value}</dd>
                </div>
              ) : null}

            </dl>
            <span className="price-line">Чаша: {formatPrice(model.poolPrice)}</span>
          </OptionCard>
        ))}
      </div>
      {error ? <p className="field-error">{error}</p> : null}
    </section>
  );
}
