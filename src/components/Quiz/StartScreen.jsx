

const logoSrc = `${import.meta.env.BASE_URL}images/logo-lab-pools.svg`;

export default function StartScreen({ onStart }) {
  return (
    <main className="start-screen">
      <div className="start-screen__photo" aria-hidden="true" />
      <div className="site-topbar">
        <div className="brand-mark" aria-label="Лаборатория бассейнов">
          <img src={logoSrc} alt="Лаборатория бассейнов" />
        </div>
        <a className="top-phone top-phone--whatsapp" href="https://wa.me/78003508770" target="_blank" rel="noreferrer">
          <small>Номер для связи</small>
          <strong>8(800)350-87-70</strong>
        </a>
      </div>
      <section className="start-screen__content" aria-labelledby="start-title">
        <p className="eyebrow">Персональный расчет бассейна</p>
        <h1 id="start-title">Подберем бассейн со всем необходимым из максимально возможного.</h1>
        <p className="start-screen__lead">
          Ответьте на несколько вопросов — мы подготовим персональный расчет, комплектацию и рекомендации по реализации.
        </p>
        <div className="start-screen__actions">
          <button className="button button--primary" type="button" onClick={onStart}>
            Начать расчет бассейна
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="start-benefits" aria-label="Преимущества расчета">
          <div>
            <span className="benefit-icon benefit-icon--time" aria-hidden="true" />
            <p>Подбор за 2–3 минуты</p>
          </div>
          <div>
            <span className="benefit-icon benefit-icon--budget" aria-hidden="true" />
            <p>Расчет под ваш бюджет</p>
          </div>
          <div>
            <span className="benefit-icon benefit-icon--catalog" aria-hidden="true" />
            <p>Готовые серии и индивидуальные решения</p>
          </div>
        </div>
        <div className="start-screen__info">
          <p>
            Индивидуальную консультацию по будущему расчету можно получить по телефону{' '}
            <a href="tel:88003508770">8 800 350 8770</a> у менеджера.
          </p>
          <p>
            Весь материал по данному товару на странице сайта:{' '}
            <a href="https://полипропиленовые.лабораториябассейнов.рф" target="_blank" rel="noreferrer">
              полипропиленовые.лабораториябассейнов.рф
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
