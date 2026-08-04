import { allergens, dishes } from './dishes';
import { dishHasExcludedAllergen, eligibleRandomDishes, findDishesByIngredients } from '../utils/dishMatching';

test('база остаётся в согласованном диапазоне и категории не пусты', () => {
  expect(dishes.length).toBeGreaterThanOrEqual(800);
  expect(dishes.length).toBeLessThanOrEqual(1000);
  for (const category of ['breakfast', 'lunch', 'dinner', 'side']) {
    expect(dishes.filter(dish => dish.category === category).length).toBeGreaterThan(50);
  }
});

test.each([
  [['яйца', 'помидоры', 'сыр']],
  [['картошка', 'курица', 'лук']],
  [['рис', 'морковь', 'лук']],
  [['макароны', 'тунец', 'помидоры']],
  [['творог', 'яйца', 'мука']],
])('обычный набор продуктов %p даёт полезную выдачу', ingredients => {
  const results = findDishesByIngredients(dishes, ingredients);
  expect(results.length).toBeGreaterThan(0);
  expect(results.every(dish => dish.missingIngredients.length <= 2)).toBe(true);
});

test.each(allergens)('фильтр «%s» полностью очищает выдачу от аллергена', allergen => {
  const results = findDishesByIngredients(dishes, ['яйца', 'молоко', 'мука', 'рис', 'курица', 'помидоры'], {
    excludedAllergens: [allergen],
  });
  expect(results.every(dish => !dishHasExcludedAllergen(dish, [allergen]))).toBe(true);
});

test.each(['breakfast', 'lunch', 'dinner'])('случайная категория «%s» имеет большой выбор', category => {
  expect(eligibleRandomDishes(dishes, category).length).toBeGreaterThan(50);
});

test('детский режим возвращает только блюда с детской отметкой', () => {
  const results = eligibleRandomDishes(dishes, 'all', { childMode: true });
  expect(results.length).toBeGreaterThan(100);
  expect(results.every(dish => dish.forChildren)).toBe(true);
});
