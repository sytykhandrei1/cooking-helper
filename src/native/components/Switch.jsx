import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { radii, timings } from '../theme';

// Аналог .switch из App.css. Цвет фона в RN анимируется только JS-драйвером,
// поэтому вся анимация идёт через один Animated.Value без useNativeDriver.
const Switch = ({ on }) => {
  const { colors } = useTheme();
  const progress = useRef(new Animated.Value(on ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: on ? 1 : 0,
      duration: timings.switch,
      useNativeDriver: false,
    }).start();
  }, [on, progress]);

  const trackColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.switchTrack, colors.accent],
  });
  const knobColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', colors.accentInk],
  });
  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 20] });

  return (
    <Animated.View style={[styles.track, { backgroundColor: trackColor }]}>
      <Animated.View style={[styles.knob, { backgroundColor: knobColor, transform: [{ translateX }] }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  track: { width: 50, height: 30, padding: 3, borderRadius: radii.pill },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.32,
    shadowRadius: 3.5,
    elevation: 2,
  },
});

export default Switch;
