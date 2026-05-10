

export default function SuccessScreen({ onRestart }) {
  return (
    <main className="success-screen">
      <section className="success-card" aria-labelledby="success-title">
        <p className="eyebrow">Заявка принята</p>
        <h1 id="success-title">Спасибо! Заявка отправлена.</h1>
        <p>Специалист подготовит расчет и свяжется с вами для уточнения деталей.</p>
        <div className="start-screen__actions">
          <button className="button button--ghost" type="button" onClick={onRestart}>
            Пройти расчет заново
          </button>
        </div>
      </section>
    </main>
  );
}
