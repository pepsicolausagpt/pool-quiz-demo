export default function OptionCard({ title, subtitle, meta, image, selected, onClick, children }) {
  return (
    <button className={`option-card ${selected ? "is-selected" : ""}`} type="button" onClick={onClick}>
      {selected ? <span className="option-card__check" aria-hidden="true" /> : null}
      {image ? (
        <span className="option-card__image">
          <img src={image} alt="" loading="lazy" />
        </span>
      ) : null}
      <span className="option-card__content">
        <span className="option-card__title">{title}</span>
        {subtitle ? <span className="option-card__subtitle">{subtitle}</span> : null}
        {meta ? <span className="option-card__meta">{meta}</span> : null}
        {children}
      </span>
    </button>
  );
}
