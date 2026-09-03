import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet from './BottomSheet';
import Switch from './Switch';
import { allergens } from '../../data/dishes';
import { colors, radii } from '../theme';

// В вебе здесь был toLocaleUpperCase('ru-RU'); для кириллицы и латиницы
// результат совпадает с toUpperCase(), а Intl в Hermes лучше не задействовать зря.
const capitalizeAllergen = (allergen) => `${allergen.charAt(0).toUpperCase()}${allergen.slice(1)}`;

const AllergenSheet = ({ open, selected, onToggle, onClose }) => (
  <BottomSheet
    open={open}
    title="Аллергены"
    onClose={onClose}
    footer={(
      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}
      >
        <Text style={styles.primaryActionLabel}>Готово</Text>
      </Pressable>
    )}
  >
    <View style={styles.toggleList}>
      {allergens.map((allergen, index) => {
        const checked = selected.includes(allergen);
        return (
          <Pressable
            key={allergen}
            accessibilityRole="switch"
            accessibilityState={{ checked }}
            accessibilityLabel={capitalizeAllergen(allergen)}
            onPress={() => onToggle(allergen)}
            style={({ pressed }) => [
              styles.toggleRow,
              index === allergens.length - 1 && styles.toggleRowLast,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.toggleLabel}>{capitalizeAllergen(allergen)}</Text>
            <Switch on={checked} />
          </Pressable>
        );
      })}
    </View>
  </BottomSheet>
);

const styles = StyleSheet.create({
  toggleList: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.toggleLine,
    borderRadius: radii.toggleList,
  },
  toggleRow: {
    minHeight: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.toggleLine,
    backgroundColor: colors.toggleSurface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  toggleRowLast: { borderBottomWidth: 0 },
  toggleLabel: { flexShrink: 1, color: colors.text, fontSize: 16 },
  primaryAction: {
    minHeight: 56,
    borderRadius: radii.control,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionLabel: { color: colors.text, fontSize: 20, fontWeight: '400' },
  pressed: { opacity: 0.7 },
});
export default AllergenSheet;
