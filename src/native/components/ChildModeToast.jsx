import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChildIcon } from '../icons';
import { useTheme } from '../ThemeContext';
import { easing, radii, timings } from '../theme';

const BEZIER = Easing.bezier(...easing.standard);

// Аналог .child-mode-toast: появляется, живёт 2800 мс и уезжает.
// В вебе за это отвечали CSS-переходы разной длительности для opacity и transform,
// поэтому здесь два независимых Animated.Value.
const ChildModeToast = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0)).current;
  const shift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateTo = (value, duration) => Animated.parallel([
      Animated.timing(opacity, {
        toValue: value,
        duration: timings.toastOut,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(shift, {
        toValue: value,
        duration,
        easing: BEZIER,
        useNativeDriver: true,
      }),
    ]);

    animateTo(1, timings.toastIn).start();
    const hideTimer = setTimeout(() => animateTo(0, timings.toastIn).start(), timings.toastVisibleFor);
    return () => clearTimeout(hideTimer);
  }, [opacity, shift]);

  const translateY = shift.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] });
  const scale = shift.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1] });

  return (
    <View style={[styles.host, { top: Math.max(146, insets.top + 99) }]} pointerEvents="none">
      <Animated.View
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={[
          styles.toast,
          {
            borderColor: colors.toastBorder,
            backgroundColor: colors.toastSurface,
            maxWidth: width - 32,
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <ChildIcon size={22} color={colors.activeYellow} />
        <Animated.Text style={[styles.label, { color: colors.text }]}>Детский режим включен, учтем это в блюдах</Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  host: { position: 'absolute', left: 0, right: 0, zIndex: 450, alignItems: 'center' },
  toast: {
    minHeight: 44,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 12,
    paddingRight: 14,
    borderWidth: 1,
    borderRadius: radii.toggleList,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.38,
    shadowRadius: 15,
    elevation: 8,
  },
  label: { flexShrink: 1, fontSize: 15, fontWeight: '600', lineHeight: 20 },
});

export default ChildModeToast;
