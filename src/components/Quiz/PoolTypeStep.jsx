import { poolTypes } from "../../data/pools";
import OptionCard from "./OptionCard";

export default function PoolTypeStep({ formData, onPoolTypeChange, error }) {
  return (
    <section className="step">
      <div className="step__header">
        <p className="eyebrow">Форма чаши</p>
        <h2>Выберите вид полипропиленового бассейна</h2>
        <p>Выберите форму, которая лучше всего подходит для вашего участка и задач</p>
      </div>
      <div className="card-grid card-grid--types">
        {poolTypes.map((poolType) => (
          <OptionCard
            key={poolType.id}
            title={poolType.title}
            image={poolType.image}
            selected={formData.poolType === poolType.id}
            onClick={() => onPoolTypeChange(poolType)}
          />
        ))}
      </div>
      {error ? <p className="field-error">{error}</p> : null}
    </section>
  );
}
