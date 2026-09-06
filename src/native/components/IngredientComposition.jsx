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

// Раскладка сеткой, как на референсных съёмках: вид сверху, предметы стоят
// ровными рядами, не перекрываются и не повёрнуты. Последний ряд центрируется.
const ROWS = {
  1: [1], 2: [2], 3: [3], 4: [2, 2], 5: [3, 2], 6: [3, 3], 7: [4, 3],
};

const CELL_GAP = 12;

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
      style={styles.placeholderBox}
    >
      <View style={styles.placeholderShape}>
        <Svg style={StyleSheet.absoluteFill} viewBox="0 0 120 120">
          <Path d={BLOB} fill={colors.shimmer} />
          <Path d={LEAF} fill={colors.shimmer} />
        </Svg>
        <Text style={[styles.placeholderLabel, { color: colors.accent }]}>{label}</Text>
      </View>
    </View>
  );
};

const IngredientComposition = ({ dish }) => {
  const ingredients = getDishVisualIngredients(dish, { limit: 7 });
  if (!ingredients.length) return null;

  const rows = ROWS[ingredients.length];
  const columns = Math.max(...rows);
  const cell = (BASE_WIDTH - CELL_GAP * (columns - 1)) / columns;
  const height = cell * rows.length + CELL_GAP * (rows.length - 1);

  let taken = 0;
  const placed = rows.flatMap((count, rowIndex) => {
    const rowWidth = cell * count + CELL_GAP * (count - 1);
    const offset = (BASE_WIDTH - rowWidth) / 2;
    return ingredients.slice(taken, (taken += count)).map((item, columnIndex) => ({
      ...item,
      x: offset + columnIndex * (cell + CELL_GAP),
      y: rowIndex * (cell + CELL_GAP),
    }));
  });

  return (
    <View
      accessibilityLabel="Продукты для блюда"
      style={[styles.composition, { aspectRatio: BASE_WIDTH / height }]}
    >
      {placed.map(({ raw, key, x, y }, index) => {
        const image = key ? artworkByKey[key] : null;

        return (
          <View
            key={`${key || raw}-${index}`}
            pointerEvents="none"
            style={[styles.visual, {
              left: toPercent(x, BASE_WIDTH),
              top: toPercent(y, height),
              width: toPercent(cell, BASE_WIDTH),
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
  visual: { position: 'absolute', aspectRatio: 1 },
  image: { width: '100%', height: '100%' },
  // Снимок вписан внутрь ячейки с полями, поэтому заглушка тоже ужимается —
  // иначе она заполняет ячейку целиком и перевешивает реальные продукты.
  placeholderBox: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  placeholderShape: { width: '76%', height: '76%', alignItems: 'center', justifyContent: 'center' },
  placeholderLabel: {
    width: '88%',
    marginTop: '5%',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 13,
    textAlign: 'center',
  },
});

export default IngredientComposition;
