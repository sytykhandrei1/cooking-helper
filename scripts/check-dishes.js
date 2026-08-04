import { allergens, dishes } from '../src/data/dishes.js';
const requiredFields = ['id', 'name', 'description', 'ingredients', 'recipe', 'forChildren', 'allergens', 'category'];
const allowedCategories = new Set(['breakfast', 'lunch', 'dinner', 'side']);
const allowedAllergens = new Set(allergens);
const errors = [];

const duplicateIds = dishes.filter((dish, index) => dishes.findIndex(candidate => candidate.id === dish.id) !== index);
if (duplicateIds.length) errors.push(`Повторяющиеся id: ${duplicateIds.map(dish => dish.id).join(', ')}`);
const duplicateNames = dishes.filter((dish, index) => dishes.findIndex(candidate => candidate.name.toLowerCase() === dish.name.toLowerCase()) !== index);
if (duplicateNames.length) errors.push(`Повторяющиеся названия: ${duplicateNames.map(dish => dish.name).join(', ')}`);

for (const dish of dishes) {
  for (const field of requiredFields) {
    if (dish[field] === undefined || dish[field] === '') errors.push(`${dish.name || dish.id}: отсутствует ${field}`);
  }
  if (!allowedCategories.has(dish.category)) errors.push(`${dish.name}: неизвестная категория ${dish.category}`);
  if (!Array.isArray(dish.ingredients) || dish.ingredients.length < 2) errors.push(`${dish.name}: слишком мало ингредиентов`);
  if ((dish.recipe || '').length < 50) errors.push(`${dish.name}: слишком короткий рецепт`);
  if (((dish.recipe || '').match(/\d+\./g) || []).length < 2) errors.push(`${dish.name}: рецепт должен содержать хотя бы два шага`);
  if (dish.forChildren && (dish.ingredients || []).some(ingredient => /чили|вино|коньяк|вермут|кофе/i.test(ingredient))) {
    errors.push(`${dish.name}: небезопасная детская отметка`);
  }
  for (const allergen of dish.allergens || []) {
    if (!allowedAllergens.has(allergen)) errors.push(`${dish.name}: неизвестный аллерген ${allergen}`);
  }
}

const counts = dishes.reduce((result, dish) => {
  result[dish.category] = (result[dish.category] || 0) + 1;
  return result;
}, {});

console.log(`Блюд: ${dishes.length}`);
console.log(`Категории: ${JSON.stringify(counts)}`);

if (dishes.length < 800 || dishes.length > 1000) errors.push(`Ожидается от 800 до 1000 блюд, получено ${dishes.length}`);
if ((counts.breakfast || 0) < 100) errors.push('Недостаточно завтраков');
if ((counts.lunch || 0) < 150) errors.push('Недостаточно обедов');
if ((counts.dinner || 0) < 250) errors.push('Недостаточно основных блюд');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Проверка базы пройдена.');
}
