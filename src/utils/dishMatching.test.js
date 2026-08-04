import {
  dishHasExcludedAllergen,
  eligibleRandomDishes,
  findDishesByIngredients,
  getDishFamily,
  scoreDishForIngredients,
} from './dishMatching';

const omelet = {
  id: 1,
  name: 'Омлет',
  ingredients: ['яйца', 'помидоры', 'сыр', 'масло', 'соль'],
  allergens: ['яйца', 'молочные продукты'],
  category: 'breakfast',
  forChildren: true,
};

test('полным совпадением считается наличие всех обязательных ингредиентов блюда', () => {
  expect(scoreDishForIngredients(omelet, ['яйцо', 'томаты', 'сыр']).isCompleteMatch).toBe(true);
  expect(scoreDishForIngredients(omelet, ['яйца']).isCompleteMatch).toBe(false);
});

test('разные виды пасты относятся к одному семейству для ротации', () => {
  expect(getDishFamily({ name: 'Лингвини с креветками' })).toBe('паста');
  expect(getDishFamily({ name: 'Пенне с томатами' })).toBe('паста');
});

test('варианты курицы относятся к одному семейству для ротации', () => {
  expect(getDishFamily({ name: 'Куриная грудка с грибами' })).toBe('курица');
  expect(getDishFamily({ name: 'Куриные бёдра в духовке' })).toBe('курица');
});

test('поиск оставляет блюда, для которых не хватает максимум двух продуктов', () => {
  const results = findDishesByIngredients([omelet], ['яйца']);
  expect(results).toHaveLength(1);
  expect(results[0].missingIngredients).toEqual(['помидоры', 'сыр']);
});

test('аллерген определяется и по составу, даже если он пропущен в карточке', () => {
  const shrimpDish = { ingredients: ['креветки', 'чеснок'], allergens: [] };
  expect(dishHasExcludedAllergen(shrimpDish, ['морепродукты'])).toBe(true);
});

test('обычное растительное масло не считается молочным продуктом', () => {
  const potato = { ingredients: ['картофель', 'масло'], allergens: [] };
  expect(dishHasExcludedAllergen(potato, ['молочные продукты'])).toBe(false);
});

test('случайная выдача включает полноценные блюда и исключает гарниры', () => {
  const fullDish = { ...omelet, isCompleteDish: true };
  const side = { ...omelet, id: 2, category: 'side' };
  expect(eligibleRandomDishes([fullDish, side], 'all')).toEqual([fullDish]);
});

test('режим для детей исключает блюда без детской отметки', () => {
  const adultDish = { ...omelet, id: 3, forChildren: false };
  expect(eligibleRandomDishes([omelet, adultDish], 'all', { childMode: true })).toEqual([omelet]);
});

test('поиск с аллергеном исключает блюдо независимо от совпадения продуктов', () => {
  const results = findDishesByIngredients([omelet], ['яйца', 'помидоры', 'сыр'], {
    excludedAllergens: ['яйца'],
  });
  expect(results).toHaveLength(0);
});
