import { describe, expect, it } from 'vitest';
import { featuredDish } from '../data/featuredDish.js';
import {
  canonicalIngredientKey,
  getDishVisualIngredients,
  ingredientVisualLabel,
} from './ingredientVisuals.js';

describe('canonicalIngredientKey', () => {
  it.each([
    ['3 помидора', 'tomato'],
    ['Томаты', 'tomato'],
    ['2 картошки', 'potato'],
    ['500 г картофеля', 'potato'],
    ['2 моркови', 'carrot'],
    ['1 лист Романо', 'lettuce'],
    ['листья салата', 'lettuce'],
    ['200 г булгура', 'bulgur'],
    ['гарнир с булгуром', 'bulgur'],
    ['куриная грудка', 'chicken'],
    ['КУРИНЫЕ БЁДРА', 'chicken'],
    ['куриное филе', 'chicken'],
    ['1 красный лук', 'onion'],
    ['3 зубчика чеснока', 'garlic'],
    ['2 яйца', 'egg'],
    ['150 г пармезана', 'cheese'],
    ['сыр фета', 'cheese'],
    ['солёные огурцы', 'cucumber'],
    ['брокколи', 'broccoli'],
    ['белые грибы', 'mushroom'],
    ['шампиньонами', 'mushroom'],
    ['рисом', 'rice'],
    ['сок лимона', 'lemon'],
  ])('maps %s to %s', (raw, key) => {
    expect(canonicalIngredientKey(raw)).toBe(key);
  });

  it.each([
    'кукуруза',
    'курага',
    'рисовая лапша',
    'томатная паста',
    'салатная заправка',
    'картофельный крахмал',
    'масло',
    '',
    null,
  ])('does not create a false match for %s', (raw) => {
    expect(canonicalIngredientKey(raw)).toBeNull();
  });

  it('returns only supported stable keys', () => {
    const supportedKeys = new Set([
      'tomato', 'potato', 'carrot', 'lettuce', 'bulgur',
      'chicken', 'onion', 'garlic', 'egg', 'cheese',
      'cucumber', 'broccoli', 'mushroom', 'rice', 'lemon',
    ]);

    for (const ingredient of featuredDish.ingredients) {
      const key = canonicalIngredientKey(ingredient);
      expect(key === null || supportedKeys.has(key)).toBe(true);
    }
  });
});

describe('getDishVisualIngredients', () => {
  it('handles quantities in featuredDish, removes pantry items, and keeps unknown products', () => {
    expect(getDishVisualIngredients(featuredDish)).toEqual([
      { raw: '2 моркови', key: 'carrot' },
      { raw: '1 лук', key: 'onion' },
      { raw: '3 помидора', key: 'tomato' },
      { raw: '500 г красной фасоли', key: null },
      { raw: '2 картошки', key: 'potato' },
      { raw: '2 шт. цукини', key: null },
      { raw: '1 лист Романо', key: 'lettuce' },
    ]);
  });

  it('filters pantry-only ingredients, including quantities and modifiers', () => {
    const dish = {
      ingredients: [
        'соль',
        '2 ст. л. соли',
        'черный перец',
        'специи',
        'оливковое масло',
        'масло для жарки',
        '500 мл воды',
        'коричневый сахар',
      ],
    };

    expect(getDishVisualIngredients(dish)).toEqual([]);
  });

  it('de-duplicates canonical products and normalized unknowns while preserving first-seen order', () => {
    const dish = {
      ingredients: [
        'помидоры',
        '2 помидора',
        'цуккини',
        '  ЦУККИНИ  ',
        'курица',
        'куриное филе',
        'фасоль',
      ],
    };

    expect(getDishVisualIngredients(dish)).toEqual([
      { raw: 'помидоры', key: 'tomato' },
      { raw: 'цуккини', key: null },
      { raw: 'курица', key: 'chicken' },
      { raw: 'фасоль', key: null },
    ]);
  });

  it('applies the limit after pantry filtering and de-duplication', () => {
    const dish = {
      ingredients: ['соль', 'картофель', '2 картошки', 'морковь', 'лук'],
    };

    expect(getDishVisualIngredients(dish, { limit: 2 })).toEqual([
      { raw: 'картофель', key: 'potato' },
      { raw: 'морковь', key: 'carrot' },
    ]);
  });

  it('handles missing data and a zero limit', () => {
    expect(getDishVisualIngredients(null)).toEqual([]);
    expect(getDishVisualIngredients({ ingredients: null })).toEqual([]);
    expect(getDishVisualIngredients(featuredDish, { limit: 0 })).toEqual([]);
  });
});

describe('ingredientVisualLabel', () => {
  it.each([
    ['500 г красной фасоли', 'Красная фасоль'],
    ['2 шт. цукини', 'Цукини'],
    ['250 гр нута', 'Нута'],
    ['1,5 кг индейки', 'Индейки'],
    ['200 мл молока', 'Молока'],
    // Единица измерения отрезается только вместе с пробелом после неё,
    // иначе «г» и «гр» съедали начало самого продукта.
    ['говядина', 'Говядина'],
    ['грибы', 'Грибы'],
    ['гречка', 'Гречка'],
    ['лук', 'Лук'],
    ['', 'Продукт'],
    [null, 'Продукт'],
  ])('formats %s as %s', (raw, label) => {
    expect(ingredientVisualLabel(raw)).toBe(label);
  });
});
