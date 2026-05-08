export default function ProgressBar({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="progress" aria-label={`Шаг ${current + 1} из ${total}`}>
      <div className="progress__meta">
        <span>
          Шаг {current + 1} из {total}
        </span>
        <strong>{percent}%</strong>
      </div>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
