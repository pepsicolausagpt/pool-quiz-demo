export const locationOptions = [
  { value: "outdoor", label: "На улице" },
  { value: "indoor", label: "В помещении" },
];

export const equipmentSolutionOptions = [
  {
    value: "tech_compartment_outdoor",
    label: "Конфигурация данного оборудования мне необходима внутри технологического отсека (бассейн на улице)",
  },
  {
    value: "tech_stand_indoor",
    label: "Конфигурация данного оборудования мне необходима на технологическом стенде (бассейн в помещении)",
  },
  { value: "equipment_only", label: "Мне необходимо только оборудование" },
];

export const equipmentItemOptions = [
  { value: "sand_filter", label: "Песочная фильтровальная установка" },
  { value: "water_lighting", label: "Подсветка воды" },
];

export const waterDisinfectionOptions = [
  { value: "uv_lamp", label: "УФ лампа для дезинфекции воды" },
  { value: "auto_chemical_dosing", label: "Станция автоматического дозирования хим. реагентов" },
  { value: "anti_algae_dosing", label: "Блок автоматического дозирования средств против водорослей" },
  { value: "auto_chlorinator", label: "Автохлоратор" },
];

export const counterflowOptions = [
  { value: "no", label: "Нет" },
  { value: "mounted_in_extra_compartment", label: "Противоток будет смонтирован в доп. отсеке" },
  { value: "equipment_without_installation", label: "Противоток просто как оборудование, без монтажа" },
];

export const waterHeatingOptions = [
  { value: "no", label: "Нет" },
  { value: "electric_flow_heater", label: "Проточным электрическим водонагревателем" },
  { value: "gas_boiler_heat_exchanger", label: "Теплообменником от газового котла" },
  {
    value: "heat_pump",
    label: "Тепловым насосом (при отсутствии газа и лимите электроэнергии на участке и сезонном использовании бассейна)",
  },
];

export const additionalItemOptions = [
  { value: "pool_pavilion", label: "Павильон для бассейна" },
  { value: "border_stone", label: "Бордюрный камень" },
  { value: "stainless_ladder", label: "Лестницу из нержавеющей стали" },
  { value: "manual_vacuum", label: "Ручной пылесос для очистки дна и стен" },
  { value: "manual_chemistry_set", label: "Набор химии для ручной дезинфекции воды" },
  { value: "auto_dosing_chemistry_set", label: "Набор химии для автоматической станции дозирования" },
];


export const implementationTimeOptions = [
  { value: "this_year", label: "В этом году" },
  { value: "next_year", label: "В следующем году" },
  { value: "researching", label: "Изучаю рынок" },
];



export const implementationSchemeOptions = [
  {
    value: "self_work",
    label: "Самостоятельно с запуском бассейна и выполнением общестроительных работ своими силами/силами собственных подрядчиков",
  },
  {
    value: "company_startup_only",
    label: "С запуском бассейна силами вашей компании и выполнением общестроительных работ своими силами/силами собственных подрядчиков",
  },
  {
    value: "full_or_custom_scope",
    label: "Весь объем работ: чаша + оборудование + общестроительные работы собственными силами, запуск бассейна хочу чтобы выполнили вы",
  },
];

export const catalogBudgetLimitOptions = [
  { value: "up_to_350k", label: "Эконом (до 350 000 рублей)", level: "economy" },
  { value: "up_to_600k", label: "Стандарт (до 600 000 рублей)", level: "standard" },
  { value: "up_to_1m", label: "Премиум (до 1 000 000 рублей)", level: "premium" },
  { value: "over_1m", label: "Более 1 000 000 рублей", level: "premium" },
];

export const customBudgetLimitOptions = [
  { value: "up_to_400k", label: "До 400 000 рублей" },
  { value: "up_to_600k", label: "До 600 000 рублей" },
  { value: "up_to_1m", label: "До 1 000 000 рублей" },
  { value: "over_1m", label: "Более 1 000 000 рублей" },
];

export const poolWidthOptions = ["3", "3.5", "4", "4.5", "5"];
export const poolLengthOptions = ["6", "7", "8", "9", "10", "11", "12"];
export const poolDepthOptions = ["1.5"];

export const linerTypeOptions = [
  { value: "mosaic", label: "Мозаика" },
  { value: "marble", label: "Мрамор" },
];

export const optionLabels = Object.fromEntries(
  [
    ...locationOptions,
    ...equipmentSolutionOptions,
    ...equipmentItemOptions,
    ...waterDisinfectionOptions,
    ...counterflowOptions,
    ...waterHeatingOptions,
    ...additionalItemOptions,
    ...implementationTimeOptions,
    ...implementationSchemeOptions,
    ...catalogBudgetLimitOptions,
    ...customBudgetLimitOptions,
    ...linerTypeOptions,
  ].map((option) => [option.value, option.label]),
);
