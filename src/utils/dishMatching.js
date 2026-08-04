const ALIASES = {
  томаты: 'помидоры',
  помидор: 'помидоры',
  картошка: 'картофель',
  картошку: 'картофель',
  яйца: 'яйцо',
  яйцо: 'яйцо',
  макароны: 'паста',
  спагетти: 'паста',
  лапша: 'паста',
  шампиньоны: 'грибы',
  лисички: 'грибы',
  'белые грибы': 'грибы',
  грудка: 'курица',
  'куриная грудка': 'курица',
  'куриное филе': 'курица',
  фарш: 'мясной фарш',
};

const PANTRY_STAPLES = new Set([
  'вода', 'соль', 'перец', 'черный перец', 'специи', 'масло',
  'растительное масло', 'оливковое масло', 'сахар',
]);

const ALLERGEN_INGREDIENTS = {
  'яйца': ['яйцо', 'яйца', 'майонез'],
  'молочные продукты': ['молоко', 'сливки', 'сметана', 'сыр', 'творог', 'йогурт', 'масло сливочное', 'сливочное масло'],
  'глютен': ['мука', 'хлеб', 'сухарики', 'панировочные сухари', 'паста', 'макароны', 'спагетти', 'лапша', 'булгур', 'кускус', 'перловка', 'манка', 'тортильи'],
  'рыба': ['рыба', 'лосось', 'тунец', 'треска', 'хек', 'форель', 'скумбрия', 'дорада', 'судак', 'сибас'],
  'морепродукты': ['креветки', 'кальмары', 'мидии', 'гребешки', 'краб', 'осьминог', 'лангустины'],
  'орехи': ['орехи', 'миндаль', 'арахис', 'кешью', 'фундук', 'пекан'],
  'соя': ['соя', 'соевый соус', 'тофу', 'темпе'],
  'кунжут': ['кунжут', 'тахини'],
};

const matchesAllergenMarker = (ingredient, marker) => {
  const normalizedIngredient = normalizeIngredient(ingredient);
  const normalizedMarker = normalizeIngredient(marker);
  return normalizedIngredient === normalizedMarker ||
    (normalizedMarker.length >= 4 && normalizedIngredient.includes(normalizedMarker));
};

export const normalizeIngredient = (value = '') => {
  const normalized = value.toLowerCase().trim().replace(/ё/g, 'е');
  return ALIASES[normalized] || normalized;
};

export const getDishFamily = (dish) => {
  const name = (dish.name || '').toLowerCase().replace(/ё/g, 'е');
  const familyRules = [
    [/^(спагетти|пенне|фузилли|фарфалле|лингвини|тальятелле|орзо|макароны|паста)/, 'паста'],
    [/^(омлет|скрэмбл|яйца|яичный)/, 'блюда из яиц'],
    [/^(тост|брускетта|горячий бутерброд)/, 'тосты'],
    [/^(овсяная|рисовая|пшенная|кукурузная|гречневая|манная|киноа на|булгур на).*каша/, 'каши'],
    [/^(крем-суп|суп|щи|борщ|солянка|уха|рамен|харчо)/, 'супы'],
    [/^(курица|куриная|куриные|куриный)/, 'курица'],
    [/^(индейка|индейки)/, 'индейка'],
    [/^(говядина|говядины|бефстроганов)/, 'говядина'],
    [/^(свинина|свиные)/, 'свинина'],
    [/^(лосось|форель|треска|хек|скумбрия|дорада|судак|тунец|рыба)/, 'рыба'],
    [/^(салат)/, 'салаты'],
    [/^(боул|поке)/, 'боулы'],
    [/^(запеканка)/, 'запеканки'],
  ];
  const matched = familyRules.find(([pattern]) => pattern.test(name));
  return matched ? matched[1] : name.split(/\s+/).slice(0, 2).join(' ');
};

export const ingredientsMatch = (left, right) => {
  const a = normalizeIngredient(left);
  const b = normalizeIngredient(right);
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  return a.includes(b) || b.includes(a);
};

export const dishHasExcludedAllergen = (dish, excluded = []) => {
  const explicit = dish.allergens || [];
  const ingredients = dish.ingredients || [];
  return excluded.some(allergen => {
    if (explicit.includes(allergen)) return true;
    return (ALLERGEN_INGREDIENTS[allergen] || []).some(marker =>
      ingredients.some(ingredient => matchesAllergenMarker(ingredient, marker))
    );
  });
};

export const inferAllergens = (ingredients = []) => Object.entries(ALLERGEN_INGREDIENTS)
  .filter(([, markers]) => markers.some(marker =>
    ingredients.some(ingredient => matchesAllergenMarker(ingredient, marker))
  ))
  .map(([allergen]) => allergen);

export const scoreDishForIngredients = (dish, selectedIngredients) => {
  const available = selectedIngredients.map(normalizeIngredient);
  const required = (dish.ingredients || []).filter(
    ingredient => !PANTRY_STAPLES.has(normalizeIngredient(ingredient))
  );
  const matchingIngredients = required.filter(ingredient =>
    available.some(candidate => ingredientsMatch(candidate, ingredient))
  );
  const missingIngredients = required.filter(ingredient =>
    !available.some(candidate => ingredientsMatch(candidate, ingredient))
  );
  const matchRatio = required.length ? matchingIngredients.length / required.length : 0;

  return {
    matchingIngredients,
    missingIngredients,
    matchRatio,
    isCompleteMatch: missingIngredients.length === 0,
  };
};

export const findDishesByIngredients = (dishes, selectedIngredients, options = {}) => {
  const { excludedAllergens = [], childMode = false } = options;
  return dishes
    .filter(dish => dish.category !== 'side')
    .filter(dish => dish.isCompleteDish !== false)
    .filter(dish => !dishHasExcludedAllergen(dish, excludedAllergens))
    .filter(dish => !childMode || dish.forChildren)
    .map(dish => ({ ...dish, ...scoreDishForIngredients(dish, selectedIngredients) }))
    .filter(dish => dish.matchingIngredients.length >= 1 && (dish.isCompleteMatch || dish.missingIngredients.length <= 2))
    .sort((a, b) =>
      Number(b.isCompleteMatch) - Number(a.isCompleteMatch) ||
      a.missingIngredients.length - b.missingIngredients.length ||
      b.matchRatio - a.matchRatio
    )
    .slice(0, 24);
};

export const eligibleRandomDishes = (dishes, category, options = {}) => {
  const { excludedAllergens = [], childMode = false } = options;
  return dishes
    .filter(dish => dish.category !== 'side')
    .filter(dish => dish.isCompleteDish !== false)
    .filter(dish => category === 'all' || !category || dish.category === category)
    .filter(dish => !dishHasExcludedAllergen(dish, excludedAllergens))
    .filter(dish => !childMode || dish.forChildren);
};
