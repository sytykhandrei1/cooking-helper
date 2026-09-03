import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { CloseIcon } from '../icons';
import { useTheme } from '../ThemeContext';

const CloseButton = ({ onPress, label = 'Закрыть', style }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.control },
        pressed && styles.pressed,
        style,
      ]}
    >
      <CloseIcon color={colors.text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
});

export default CloseButton;
