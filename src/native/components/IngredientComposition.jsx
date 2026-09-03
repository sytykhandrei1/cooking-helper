import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { getDishVisualIngredients, ingredientVisualLabel } from '../../utils/ingredientVisuals';
import { useTheme } from '../ThemeContext';

const artworkByKey = {
  broccoli: require('../../assets/ingredients/broccoli.png'),
  bulgur: require('../../assets/ingredients/bulgur.png'),
  carrot: require('../../assets/ingredients/carrot.png'),
  cheese: require('../../assets/ingredients/cheese.png'),
  chicken: require('../../assets/ingredients/chicken.png'),
  cucumber: require('../../assets/ingredients/cucumber.png'),
  egg: require('../../assets/ingredients/egg.png'),
  garlic: require('../../assets/ingredients/garlic.png'),
  lemon: require('../../assets/ingredients/lemon.png'),
  lettuce: require('../../assets/ingredients/lettuce.png'),
  mushroom: require('../../assets/ingredients/mushroom.png'),
  onion: require('../../assets/ingredients/onion.png'),
  potato: require('../../assets/ingredients/potato.png'),
  rice: require('../../assets/ingredients/rice.png'),
  tomato: require('../../assets/ingredients/tomato.png'),
};

// Раскладки перенесены из веб-версии: [x, y, поворот, слой] в системе 343×height.
const layouts = {
  1: { height: 150, items: [[114, 15, 0, 2]] },
  2: { height: 160, items: [[66, 26, -8, 2], [162, 10, 7, 3]] },
  3: { height: 174, items: [[10, 42, -9, 2], [113, 8, 4, 4], [216, 42, 8, 3]] },
  4: { height: 190, items: [[-3, 52, -10, 2], [79, 8, 6, 4], [163, 48, -4, 3], [230, 8, 8, 5]] },
  5: { height: 208, items: [[-4, 74, -9, 2], [57, 16, 5, 4], [120, 76, -6, 3], [183, 10, 7, 5], [236, 72, -4, 4]] },
  6: { height: 228, items: [[-5, 76, -10, 2], [51, 16, 6, 4], [108, 80, -4, 3], [166, 8, 7, 5], [222, 74, -7, 4], [112, 118, 3, 6]] },
  7: { height: 246, items: [[-5, 80, -10, 2], [49, 18, 6, 4], [104, 84, -4, 3], [159, 8, 7, 5], [216, 74, -7, 4], [52, 132, 4, 6], [161, 128, -5, 7]] },
};

const BASE_WIDTH = 343;
const toPercent = (value, total) => `${(value / total) * 100}%`;

// В вебе форма плейсхолдера задавалась mask-image; в RN такого нет,
// поэтому рисуем ту же кляксу фигурой на react-native-svg, а подпись кладём сверху.
const BLOB = 'M60 31C45 20 24 30 20 53C15 82 32 103 60 105C88 103 105 82 100 53C96 30 75 20 60 31Z';
const LEAF = 'M60 36L49 25L58 27L62 16L66 27L77 24L68 36Z';

const IngredientPlaceholder = ({ label }) => {
  const { colors } = useTheme();

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Изображение продукта «${label}» пока не добавлено`}
      style={styles.placeholder}
    >
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 120 120">
        <Path d={BLOB} fill={colors.shimmer} />
        <Path d={LEAF} fill={colors.shimmer} />
      </Svg>
      <Text style={[styles.placeholderLabel, { color: colors.accent }]}>{label}</Text>
    </View>
  );
};

const IngredientComposition = ({ dish }) => {
  const ingredients = getDishVisualIngredients(dish, { limit: 7 });
  if (!ingredients.length) return null;

  const layout = layouts[ingredients.length];

  return (
    <View
      accessibilityLabel="Продукты для блюда"
      style={[styles.composition, { aspectRatio: BASE_WIDTH / layout.height }]}
    >
      {ingredients.map(({ raw, key }, index) => {
        const [x, y, rotation, layer] = layout.items[index];
        const image = key ? artworkByKey[key] : null;

        return (
          <View
            key={`${key || raw}-${index}`}
            pointerEvents="none"
            style={[styles.visual, {
              left: toPercent(x, BASE_WIDTH),
              top: toPercent(y, layout.height),
              zIndex: layer,
              transform: [{ rotate: `${rotation}deg` }],
            }]}
          >
            {image
              ? <Image source={image} accessibilityLabel={raw} resizeMode="contain" style={styles.image} />
              : <IngredientPlaceholder label={ingredientVisualLabel(raw)} />}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  composition: { width: '100%', marginTop: 12, marginBottom: 2 },
  visual: { position: 'absolute', width: '33.82%', aspectRatio: 1 },
  image: { width: '100%', height: '100%' },
  placeholder: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  placeholderLabel: {
    width: '68%',
    marginTop: '5%',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 13,
    textAlign: 'center',
  },
});

export default IngredientComposition;
