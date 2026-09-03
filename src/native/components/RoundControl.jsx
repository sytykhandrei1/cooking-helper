import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { radii } from '../theme';

// Аналог .round-control: активное состояние в вебе меняло только цвет иконки.
const RoundControl = ({ Icon, active, label, accessibilityState, onPress }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={accessibilityState}
      onPress={onPress}
      style={({ pressed }) => [
        styles.control,
        { backgroundColor: colors.control },
        pressed && styles.pressed,
      ]}
    >
      <Icon color={active ? colors.activeYellow : colors.text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  control: {
    width: 56,
    height: 56,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
});

export default RoundControl;
