import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CloseIcon } from '../icons';
import { colors } from '../theme';

// Полупрозрачные слои повторяют стек фонов из .close-button:
// rgba(0,0,0,.6) + белый 6% + #ccc 8%. backdrop-filter: blur(20px) в RN нет —
// на сплошном чёрном шите он не читается, для оверлея рецепта добавим expo-blur.
const CloseButton = ({ onPress, label = 'Закрыть', style }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    onPress={onPress}
    style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
  >
    <View style={styles.tintWhite} pointerEvents="none" />
    <View style={styles.tintGrey} pointerEvents="none" />
    <CloseIcon color={colors.accent} />
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  pressed: { opacity: 0.7 },
  tintWhite: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255, 255, 255, 0.06)' },
  tintGrey: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(204, 204, 204, 0.08)' },
});

export default CloseButton;
