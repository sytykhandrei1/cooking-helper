const INGREDIENT_KEY_ALIASES = [
  ['tomato', new Set([
    'помидор', 'помидора', 'помидоре', 'помидоров', 'помидорами', 'помидору', 'помидоры',
    'томат', 'томата', 'томате', 'томатов', 'томатами', 'томату', 'томаты',
  ])],
  ['potato', new Set([
    'картофель', 'картофеля', 'картофеле', 'картофелем', 'картофелю',
    'картошка', 'картошки', 'картошке', 'картошкой', 'картошку',
  ])],
  ['carrot', new Set([
    'морковь', 'моркови', 'морковью',
    'морковка', 'морковки', 'морковке', 'морковкой', 'морковку',
  ])],
  ['lettuce', new Set([
    'салат', 'салата', 'салате', 'салатом', 'салату',
    'романо',
    'латук', 'латука', 'латуке', 'латуком', 'латуку',
  ])],
  ['bulgur', new Set([
    'булгур', 'булгура', 'булгуре', 'булгуром', 'булгуру',
  ])],
  ['chicken', new Set([
    'курица', 'курице', 'курицей', 'курицу', 'курицы',
    'куриная', 'куриное', 'куриной', 'курином', 'куриному', 'куриную',
    'куриные', 'куриный', 'куриным', 'куриными', 'куриных',
    'цыпленок', 'цыпленка', 'цыпленке', 'цыпленком', 'цыпленку', 'цыплята',
  ])],
  ['onion', new Set([
    'лук', 'лука', 'луке', 'луком', 'луку',
  ])],
  ['garlic', new Set([
    'чеснок', 'чеснока', 'чесноке', 'чесноком', 'чесноку',
  ])],
  ['egg', new Set([
    'яиц', 'яйца', 'яйце', 'яйцом', 'яйцу', 'яйцо', 'яйцами', 'яйцах',
  ])],
  ['cheese', new Set([
    'сыр', 'сыра', 'сыре', 'сыром', 'сыру', 'сыры', 'сыров', 'сырами',
    'брынза', 'брынзе', 'брынзой', 'брынзу', 'брынзы',
    'моцарелла', 'моцарелле', 'моцареллой', 'моцареллу', 'моцареллы',
    'пармезан', 'пармезана', 'пармезане', 'пармезаном', 'пармезану',
    'сулугуни', 'фета', 'халлуми',
  ])],
  ['cucumber', new Set([
    'огурец', 'огурца', 'огурце', 'огурцом', 'огурцу',
    'огурцы', 'огурцов', 'огурцами', 'огурцах',
  ])],
  ['broccoli', new Set(['брокколи'])],
  ['mushroom', new Set([
    'гриб', 'гриба', 'грибе', 'грибов', 'грибом', 'грибу',
    'грибы', 'грибами', 'грибах',
    'лисичка', 'лисички', 'лисичек', 'лисичками',
    'шампиньон', 'шампиньона', 'шампиньоне', 'шампиньонов', 'шампиньоном', 'шампиньону',
    'шампиньоны', 'шампиньонами',
  ])],
  ['rice', new Set([
    'рис', 'риса', 'рисе', 'рисом', 'рису',
  ])],
  ['lemon', new Set([
    'лимон', 'лимона', 'лимоне', 'лимоном', 'лимону',
    'лимоны', 'лимонов', 'лимонами',
  ])],
];

const MEASUREMENT_TOKENS = new Set([
  'г', 'гр', 'кг', 'килограмм', 'килограмма', 'килограммов',
  'л', 'мл', 'литр', 'литра', 'литров',
  'ст', 'столовая', 'столовые', 'столовых',
  'ч', 'чайная', 'чайные', 'чайных',
  'ложка', 'ложки', 'ложек', 'ложку',
  'шт', 'штука', 'штуки', 'штук',
  'щепотка', 'щепотки', 'щепоток',
]);

const PANTRY_GROUPS = [
  {
    markers: new Set(['соль', 'соли', 'солью']),
    modifiers: new Set(['морская', 'морской', 'поваренная', 'поваренной', 'крупная', 'крупной', 'мелкая', 'мелкой']),
  },
  {
    markers: new Set(['перец', 'перца', 'перце', 'перцем', 'перцу']),
    modifiers: new Set([
      'белый', 'белого', 'душистый', 'душистого', 'красный', 'красного',
      'молотый', 'молотого', 'черный', 'черного', 'чили',
    ]),
  },
  {
    markers: new Set(['специи', 'специй', 'приправа', 'приправы', 'приправ', 'приправой']),
    modifiers: new Set(['смешанные', 'смешанных', 'сухая', 'сухие', 'сухих', 'любимые', 'любимых']),
  },
  {
    markers: new Set(['масло', 'масла', 'масле', 'маслом']),
    modifiers: new Set([
      'арахисовое', 'кунжутное', 'оливковое', 'подсолнечное', 'растительное', 'сливочное',
      'для', 'жарки',
    ]),
  },
  {
    markers: new Set(['вода', 'воды', 'воде', 'водой', 'воду']),
    modifiers: new Set(['горячая', 'горячей', 'кипяченая', 'кипяченой', 'теплая', 'теплой', 'холодная', 'холодной']),
  },
  {
    markers: new Set(['сахар', 'сахара', 'сахаре', 'сахаром', 'сахару']),
    modifiers: new Set(['белый', 'белого', 'коричневый', 'коричневого', 'тростниковый', 'тростникового']),
  },
];

const normalizeRawIngredient = (raw) => String(raw ?? '')
  .normalize('NFKC')
  .toLocaleLowerCase('ru-RU')
  .replace(/ё/g, 'е')
  .replace(/\s+/g, ' ')
  .trim();

const PLACEHOLDER_LABELS = new Map([
  ['красной фасоли', 'Красная фасоль'],
  ['красная фасоль', 'Красная фасоль'],
  ['фасоли', 'Фасоль'],
  ['цукини', 'Цукини'],
  ['цуккини', 'Цукини'],
]);

export const ingredientVisualLabel = (raw) => {
  const original = String(raw ?? '').normalize('NFKC').replace(/\s+/g, ' ').trim();
  if (!original) return 'Продукт';

  const withoutQuantity = original
    .replace(/^\d+(?:[.,]\d+)?\s*/, '')
    .replace(/^(?:(?:кг|гр?|мл|л|шт)\.?|(?:ст|ч)\.?\s*л\.?)\s*/i, '')
    .trim();
  const normalized = normalizeRawIngredient(withoutQuantity);

  if (PLACEHOLDER_LABELS.has(normalized)) return PLACEHOLDER_LABELS.get(normalized);

  const label = withoutQuantity || original;
  return `${label.charAt(0).toLocaleUpperCase('ru-RU')}${label.slice(1)}`;
};

const ingredientTokens = (raw) => normalizeRawIngredient(raw).match(/\p{L}+/gu) || [];

const isPantryOnlyIngredient = (raw) => {
  const tokens = ingredientTokens(raw).filter(token => !MEASUREMENT_TOKENS.has(token));
  if (!tokens.length) return false;

  return PANTRY_GROUPS.some(({ markers, modifiers }) =>
    tokens.some(token => markers.has(token)) &&
    tokens.every(token => markers.has(token) || modifiers.has(token))
  );
};

export const canonicalIngredientKey = (raw) => {
  const tokens = ingredientTokens(raw);
  if (!tokens.length) return null;

  for (const [key, aliases] of INGREDIENT_KEY_ALIASES) {
    if (tokens.some(token => aliases.has(token))) return key;
  }

  return null;
};

export const getDishVisualIngredients = (dish, { limit = 7 } = {}) => {
  const ingredients = Array.isArray(dish?.ingredients) ? dish.ingredients : [];
  const resolvedLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 7;
  if (resolvedLimit === 0) return [];

  const seen = new Set();
  const visuals = [];

  for (const raw of ingredients) {
    if (typeof raw !== 'string' || !normalizeRawIngredient(raw) || isPantryOnlyIngredient(raw)) continue;

    const key = canonicalIngredientKey(raw);
    const dedupeKey = key
      ? `key:${key}`
      : `raw:${ingredientTokens(raw).filter(token => !MEASUREMENT_TOKENS.has(token)).join(' ')}`;

    if (seen.has(dedupeKey)) continue;

    seen.add(dedupeKey);
    visuals.push({ raw, key });

    if (visuals.length >= resolvedLimit) break;
  }

  return visuals;
};
