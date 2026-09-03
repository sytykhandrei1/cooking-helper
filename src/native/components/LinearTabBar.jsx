import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { colors, radii, timings } from '../theme';

export const TAB_BAR_HEIGHT = 50;
export const TAB_BAR_BOTTOM = 30;

// Хаптик есть только на устройстве: в вебе вызов не поддерживается.
const tapFeedback = () => {
  if (Platform.OS === 'web') return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
};

const Tab = ({ tab, focused, onPress }) => {
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;

  // Выделение как в референсе: пилюля проявляется и подрастает с 0.8 до 1.
  useEffect(() => {
    Animated.timing(progress, {
      toValue: focused ? 1 : 0,
      duration: timings.tabSelect,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [focused, progress]);

  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });
  const tint = focused ? colors.text : colors.muted;
  const { Icon } = tab;

  return (
    <Pressable
      accessibilityRole="tab"
      // aria-selected понимают и React Native, и react-native-web;
      // accessibilityState в вебе до DOM не доезжает.
      aria-selected={focused}
      accessibilityLabel={tab.label}
      onPress={() => {
        if (!focused) tapFeedback();
        onPress();
      }}
      style={styles.tab}
    >
      <Animated.View
        pointerEvents="none"
        style={[styles.tabPill, { opacity: progress, transform: [{ scale }] }]}
      />
      <View style={styles.tabContent}>
        <Icon size={20} color={tint} />
        <Text style={[styles.tabLabel, { color: tint }]} numberOfLines={1}>{tab.label}</Text>
      </View>
    </Pressable>
  );
};

// Плавающий таб-бар в духе expo-linear-like-bottom-tabs: скруглённая полоса на
// размытии, отступ 20 по бокам и 30 снизу. Выдвижное меню на свайп из референса
// не переносим — оно там для восьми разделов, а у нас всего два.
const LinearTabBar = ({ tabs, activeTab, onChange }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.host, { bottom: Math.max(TAB_BAR_BOTTOM, insets.bottom) }]}>
      <View accessibilityRole="tablist" style={styles.bar}>
        <BlurView intensity={60} tint="systemThickMaterialDark" style={styles.blur}>
          <View style={styles.row}>
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                tab={tab}
                focused={activeTab === tab.id}
                onPress={() => onChange(tab.id)}
              />
            ))}
          </View>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  host: { position: 'absolute', left: 20, right: 20 },
  bar: {
    height: TAB_BAR_HEIGHT,
    borderRadius: radii.tabBar,
    overflow: 'hidden',
  },
  blur: { flex: 1 },
  row: { flex: 1, flexDirection: 'row' },
  tab: {
    flex: 1,
    margin: 5,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 200,
    backgroundColor: colors.tabPill,
  },
  tabContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tabLabel: { fontSize: 15, fontWeight: '600' },
});

export default LinearTabBar;
