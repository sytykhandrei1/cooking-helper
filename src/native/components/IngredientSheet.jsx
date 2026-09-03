import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import BottomSheet from './BottomSheet';
import { CheckIcon, PlusIcon, SearchIcon, XIcon } from '../icons';
import { allIngredients } from '../../data/dishes';
import { useTheme } from '../ThemeContext';
import { radii } from '../theme';

const IngredientSheet = ({ open, selected, onChange, onClose, error }) => {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const visibleIngredients = useMemo(() => allIngredients
    .filter((ingredient) => !normalizedQuery || ingredient.toLowerCase().includes(normalizedQuery))
    .slice(0, 80), [normalizedQuery]);
  const exactExists = allIngredients.some((ingredient) => ingredient.toLowerCase() === normalizedQuery);

  const toggle = (ingredient) => {
    onChange(selected.includes(ingredient)
      ? selected.filter((item) => item !== ingredient)
      : [...selected, ingredient]);
  };

  const addCustom = () => {
    const value = query.trim().toLowerCase();
    if (!value || selected.includes(value)) return;
    onChange([...selected, value]);
    setQuery('');
  };

  return (
    <BottomSheet
      open={open}
      title="Что есть дома?"
      onClose={onClose}
      footer={(
        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          style={({ pressed }) => [
            styles.primaryAction,
            { backgroundColor: colors.card },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.primaryActionLabel, { color: colors.text }]}>Готово</Text>
        </Pressable>
      )}
    >
      <View style={[styles.search, { backgroundColor: colors.searchSurface }]}>
        <SearchIcon size={19} color={colors.muted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={addCustom}
          placeholder="Найти или добавить продукт"
          placeholderTextColor={colors.searchPlaceholder}
          returnKeyType="done"
        />
      </View>

      {selected.length > 0 ? (
        <View accessibilityLabel="Выбранные продукты" style={styles.chips}>
          {selected.map((ingredient) => (
            <Pressable
              key={ingredient}
              accessibilityRole="button"
              accessibilityLabel={`Убрать ${ingredient}`}
              onPress={() => toggle(ingredient)}
              style={({ pressed }) => [
                styles.chip,
                { backgroundColor: colors.accent },
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.chipLabel, { color: colors.accentInk }]}>{ingredient}</Text>
              <XIcon size={14} color={colors.accentInk} />
            </Pressable>
          ))}
        </View>
      ) : null}

      {error ? (
        <Text
          accessibilityRole="alert"
          style={[styles.error, { color: colors.errorText, backgroundColor: colors.errorSurface }]}
        >
          {error}
        </Text>
      ) : null}

      <View style={styles.picker}>
        {!exactExists && normalizedQuery ? (
          <Pressable
            accessibilityRole="button"
            onPress={addCustom}
            style={({ pressed }) => [
              styles.row,
              styles.customRow,
              { backgroundColor: colors.rowSurface },
              pressed && styles.pressed,
            ]}
          >
            <PlusIcon size={19} color={colors.text} />
            <Text style={[styles.rowLabel, { color: colors.text }]}>Добавить «{query.trim()}»</Text>
          </Pressable>
        ) : null}

        {visibleIngredients.map((ingredient) => {
          const checked = selected.includes(ingredient);
          return (
            <Pressable
              key={ingredient}
              accessibilityRole="checkbox"
              aria-checked={checked}
              accessibilityLabel={ingredient}
              onPress={() => toggle(ingredient)}
              style={({ pressed }) => [
                styles.row,
                {
                  borderColor: checked ? colors.accent : 'transparent',
                  backgroundColor: checked ? colors.rowSurfaceSelected : colors.rowSurface,
                },
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.rowLabel, { color: colors.text }]}>{ingredient}</Text>
              <View
                style={[styles.check, {
                  borderColor: checked ? colors.accent : colors.checkBorder,
                  backgroundColor: checked ? colors.accent : 'transparent',
                }]}
              >
                {checked ? <CheckIcon size={15} color={colors.accentInk} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  search: {
    height: 48,
    paddingHorizontal: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
  },
  searchInput: { flex: 1, fontSize: 16, padding: 0 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingBottom: 12 },
  chip: {
    minHeight: 34,
    paddingLeft: 13,
    paddingRight: 11,
    borderRadius: radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chipLabel: { fontSize: 15 },
  error: {
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: radii.row,
    fontSize: 14,
    lineHeight: 20,
  },
  picker: { gap: 7 },
  row: {
    minHeight: 48,
    paddingLeft: 15,
    paddingRight: 13,
    borderWidth: 1,
    borderRadius: radii.row,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  customRow: { justifyContent: 'flex-start' },
  rowLabel: { flexShrink: 1, fontSize: 15 },
  check: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryAction: {
    minHeight: 56,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionLabel: { fontSize: 20, fontWeight: '400' },
  pressed: { opacity: 0.7 },
});

export default IngredientSheet;
