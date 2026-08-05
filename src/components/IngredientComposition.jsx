import React from 'react';
import broccoliImage from '../assets/ingredients/broccoli.png';
import bulgurImage from '../assets/ingredients/bulgur.png';
import carrotImage from '../assets/ingredients/carrot.png';
import cheeseImage from '../assets/ingredients/cheese.png';
import chickenImage from '../assets/ingredients/chicken.png';
import cucumberImage from '../assets/ingredients/cucumber.png';
import eggImage from '../assets/ingredients/egg.png';
import garlicImage from '../assets/ingredients/garlic.png';
import lemonImage from '../assets/ingredients/lemon.png';
import lettuceImage from '../assets/ingredients/lettuce.png';
import mushroomImage from '../assets/ingredients/mushroom.png';
import onionImage from '../assets/ingredients/onion.png';
import potatoImage from '../assets/ingredients/potato.png';
import riceImage from '../assets/ingredients/rice.png';
import tomatoImage from '../assets/ingredients/tomato.png';
import { getDishVisualIngredients, ingredientVisualLabel } from '../utils/ingredientVisuals';

const artworkByKey = {
  broccoli: broccoliImage,
  bulgur: bulgurImage,
  carrot: carrotImage,
  cheese: cheeseImage,
  chicken: chickenImage,
  cucumber: cucumberImage,
  egg: eggImage,
  garlic: garlicImage,
  lemon: lemonImage,
  lettuce: lettuceImage,
  mushroom: mushroomImage,
  onion: onionImage,
  potato: potatoImage,
  rice: riceImage,
  tomato: tomatoImage,
};

const layouts = {
  1: { height: 150, items: [[114, 15, 0, 2]] },
  2: { height: 160, items: [[66, 26, -8, 2], [162, 10, 7, 3]] },
  3: { height: 174, items: [[10, 42, -9, 2], [113, 8, 4, 4], [216, 42, 8, 3]] },
  4: { height: 190, items: [[-3, 52, -10, 2], [79, 8, 6, 4], [163, 48, -4, 3], [230, 8, 8, 5]] },
  5: { height: 208, items: [[-4, 74, -9, 2], [57, 16, 5, 4], [120, 76, -6, 3], [183, 10, 7, 5], [236, 72, -4, 4]] },
  6: { height: 228, items: [[-5, 76, -10, 2], [51, 16, 6, 4], [108, 80, -4, 3], [166, 8, 7, 5], [222, 74, -7, 4], [112, 118, 3, 6]] },
  7: { height: 246, items: [[-5, 80, -10, 2], [49, 18, 6, 4], [104, 84, -4, 3], [159, 8, 7, 5], [216, 74, -7, 4], [52, 132, 4, 6], [161, 128, -5, 7]] },
};

const toPercent = (value, total) => `${(value / total) * 100}%`;

const IngredientPlaceholder = ({ label }) => (
  <span
    className="ingredient-placeholder"
    role="img"
    aria-label={`Изображение продукта «${label}» пока не добавлено`}
  >
    <span aria-hidden="true">{label}</span>
  </span>
);

const IngredientComposition = ({ dish }) => {
  const ingredients = getDishVisualIngredients(dish, { limit: 7 });
  if (!ingredients.length) return null;

  const layout = layouts[ingredients.length];

  return (
    <div
      className="ingredient-composition"
      role="group"
      aria-label="Продукты для блюда"
      style={{ aspectRatio: `343 / ${layout.height}` }}
    >
      {ingredients.map(({ raw, key }, index) => {
        const [x, y, rotation, layer] = layout.items[index];
        const image = key ? artworkByKey[key] : null;

        return (
          <span
            className="ingredient-visual"
            key={`${key || raw}-${index}`}
            style={{
              '--ingredient-x': toPercent(x, 343),
              '--ingredient-y': toPercent(y, layout.height),
              '--ingredient-rotation': `${rotation}deg`,
              '--ingredient-layer': layer,
            }}
          >
            {image
              ? <img src={image} alt={raw} />
              : <IngredientPlaceholder label={ingredientVisualLabel(raw)} />}
          </span>
        );
      })}
    </div>
  );
};

export default IngredientComposition;
