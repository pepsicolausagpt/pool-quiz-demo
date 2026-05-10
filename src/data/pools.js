const demoModel = (id, name, image, length, width, volume, poolPrice, borderStonePrice, extras = {}) => ({
  id,
  name,
  image,
  length,
  width,
  volume,
  poolPrice: poolPrice + 15000,
  borderStonePrice,
  ...extras,
});

const base = import.meta.env.BASE_URL;

const poolImages = {
  standard: `${base}images/pools/series-standard.png`,
  classic1: `${base}images/pools/series-classic-1.png`,
  classic2: `${base}images/pools/series-classic-2.png`,
  romano: `${base}images/pools/series-romano.png`,
  spaRound: `${base}images/pools/series-spa-round.png`,
  leonardoSpa: `${base}images/pools/series-leonardo-spa.png`,
  leonardo: `${base}images/pools/series-leonardo.png`,
  picasso: `${base}images/pools/series-picasso.png`,
  dali: `${base}images/pools/series-dali.png`,
  gaudi: `${base}images/pools/series-gaudi.png`,
  monet: `${base}images/pools/series-monet.png`,
  giotto: `${base}images/pools/series-giotto.png`,
  custom: `${base}images/pools/series-custom.png`,
};

const modelImages = {
  rectangular: `${base}images/models/model-rect.svg`,
  freeform: `${base}images/models/model-freeform.svg`,
  round: `${base}images/models/model-round.svg`,
  standard: `${base}images/models/model-standard.png`,
  classic1: `${base}images/models/model-classic-1.png`,
  classic2: `${base}images/models/model-classic-2.png`,
  romano: `${base}images/models/model-romano.png`,
  spa: `${base}images/models/model-spa.png`,
  modenaFlorence: `${base}images/models/model-modena-florence.png`,
  bergamo: `${base}images/models/model-bergamo.png`,
  leonardoSpa: `${base}images/models/model-leonardo-spa.png`,
  leonardo: `${base}images/models/model-leonardo.png`,
  picasso: `${base}images/models/model-picasso.png`,
  dali: `${base}images/models/model-dali.png`,
  gaudi: `${base}images/models/model-gaudi.png`,
  monet: `${base}images/models/model-monet.png`,
  giotto: `${base}images/models/model-giotto.png`,
};

const standardModel = (id, name, length, width, volume, poolPrice, borderStonePrice) =>
  demoModel(id, name, modelImages.standard, length, width, volume, poolPrice, borderStonePrice);

const classic1Model = (id, name, length, width, volume, poolPrice, borderStonePrice) =>
  demoModel(id, name, modelImages.classic1, length, width, volume, poolPrice, borderStonePrice);

const classic2Model = (id, name, length, width, volume, poolPrice, borderStonePrice) =>
  demoModel(id, name, modelImages.classic2, length, width, volume, poolPrice, borderStonePrice);

const romanoModel = (id, name, length, width, volume, poolPrice, borderStonePrice) =>
  demoModel(id, name, modelImages.romano, length, width, volume, poolPrice, borderStonePrice);

const spaModel = (id, name, length, width, volume, poolPrice, borderStonePrice) =>
  demoModel(id, name, modelImages.spa, length, width, volume, poolPrice, borderStonePrice);

const roundSpaModel = (id, name, diameter, volume, poolPrice, borderStonePrice, image = modelImages.modenaFlorence) =>
  demoModel(id, name, image, null, null, volume, poolPrice, borderStonePrice, { diameter });

const leonardoSpaModel = (id, name, length, width, volume, poolPrice, borderStonePrice) =>
  demoModel(id, name, modelImages.leonardoSpa, length, width, volume, poolPrice, borderStonePrice, {
    extraSpec: { label: "Купель", value: "2.9 x 2 x 1.0 м" },
  });

const leonardoModel = (id, name, length, width, volume, poolPrice, borderStonePrice) =>
  demoModel(id, name, modelImages.leonardo, length, width, volume, poolPrice, borderStonePrice);

const picassoModel = (id, name, length, width, volume, poolPrice, borderStonePrice) =>
  demoModel(id, name, modelImages.picasso, length, width, volume, poolPrice, borderStonePrice);

const shapedModel = (id, name, length, width, volume, poolPrice, borderStonePrice, image) =>
  demoModel(id, name, image, length, width, volume, poolPrice, borderStonePrice);

export const pools = {
  standard: {
    id: "standard",
    title: "Стандарт",
    description: "Классическая прямоугольная форма для любого участка",
    image: poolImages.standard,
    models: [
      standardModel("genoa-standard", "Генуя", "3.0 м", "2.0 м", "9 м³", 38000, 42350),
      standardModel("rome-standard", "Рим", "4.0 м", "2.0 м", "12 м³", 56000, 50050),
      standardModel("lazio-standard", "Лацио", "4.0 м", "2.5 м", "15 м³", 58000, 53900),
      standardModel("sorrento-standard", "Сорренто", "4.0 м", "2.9 м", "17.4 м³", 60000, 57750),
      standardModel("milan-standard", "Милан", "5.0 м", "2.0 м", "15 м³", 65000, 57750),
      standardModel("palermo-standard", "Палермо", "5.0 м", "2.5 м", "18.75 м³", 75000, 61600),
      standardModel("verona-standard", "Верона", "5.0 м", "2.9 м", "21.75 м³", 78000, 65450),
      standardModel("rimini-standard", "Римини", "6.0 м", "2.5 м", "22.5 м³", 85000, 69300),
      standardModel("ancona-standard", "Анкона", "6.0 м", "2.9 м", "26.1 м³", 90000, 73150),
      standardModel("venice-standard", "Венеция", "6.5 м", "2.5 м", "24.3 м³", 98000, 73150),
      standardModel("bologna-standard", "Болонья", "6.5 м", "2.9 м", "28.28 м³", 99000, 77000),
      standardModel("turin-standard", "Турин", "7 м", "2.5 м", "26.25 м³", 100000, 77000),
      standardModel("naples-standard", "Неаполь", "7 м", "2.9 м", "30.45 м³", 102000, 80850),
      standardModel("pescara-standard", "Пескара", "8 м", "2.9 м", "39.6 м³", 150000, 88550),
      standardModel("san-remo-standard", "Сан-Ремо", "9 м", "2.9 м", "44.55 м³", 170000, 96250),
      standardModel("bari-standard", "Бари", "10 м", "2.9 м", "49.5 м³", 190000, 103950),
    ],
  },
  classic_1: {
    id: "classic_1",
    title: "Классик 1",
    description: "Скругленный угол для комфорта и безопасности",
    image: poolImages.classic1,
    models: [
      classic1Model("lazio-classic-1", "Лацио Classic 1", "4.95 м", "2.5 м", "15 м³", 95000, 77050),
      classic1Model("sorrento-classic-1", "Сорренто Classic 1", "4.95 м", "2.9 м", "17.4 м³", 100000, 80900),
      classic1Model("palermo-classic-1", "Палермо Classic 1", "5.95 м", "2.5 м", "18.75 м³", 110000, 84750),
      classic1Model("verona-classic-1", "Верона Classic 1", "5.95 м", "2.9 м", "21.75 м³", 115000, 88600),
      classic1Model("rimini-classic-1", "Римини Classic 1", "6.95 м", "2.5 м", "22.5 м³", 120000, 92450),
      classic1Model("ancona-classic-1", "Анкона Classic 1", "6.95 м", "2.9 м", "26.1 м³", 130000, 96300),
      classic1Model("naples-classic-1", "Неаполь Classic 1", "7.95 м", "2.9 м", "30.45 м³", 145000, 104000),
      classic1Model("pescara-classic-1", "Пескара Classic 1", "8.95 м", "2.9 м", "39.6 м³", 180000, 111700),
      classic1Model("san-remo-classic-1", "Сан-Ремо Classic 1", "9.95 м", "2.9 м", "44.55 м³", 205000, 119400),
      classic1Model("bari-classic-1", "Бари Classic 1", "10.95 м", "2.9 м", "49.5 м³", 220000, 127100),
    ],
  },
  classic_2: {
    id: "classic_2",
    title: "Классик 2",
    description: "Прямые линии и удобные ступени",
    image: poolImages.classic2,
    models: [
      classic2Model("lazio-classic-2", "Лацио Classic 2", "4.95 м", "2.5 м", "15 м³", 95000, 77200),
      classic2Model("sorrento-classic-2", "Сорренто Classic 2", "4.95 м", "2.9 м", "17.4 м³", 100000, 81050),
      classic2Model("palermo-classic-2", "Палермо Classic 2", "5.95 м", "2.5 м", "18.75 м³", 110000, 84900),
      classic2Model("verona-classic-2", "Верона Classic 2", "5.95 м", "2.9 м", "21.75 м³", 115000, 88750),
      classic2Model("rimini-classic-2", "Римини Classic 2", "6.95 м", "2.5 м", "22.5 м³", 120000, 92600),
      classic2Model("ancona-classic-2", "Анкона Classic 2", "6.95 м", "2.9 м", "26.1 м³", 130000, 96450),
      classic2Model("naples-classic-2", "Неаполь Classic 2", "7.95 м", "2.9 м", "30.45 м³", 145000, 104150),
      classic2Model("pescara-classic-2", "Пескара Classic 2", "8.95 м", "2.9 м", "39.6 м³", 180000, 118850),
      classic2Model("san-remo-classic-2", "Сан-Ремо Classic 2", "9.95 м", "2.9 м", "44.55 м³", 205000, 119550),
      classic2Model("bari-classic-2", "Бари Classic 2", "10.95 м", "2.9 м", "49.5 м³", 220000, 127250),
    ],
  },
  romano: {
    id: "romano",
    title: "Romano",
    description: "Римская лестница и зона отдыха",
    image: poolImages.romano,
    models: [
      romanoModel("lazio-romano", "Лацио Romano", "4.0 м", "2.5 м", "15 м³", 90000, 53900),
      romanoModel("sorrento-romano", "Сорренто Romano", "4.0 м", "2.9 м", "17.4 м³", 95000, 57750),
      romanoModel("palermo-romano", "Палермо Romano", "5.0 м", "2.5 м", "18.75 м³", 105000, 61600),
      romanoModel("verona-romano", "Верона Romano", "5.0 м", "2.9 м", "21.75 м³", 110000, 65450),
      romanoModel("rimini-romano", "Римини Romano", "6.0 м", "2.5 м", "22.5 м³", 115000, 69300),
      romanoModel("ancona-romano", "Анкона Romano", "6.0 м", "2.9 м", "26.1 м³", 125000, 73150),
      romanoModel("venice-romano", "Венеция Romano", "6.5 м", "2.5 м", "24.3 м³", 125000, 73150),
      romanoModel("bologna-romano", "Болонья Romano", "6.5 м", "2.9 м", "28.28 м³", 135000, 77000),
      romanoModel("turin-romano", "Турин Romano", "7 м", "2.5 м", "26.25 м³", 135000, 77000),
      romanoModel("naples-romano", "Неаполь Romano", "7 м", "2.9 м", "30.45 м³", 140000, 80850),
      romanoModel("pescara-romano", "Пескара Romano", "8 м", "2.9 м", "39.6 м³", 175000, 88550),
      romanoModel("san-remo-romano", "Сан-Ремо Romano", "9 м", "2.9 м", "44.55 м³", 200000, 96250),
      romanoModel("bari-romano", "Бари Romano", "10 м", "2.9 м", "49.5 м³", 215000, 103950),
    ],
  },
  spa_round: {
    id: "spa_round",
    title: "Spa и круглые",
    description: "Компактные решения для отдыха и гидромассажа",
    image: poolImages.spaRound,
    models: [
      spaModel("verona-spa", "Верона Spa", "5.0 м", "2.9 м", "21.75 м³", 145000, 92400),
      spaModel("ancona-spa", "Анкона Spa", "6.0 м", "2.9 м", "26.1 м³", 165000, 100100),
      spaModel("naples-spa", "Неаполь Spa", "7 м", "2.9 м", "30.45 м³", 185000, 107800),
      roundSpaModel("modena-round", "Модена", "2.5 м", "7.36 м³", 50000, 34650),
      roundSpaModel("florence-round", "Флоренция", "2.9 м", "9.91 м³", 55000, 38500),
      roundSpaModel("bergamo-round", "Бергамо", "2.9 м", "9.91 м³", 65000, 38500, modelImages.bergamo),
    ],
  },
  leonardo_spa: {
    id: "leonardo_spa",
    title: "Leonardo Spa",
    description: "Spa-зона и плавная форма чаши",
    image: poolImages.leonardoSpa,
    models: [
      leonardoSpaModel("verona-leonardo-spa", "Верона Leonardo Spa", "5.0 м", "2.9 м", "21.75 м³", 170000, null),
      leonardoSpaModel("ancona-leonardo-spa", "Анкона Leonardo Spa", "6.0 м", "2.9 м", "26.1 м³", 180000, null),
      leonardoSpaModel("naples-leonardo-spa", "Неаполь Leonardo Spa", "7 м", "2.9 м", "30.45 м³", 205000, null),
    ],
  },
  leonardo: {
    id: "leonardo",
    title: "Leonardo",
    description: "Угловые ступени и просторная зона плавания",
    image: poolImages.leonardo,
    models: [
      leonardoModel("verona-leonardo", "Верона Leonardo", "5.0 м", "2.9 м", "21.75 м³", 120000, 65450),
      leonardoModel("ancona-leonardo", "Анкона Leonardo", "6.0 м", "2.9 м", "26.1 м³", 130000, 73150),
      leonardoModel("naples-leonardo", "Неаполь Leonardo", "7 м", "2.9 м", "30.45 м³", 145000, 80850),
      leonardoModel("pescara-leonardo", "Пескара Leonardo", "8 м", "2.9 м", "39.6 м³", 180000, 88550),
      leonardoModel("san-remo-leonardo", "Сан-Ремо Leonardo", "9 м", "2.9 м", "44.55 м³", 195000, 96250),
      leonardoModel("bari-leonardo", "Бари Leonardo", "10 м", "2.9 м", "49.5 м³", 210000, 103950),
    ],
  },
  picasso: {
    id: "picasso",
    title: "Picasso",
    description: "Выразительная форма для участков с характером",
    image: poolImages.picasso,
    models: [
      picassoModel("lazio-picasso", "Лацио Picasso", "4.0 м", "2.5 м", "15 м³", 95000, 43500),
      picassoModel("sorrento-picasso", "Сорренто Picasso", "4.0 м", "2.9 м", "17.4 м³", 105000, 46400),
      picassoModel("palermo-picasso", "Палермо Picasso", "5.0 м", "2.5 м", "18.75 м³", 110000, 49300),
      picassoModel("verona-picasso", "Верона Picasso", "5.0 м", "2.9 м", "21.75 м³", 115000, 52200),
      picassoModel("rimini-picasso", "Римини Picasso", "6.0 м", "2.5 м", "22.5 м³", 120000, 55100),
      picassoModel("ancona-picasso", "Анкона Picasso", "6.0 м", "2.9 м", "26.1 м³", 125000, 58000),
      picassoModel("venice-picasso", "Венеция Picasso", "6.5 м", "2.5 м", "24.3 м³", 135000, 58000),
      picassoModel("bologna-picasso", "Болонья Picasso", "6.5 м", "2.9 м", "28.28 м³", 140000, 60900),
      picassoModel("turin-picasso", "Турин Picasso", "7 м", "2.5 м", "26.25 м³", 145000, 60900),
      picassoModel("naples-picasso", "Неаполь Picasso", "7 м", "2.9 м", "30.45 м³", 150000, 63800),
    ],
  },
  dali: {
    id: "dali",
    title: "Dali",
    description: "Элегантная овальная форма для гармонии и стиля",
    image: poolImages.dali,
    models: [
      shapedModel("verona-dali", "Верона Dali", "5.0 м", "2.9 м", "21.75 м³", 125000, 65450, modelImages.dali),
      shapedModel("ancona-dali", "Анкона Dali", "6.0 м", "2.9 м", "26.1 м³", 130000, 73150, modelImages.dali),
      shapedModel("naples-dali", "Неаполь Dali", "7 м", "2.9 м", "30.45 м³", 155000, 80850, modelImages.dali),
      shapedModel("pescara-dali", "Пескара Dali", "8 м", "2.9 м", "39.6 м³", 215000, 88550, modelImages.dali),
      shapedModel("san-remo-dali", "Сан-Ремо Dali", "9 м", "2.9 м", "44.55 м³", 220000, 96250, modelImages.dali),
      shapedModel("bari-dali", "Бари Dali", "10 м", "2.9 м", "49.5 м³", 225000, 103950, modelImages.dali),
    ],
  },
  gaudi: {
    id: "gaudi",
    title: "Gaudi",
    description: "Плавная геометрия и увеличенная зона отдыха",
    image: poolImages.gaudi,
    models: [
      shapedModel("verona-gaudi", "Верона Gaudi", "5.0 м", "2.9 м", "21.75 м³", 125000, 65450, modelImages.gaudi),
      shapedModel("ancona-gaudi", "Анкона Gaudi", "6.0 м", "2.9 м", "26.1 м³", 130000, 73150, modelImages.gaudi),
      shapedModel("naples-gaudi", "Неаполь Gaudi", "7 м", "2.9 м", "30.45 м³", 150000, 80850, modelImages.gaudi),
      shapedModel("pescara-gaudi", "Пескара Gaudi", "8 м", "2.9 м", "39.6 м³", 180000, 88550, modelImages.gaudi),
      shapedModel("san-remo-gaudi", "Сан-Ремо Gaudi", "9 м", "2.9 м", "44.55 м³", 205000, 96250, modelImages.gaudi),
      shapedModel("bari-gaudi", "Бари Gaudi", "10 м", "2.9 м", "49.5 м³", 220000, 103950, modelImages.gaudi),
    ],
  },
  monet: {
    id: "monet",
    title: "Monet",
    description: "Компактная овальная форма для небольших участков",
    image: poolImages.monet,
    models: [
      shapedModel("ancona-monet", "Анкона Monet", "6.0 м", "2.9 м", "26.1 м³", 140000, 80950, modelImages.monet),
      shapedModel("naples-monet", "Неаполь Monet", "7 м", "2.9 м", "30.45 м³", 155000, 88650, modelImages.monet),
      shapedModel("pescara-monet", "Пескара Monet", "8 м", "2.9 м", "39.6 м³", 165000, 96350, modelImages.monet),
      shapedModel("san-remo-monet", "Сан-Ремо Monet", "9 м", "2.9 м", "44.55 м³", 210000, 104050, modelImages.monet),
      shapedModel("bari-monet", "Бари Monet", "10 м", "2.9 м", "49.5 м³", 225000, 111750, modelImages.monet),
    ],
  },
  giotto: {
    id: "giotto",
    title: "Giotto",
    description: "Большая семейная чаша с мягкими линиями",
    image: poolImages.giotto,
    models: [
      shapedModel("ancona-giotto", "Анкона Giotto", "6.0 м", "2.9 м", "26.1 м³", 130000, 73150, modelImages.giotto),
      shapedModel("naples-giotto", "Неаполь Giotto", "7 м", "2.9 м", "30.45 м³", 150000, 80850, modelImages.giotto),
      shapedModel("pescara-giotto", "Пескара Giotto", "8 м", "2.9 м", "39.6 м³", 180000, 88550, modelImages.giotto),
      shapedModel("san-remo-giotto", "Сан-Ремо Giotto", "9 м", "2.9 м", "44.55 м³", 205000, 96250, modelImages.giotto),
      shapedModel("bari-giotto", "Бари Giotto", "10 м", "2.9 м", "49.5 м³", 220000, 103950, modelImages.giotto),
    ],
  },
};

export const poolTypes = [
  ...Object.values(pools).map(({ id, title, description, image }) => ({ id, title, description, image })),
  {
    id: "custom_large_pool",
    title: "Индивидуальный расчет / бассейн более 7 метров",
    description: "Для бассейнов более 7 метров и нестандартных проектов",
    image: poolImages.custom,
    isCustom: true,
  },
];
