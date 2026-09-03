import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { MoonIcon, SunIcon } from '../icons';
import { useTheme } from '../ThemeContext';
import { easing, radii, timings } from '../theme';

const BEZIER = Easing.bezier(...easing.standard);

const TRACK_WIDTH = 84;
const TRACK_HEIGHT = 40;
const PADDING = 4;
const KNOB = TRACK_HEIGHT - PADDING * 2;
const TRAVEL = TRACK_WIDTH - KNOB - PADDING * 2;

// Пилюля с ездящим кружком: активная иконка едет вместе с ним,
// вторая остаётся приглушённой на своей стороне.
const ThemeToggle = () => {
  const { colors, isDark, toggleScheme } = useTheme();
  const progress = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isDark ? 1 : 0,
      duration: timings.theme,
      easing: BEZIER,
      useNativeDriver: true,
    }).start();
  }, [isDark, progress]);

  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, TRAVEL] });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel="Тёмная тема"
      aria-checked={isDark}
      onPress={toggleScheme}
      style={({ pressed }) => [
        styles.track,
        { backgroundColor: colors.themeTrack },
        pressed && styles.pressed,
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[styles.knob, { backgroundColor: colors.themeKnob, transform: [{ translateX }] }]}
      />
      <View style={styles.icons} pointerEvents="none">
        <View style={styles.iconSlot}>
          <SunIcon size={18} color={isDark ? colors.muted : colors.text} />
        </View>
        <View style={styles.iconSlot}>
          <MoonIcon size={18} color={isDark ? colors.text : colors.muted} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radii.pill,
    padding: PADDING,
    justifyContent: 'center',
  },
  knob: {
    position: 'absolute',
    top: PADDING,
    left: PADDING,
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  // Слоты совпадают с двумя положениями кружка: по краям внутренней области.
  icons: {
    position: 'absolute',
    top: PADDING,
    right: PADDING,
    bottom: PADDING,
    left: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconSlot: { width: KNOB, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.8 },
});

export default ThemeToggle;
