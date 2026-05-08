const demoModel = (id, name, image, length, width, volume, poolPrice, borderStonePrice, extras = {}) => ({
  id,
  name,
  image,
  length,
  width,
  depth: "1.5 Рј",
  volume,
  poolPrice,
  borderStonePrice,
  ...extras,
});

const base = import.meta.env.BASE_URL;

const poolImages = {
  standard: `${base}images/pools/pool-rect.svg`,
  classic1: `${base}images/pools/pool-rect.svg`,
  classic2: `${base}images/pools/pool-rect.svg`,
  romano: `${base}images/pools/pool-rect.svg`,
  spaRound: `${base}images/pools/pool-round.svg`,
  leonardoSpa: `${base}images/pools/pool-freeform.svg`,
  leonardo: `${base}images/pools/pool-freeform.svg`,
  picasso: `${base}images/pools/pool-freeform.svg`,
  dali: `${base}images/pools/pool-freeform.svg`,
  gaudi: `${base}images/pools/pool-freeform.svg`,
  monet: `${base}images/pools/pool-freeform.svg`,
  giotto: `${base}images/pools/pool-freeform.svg`,
};

const modelImages = {
  rectangular: `${base}images/models/model-rect.svg`,
  freeform: `${base}images/models/model-freeform.svg`,
  round: `${base}images/models/model-round.svg`,
  standard: `${base}images/models/model-rect.svg`,
  classic1: `${base}images/models/model-rect.svg`,
  classic2: `${base}images/models/model-rect.svg`,
  romano: `${base}images/models/model-rect.svg`,
  spa: `${base}images/models/model-round.svg`,
  modenaFlorence: `${base}images/models/model-round.svg`,
  bergamo: `${base}images/models/model-round.svg`,
  leonardoSpa: `${base}images/models/model-freeform.svg`,
  leonardo: `${base}images/models/model-freeform.svg`,
  picasso: `${base}images/models/model-freeform.svg`,
  dali: `${base}images/models/model-freeform.svg`,
  gaudi: `${base}images/models/model-freeform.svg`,
  monet: `${base}images/models/model-freeform.svg`,
  giotto: `${base}images/models/model-freeform.svg`,
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
    extraSpec: { label: "РљСѓРїРµР»СЊ", value: "2.9 x 2 x 1.0 Рј" },
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
    title: "РЎС‚Р°РЅРґР°СЂС‚",
    description: "РљР»Р°СЃСЃРёС‡РµСЃРєР°СЏ РїСЂСЏРјРѕСѓРіРѕР»СЊРЅР°СЏ С„РѕСЂРјР° РґР»СЏ Р»СЋР±РѕРіРѕ СѓС‡Р°СЃС‚РєР°",
    image: poolImages.standard,
    models: [
      standardModel("genoa-standard", "Р“РµРЅСѓСЏ", "3.0 Рј", "2.0 Рј", "9 РјВі", 53000, 42350),
      standardModel("rome-standard", "Р РёРј", "4.0 Рј", "2.0 Рј", "12 РјВі", 71000, 50050),
      standardModel("lazio-standard", "Р›Р°С†РёРѕ", "4.0 Рј", "2.5 Рј", "15 РјВі", 73000, 53900),
      standardModel("sorrento-standard", "РЎРѕСЂСЂРµРЅС‚Рѕ", "4.0 Рј", "2.9 Рј", "17.4 РјВі", 75000, 57750),
      standardModel("milan-standard", "РњРёР»Р°РЅ", "5.0 Рј", "2.0 Рј", "15 РјВі", 80000, 57750),
      standardModel("palermo-standard", "РџР°Р»РµСЂРјРѕ", "5.0 Рј", "2.5 Рј", "18.75 РјВі", 90000, 61600),
      standardModel("verona-standard", "Р’РµСЂРѕРЅР°", "5.0 Рј", "2.9 Рј", "21.75 РјВі", 93000, 65450),
      standardModel("rimini-standard", "Р РёРјРёРЅРё", "6.0 Рј", "2.5 Рј", "22.5 РјВі", 100000, 69300),
      standardModel("ancona-standard", "РђРЅРєРѕРЅР°", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 105000, 73150),
      standardModel("venice-standard", "Р’РµРЅРµС†РёСЏ", "6.5 Рј", "2.5 Рј", "24.3 РјВі", 113000, 73150),
      standardModel("bologna-standard", "Р‘РѕР»РѕРЅСЊСЏ", "6.5 Рј", "2.9 Рј", "28.28 РјВі", 114000, 77000),
      standardModel("turin-standard", "РўСѓСЂРёРЅ", "7 Рј", "2.5 Рј", "26.25 РјВі", 115000, 77000),
      standardModel("naples-standard", "РќРµР°РїРѕР»СЊ", "7 Рј", "2.9 Рј", "30.45 РјВі", 117000, 80850),
      standardModel("pescara-standard", "РџРµСЃРєР°СЂР°", "8 Рј", "2.9 Рј", "39.6 РјВі", 165000, 88550),
      standardModel("san-remo-standard", "РЎР°РЅ-Р РµРјРѕ", "9 Рј", "2.9 Рј", "44.55 РјВі", 185000, 96250),
      standardModel("bari-standard", "Р‘Р°СЂРё", "10 Рј", "2.9 Рј", "49.5 РјВі", 205000, 103950),
    ],
  },
  classic_1: {
    id: "classic_1",
    title: "РљР»Р°СЃСЃРёРє 1",
    description: "РЎРєСЂСѓРіР»РµРЅРЅС‹Р№ СѓРіРѕР» РґР»СЏ РєРѕРјС„РѕСЂС‚Р° Рё Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё",
    image: poolImages.classic1,
    models: [
      classic1Model("lazio-classic-1", "Р›Р°С†РёРѕ Classic 1", "4.95 Рј", "2.5 Рј", "15 РјВі", 110000, 77050),
      classic1Model("sorrento-classic-1", "РЎРѕСЂСЂРµРЅС‚Рѕ Classic 1", "4.95 Рј", "2.9 Рј", "17.4 РјВі", 115000, 80900),
      classic1Model("palermo-classic-1", "РџР°Р»РµСЂРјРѕ Classic 1", "5.95 Рј", "2.5 Рј", "18.75 РјВі", 125000, 84750),
      classic1Model("verona-classic-1", "Р’РµСЂРѕРЅР° Classic 1", "5.95 Рј", "2.9 Рј", "21.75 РјВі", 130000, 88600),
      classic1Model("rimini-classic-1", "Р РёРјРёРЅРё Classic 1", "6.95 Рј", "2.5 Рј", "22.5 РјВі", 135000, 92450),
      classic1Model("ancona-classic-1", "РђРЅРєРѕРЅР° Classic 1", "6.95 Рј", "2.9 Рј", "26.1 РјВі", 145000, 96300),
      classic1Model("naples-classic-1", "РќРµР°РїРѕР»СЊ Classic 1", "7.95 Рј", "2.9 Рј", "30.45 РјВі", 160000, 104000),
      classic1Model("pescara-classic-1", "РџРµСЃРєР°СЂР° Classic 1", "8.95 Рј", "2.9 Рј", "39.6 РјВі", 195000, 111700),
      classic1Model("san-remo-classic-1", "РЎР°РЅ-Р РµРјРѕ Classic 1", "9.95 Рј", "2.9 Рј", "44.55 РјВі", 220000, 119400),
      classic1Model("bari-classic-1", "Р‘Р°СЂРё Classic 1", "10.95 Рј", "2.9 Рј", "49.5 РјВі", 235000, 127100),
    ],
  },
  classic_2: {
    id: "classic_2",
    title: "РљР»Р°СЃСЃРёРє 2",
    description: "РџСЂСЏРјС‹Рµ Р»РёРЅРёРё Рё СѓРґРѕР±РЅС‹Рµ СЃС‚СѓРїРµРЅРё",
    image: poolImages.classic2,
    models: [
      classic2Model("lazio-classic-2", "Р›Р°С†РёРѕ Classic 2", "4.95 Рј", "2.5 Рј", "15 РјВі", 110000, 77200),
      classic2Model("sorrento-classic-2", "РЎРѕСЂСЂРµРЅС‚Рѕ Classic 2", "4.95 Рј", "2.9 Рј", "17.4 РјВі", 115000, 81050),
      classic2Model("palermo-classic-2", "РџР°Р»РµСЂРјРѕ Classic 2", "5.95 Рј", "2.5 Рј", "18.75 РјВі", 125000, 84900),
      classic2Model("verona-classic-2", "Р’РµСЂРѕРЅР° Classic 2", "5.95 Рј", "2.9 Рј", "21.75 РјВі", 130000, 88750),
      classic2Model("rimini-classic-2", "Р РёРјРёРЅРё Classic 2", "6.95 Рј", "2.5 Рј", "22.5 РјВі", 135000, 92600),
      classic2Model("ancona-classic-2", "РђРЅРєРѕРЅР° Classic 2", "6.95 Рј", "2.9 Рј", "26.1 РјВі", 145000, 96450),
      classic2Model("naples-classic-2", "РќРµР°РїРѕР»СЊ Classic 2", "7.95 Рј", "2.9 Рј", "30.45 РјВі", 160000, 104150),
      classic2Model("pescara-classic-2", "РџРµСЃРєР°СЂР° Classic 2", "8.95 Рј", "2.9 Рј", "39.6 РјВі", 195000, 118850),
      classic2Model("san-remo-classic-2", "РЎР°РЅ-Р РµРјРѕ Classic 2", "9.95 Рј", "2.9 Рј", "44.55 РјВі", 220000, 119550),
      classic2Model("bari-classic-2", "Р‘Р°СЂРё Classic 2", "10.95 Рј", "2.9 Рј", "49.5 РјВі", 235000, 127250),
    ],
  },
  romano: {
    id: "romano",
    title: "Romano",
    description: "Р РёРјСЃРєР°СЏ Р»РµСЃС‚РЅРёС†Р° Рё Р·РѕРЅР° РѕС‚РґС‹С…Р°",
    image: poolImages.romano,
    models: [
      romanoModel("lazio-romano", "Р›Р°С†РёРѕ Romano", "4.0 Рј", "2.5 Рј", "15 РјВі", 105000, 53900),
      romanoModel("sorrento-romano", "РЎРѕСЂСЂРµРЅС‚Рѕ Romano", "4.0 Рј", "2.9 Рј", "17.4 РјВі", 110000, 57750),
      romanoModel("palermo-romano", "РџР°Р»РµСЂРјРѕ Romano", "5.0 Рј", "2.5 Рј", "18.75 РјВі", 120000, 61600),
      romanoModel("verona-romano", "Р’РµСЂРѕРЅР° Romano", "5.0 Рј", "2.9 Рј", "21.75 РјВі", 125000, 65450),
      romanoModel("rimini-romano", "Р РёРјРёРЅРё Romano", "6.0 Рј", "2.5 Рј", "22.5 РјВі", 130000, 69300),
      romanoModel("ancona-romano", "РђРЅРєРѕРЅР° Romano", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 140000, 73150),
      romanoModel("venice-romano", "Р’РµРЅРµС†РёСЏ Romano", "6.5 Рј", "2.5 Рј", "24.3 РјВі", 140000, 73150),
      romanoModel("bologna-romano", "Р‘РѕР»РѕРЅСЊСЏ Romano", "6.5 Рј", "2.9 Рј", "28.28 РјВі", 150000, 77000),
      romanoModel("turin-romano", "РўСѓСЂРёРЅ Romano", "7 Рј", "2.5 Рј", "26.25 РјВі", 150000, 77000),
      romanoModel("naples-romano", "РќРµР°РїРѕР»СЊ Romano", "7 Рј", "2.9 Рј", "30.45 РјВі", 155000, 80850),
      romanoModel("pescara-romano", "РџРµСЃРєР°СЂР° Romano", "8 Рј", "2.9 Рј", "39.6 РјВі", 190000, 88550),
      romanoModel("san-remo-romano", "РЎР°РЅ-Р РµРјРѕ Romano", "9 Рј", "2.9 Рј", "44.55 РјВі", 215000, 96250),
      romanoModel("bari-romano", "Р‘Р°СЂРё Romano", "10 Рј", "2.9 Рј", "49.5 РјВі", 230000, 103950),
    ],
  },
  spa_round: {
    id: "spa_round",
    title: "Spa Рё РєСЂСѓРіР»С‹Рµ",
    description: "РљРѕРјРїР°РєС‚РЅС‹Рµ СЂРµС€РµРЅРёСЏ РґР»СЏ РѕС‚РґС‹С…Р° Рё РіРёРґСЂРѕРјР°СЃСЃР°Р¶Р°",
    image: poolImages.spaRound,
    models: [
      spaModel("verona-spa", "Р’РµСЂРѕРЅР° Spa", "5.0 Рј", "2.9 Рј", "21.75 РјВі", 160000, 92400),
      spaModel("ancona-spa", "РђРЅРєРѕРЅР° Spa", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 180000, 100100),
      spaModel("naples-spa", "РќРµР°РїРѕР»СЊ Spa", "7 Рј", "2.9 Рј", "30.45 РјВі", 200000, 107800),
      roundSpaModel("modena-round", "РњРѕРґРµРЅР°", "2.5 Рј", "7.36 РјВі", 65000, 34650),
      roundSpaModel("florence-round", "Р¤Р»РѕСЂРµРЅС†РёСЏ", "2.9 Рј", "9.91 РјВі", 70000, 38500),
      roundSpaModel("bergamo-round", "Р‘РµСЂРіР°РјРѕ", "2.9 Рј", "9.91 РјВі", 80000, 38500, modelImages.bergamo),
    ],
  },
  leonardo_spa: {
    id: "leonardo_spa",
    title: "Leonardo Spa",
    description: "Spa-Р·РѕРЅР° Рё РїР»Р°РІРЅР°СЏ С„РѕСЂРјР° С‡Р°С€Рё",
    image: poolImages.leonardoSpa,
    models: [
      leonardoSpaModel("verona-leonardo-spa", "Р’РµСЂРѕРЅР° Leonardo Spa", "5.0 Рј", "2.9 Рј", "21.75 РјВі", 185000, null),
      leonardoSpaModel("ancona-leonardo-spa", "РђРЅРєРѕРЅР° Leonardo Spa", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 195000, null),
      leonardoSpaModel("naples-leonardo-spa", "РќРµР°РїРѕР»СЊ Leonardo Spa", "7 Рј", "2.9 Рј", "30.45 РјВі", 220000, null),
    ],
  },
  leonardo: {
    id: "leonardo",
    title: "Leonardo",
    description: "РЈРіР»РѕРІС‹Рµ СЃС‚СѓРїРµРЅРё Рё РїСЂРѕСЃС‚РѕСЂРЅР°СЏ Р·РѕРЅР° РїР»Р°РІР°РЅРёСЏ",
    image: poolImages.leonardo,
    models: [
      leonardoModel("verona-leonardo", "Р’РµСЂРѕРЅР° Leonardo", "5.0 Рј", "2.9 Рј", "21.75 РјВі", 135000, 65450),
      leonardoModel("ancona-leonardo", "РђРЅРєРѕРЅР° Leonardo", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 145000, 73150),
      leonardoModel("naples-leonardo", "РќРµР°РїРѕР»СЊ Leonardo", "7 Рј", "2.9 Рј", "30.45 РјВі", 160000, 80850),
      leonardoModel("pescara-leonardo", "РџРµСЃРєР°СЂР° Leonardo", "8 Рј", "2.9 Рј", "39.6 РјВі", 195000, 88550),
      leonardoModel("san-remo-leonardo", "РЎР°РЅ-Р РµРјРѕ Leonardo", "9 Рј", "2.9 Рј", "44.55 РјВі", 210000, 96250),
      leonardoModel("bari-leonardo", "Р‘Р°СЂРё Leonardo", "10 Рј", "2.9 Рј", "49.5 РјВі", 225000, 103950),
    ],
  },
  picasso: {
    id: "picasso",
    title: "Picasso",
    description: "Р’С‹СЂР°Р·РёС‚РµР»СЊРЅР°СЏ С„РѕСЂРјР° РґР»СЏ СѓС‡Р°СЃС‚РєРѕРІ СЃ С…Р°СЂР°РєС‚РµСЂРѕРј",
    image: poolImages.picasso,
    models: [
      picassoModel("lazio-picasso", "Р›Р°С†РёРѕ Picasso", "4.0 Рј", "2.5 Рј", "15 РјВі", 110000, 43500),
      picassoModel("sorrento-picasso", "РЎРѕСЂСЂРµРЅС‚Рѕ Picasso", "4.0 Рј", "2.9 Рј", "17.4 РјВі", 120000, 46400),
      picassoModel("palermo-picasso", "РџР°Р»РµСЂРјРѕ Picasso", "5.0 Рј", "2.5 Рј", "18.75 РјВі", 125000, 49300),
      picassoModel("verona-picasso", "Р’РµСЂРѕРЅР° Picasso", "5.0 Рј", "2.9 Рј", "21.75 РјВі", 130000, 52200),
      picassoModel("rimini-picasso", "Р РёРјРёРЅРё Picasso", "6.0 Рј", "2.5 Рј", "22.5 РјВі", 135000, 55100),
      picassoModel("ancona-picasso", "РђРЅРєРѕРЅР° Picasso", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 140000, 58000),
      picassoModel("venice-picasso", "Р’РµРЅРµС†РёСЏ Picasso", "6.5 Рј", "2.5 Рј", "24.3 РјВі", 150000, 58000),
      picassoModel("bologna-picasso", "Р‘РѕР»РѕРЅСЊСЏ Picasso", "6.5 Рј", "2.9 Рј", "28.28 РјВі", 155000, 60900),
      picassoModel("turin-picasso", "РўСѓСЂРёРЅ Picasso", "7 Рј", "2.5 Рј", "26.25 РјВі", 160000, 60900),
      picassoModel("naples-picasso", "РќРµР°РїРѕР»СЊ Picasso", "7 Рј", "2.9 Рј", "30.45 РјВі", 165000, 63800),
    ],
  },
  dali: {
    id: "dali",
    title: "Dali",
    description: "Р­Р»РµРіР°РЅС‚РЅР°СЏ РѕРІР°Р»СЊРЅР°СЏ С„РѕСЂРјР° РґР»СЏ РіР°СЂРјРѕРЅРёРё Рё СЃС‚РёР»СЏ",
    image: poolImages.dali,
    models: [
      shapedModel("verona-dali", "Р’РµСЂРѕРЅР° Dali", "5.0 Рј", "2.9 Рј", "21.75 РјВі", 140000, 65450, modelImages.dali),
      shapedModel("ancona-dali", "РђРЅРєРѕРЅР° Dali", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 145000, 73150, modelImages.dali),
      shapedModel("naples-dali", "РќРµР°РїРѕР»СЊ Dali", "7 Рј", "2.9 Рј", "30.45 РјВі", 170000, 80850, modelImages.dali),
      shapedModel("pescara-dali", "РџРµСЃРєР°СЂР° Dali", "8 Рј", "2.9 Рј", "39.6 РјВі", 230000, 88550, modelImages.dali),
      shapedModel("san-remo-dali", "РЎР°РЅ-Р РµРјРѕ Dali", "9 Рј", "2.9 Рј", "44.55 РјВі", 235000, 96250, modelImages.dali),
      shapedModel("bari-dali", "Р‘Р°СЂРё Dali", "10 Рј", "2.9 Рј", "49.5 РјВі", 240000, 103950, modelImages.dali),
    ],
  },
  gaudi: {
    id: "gaudi",
    title: "Gaudi",
    description: "РџР»Р°РІРЅР°СЏ РіРµРѕРјРµС‚СЂРёСЏ Рё СѓРІРµР»РёС‡РµРЅРЅР°СЏ Р·РѕРЅР° РѕС‚РґС‹С…Р°",
    image: poolImages.gaudi,
    models: [
      shapedModel("verona-gaudi", "Р’РµСЂРѕРЅР° Gaudi", "5.0 Рј", "2.9 Рј", "21.75 РјВі", 140000, 65450, modelImages.gaudi),
      shapedModel("ancona-gaudi", "РђРЅРєРѕРЅР° Gaudi", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 145000, 73150, modelImages.gaudi),
      shapedModel("naples-gaudi", "РќРµР°РїРѕР»СЊ Gaudi", "7 Рј", "2.9 Рј", "30.45 РјВі", 165000, 80850, modelImages.gaudi),
      shapedModel("pescara-gaudi", "РџРµСЃРєР°СЂР° Gaudi", "8 Рј", "2.9 Рј", "39.6 РјВі", 195000, 88550, modelImages.gaudi),
      shapedModel("san-remo-gaudi", "РЎР°РЅ-Р РµРјРѕ Gaudi", "9 Рј", "2.9 Рј", "44.55 РјВі", 220000, 96250, modelImages.gaudi),
      shapedModel("bari-gaudi", "Р‘Р°СЂРё Gaudi", "10 Рј", "2.9 Рј", "49.5 РјВі", 235000, 103950, modelImages.gaudi),
    ],
  },
  monet: {
    id: "monet",
    title: "Monet",
    description: "РљРѕРјРїР°РєС‚РЅР°СЏ РѕРІР°Р»СЊРЅР°СЏ С„РѕСЂРјР° РґР»СЏ РЅРµР±РѕР»СЊС€РёС… СѓС‡Р°СЃС‚РєРѕРІ",
    image: poolImages.monet,
    models: [
      shapedModel("ancona-monet", "РђРЅРєРѕРЅР° Monet", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 155000, 80950, modelImages.monet),
      shapedModel("naples-monet", "РќРµР°РїРѕР»СЊ Monet", "7 Рј", "2.9 Рј", "30.45 РјВі", 170000, 88650, modelImages.monet),
      shapedModel("pescara-monet", "РџРµСЃРєР°СЂР° Monet", "8 Рј", "2.9 Рј", "39.6 РјВі", 180000, 96350, modelImages.monet),
      shapedModel("san-remo-monet", "РЎР°РЅ-Р РµРјРѕ Monet", "9 Рј", "2.9 Рј", "44.55 РјВі", 225000, 104050, modelImages.monet),
      shapedModel("bari-monet", "Р‘Р°СЂРё Monet", "10 Рј", "2.9 Рј", "49.5 РјВі", 240000, 111750, modelImages.monet),
    ],
  },
  giotto: {
    id: "giotto",
    title: "Giotto",
    description: "Р‘РѕР»СЊС€Р°СЏ СЃРµРјРµР№РЅР°СЏ С‡Р°С€Р° СЃ РјСЏРіРєРёРјРё Р»РёРЅРёСЏРјРё",
    image: poolImages.giotto,
    models: [
      shapedModel("ancona-giotto", "РђРЅРєРѕРЅР° Giotto", "6.0 Рј", "2.9 Рј", "26.1 РјВі", 145000, 73150, modelImages.giotto),
      shapedModel("naples-giotto", "РќРµР°РїРѕР»СЊ Giotto", "7 Рј", "2.9 Рј", "30.45 РјВі", 165000, 80850, modelImages.giotto),
      shapedModel("pescara-giotto", "РџРµСЃРєР°СЂР° Giotto", "8 Рј", "2.9 Рј", "39.6 РјВі", 195000, 88550, modelImages.giotto),
      shapedModel("san-remo-giotto", "РЎР°РЅ-Р РµРјРѕ Giotto", "9 Рј", "2.9 Рј", "44.55 РјВі", 220000, 96250, modelImages.giotto),
      shapedModel("bari-giotto", "Р‘Р°СЂРё Giotto", "10 Рј", "2.9 Рј", "49.5 РјВі", 235000, 103950, modelImages.giotto),
    ],
  },
};

export const poolTypes = [
  ...Object.values(pools).map(({ id, title, description, image }) => ({ id, title, description, image })),
  {
    id: "custom_large_pool",
    title: "РРЅРґРёРІРёРґСѓР°Р»СЊРЅС‹Р№ СЂР°СЃС‡РµС‚ Р±Р°СЃСЃРµР№РЅР° РёР· РїРѕР»РёРјРµСЂРЅС‹С… РїР°РЅРµР»РµР№ Р±РѕР»РµРµ 7 РјРµС‚СЂРѕРІ",
    description: "Р”Р»СЏ Р±Р°СЃСЃРµР№РЅРѕРІ Р±РѕР»РµРµ 7 РјРµС‚СЂРѕРІ Рё РЅРµСЃС‚Р°РЅРґР°СЂС‚РЅС‹С… РїСЂРѕРµРєС‚РѕРІ",
    image: `${base}images/pools/pool-custom.svg`,
    isCustom: true,
  },
];
