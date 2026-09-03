import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChildModeToast from '../components/ChildModeToast';
import LinearTabBar, { TAB_BAR_BOTTOM, TAB_BAR_HEIGHT } from '../components/LinearTabBar';
import RoundControl from '../components/RoundControl';
import { AllergenIcon, ChecklistIcon, ChildIcon, SettingsIcon, ShuffleIcon } from '../icons';
import { TABS, getTab } from '../tabs';
import { SHORT_SCREEN_HEIGHT, clamp, colors, radii } from '../theme';

const TAB_ICONS = { random: ShuffleIcon, assemble: ChecklistIcon };
const tabsWithIcons = TABS.map((tab) => ({ ...tab, Icon: TAB_ICONS[tab.id] }));

// Аналог .mobile-home. Значения env(safe-area-inset-*) приходят из
// react-native-safe-area-context, clamp() и vw считаются от ширины окна,
// а @media (max-height: 700px) — от его высоты.
const HomeScreen = ({
  allergenCount, childMode, childToastVersion, activeTab, onTabChange,
  onAllergens, onChildMode, onRandom, onIngredients,
}) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const shortScreen = height <= SHORT_SCREEN_HEIGHT;
  const tab = getTab(activeTab);
  const onAction = tab.id === 'random' ? onRandom : onIngredients;

  return (
    <View
      style={[styles.screen, {
        paddingTop: shortScreen
          ? Math.max(48, insets.top + 20)
          : Math.max(80, insets.top + 33),
        // Место под плавающий таб-бар, чтобы карточка не уходила под него.
        paddingBottom: Math.max(TAB_BAR_BOTTOM, insets.bottom) + TAB_BAR_HEIGHT + 16,
      }]}
    >
      {childMode && childToastVersion > 0 ? <ChildModeToast key={childToastVersion} /> : null}

      <View
        accessibilityLabel="Фильтры блюда"
        style={[styles.controls, {
          marginLeft: clamp(32, width * 0.1267, 47.5),
          marginRight: clamp(31, width * 0.124, 46.5),
          marginBottom: shortScreen ? 24 : 36.5,
        }]}
      >
        <RoundControl
          Icon={AllergenIcon}
          active={allergenCount > 0}
          label={`Аллергены${allergenCount ? `: выбрано ${allergenCount}` : ''}`}
          onPress={onAllergens}
        />
        <RoundControl
          Icon={ChildIcon}
          active={childMode}
          label="Детский режим"
          accessibilityState={{ selected: childMode }}
          onPress={onChildMode}
        />
        <RoundControl Icon={SettingsIcon} label="Настройки" />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onAction}
        style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
      >
        <Text style={styles.actionLabel}>{tab.action}</Text>
      </Pressable>

      <LinearTabBar tabs={tabsWithIcons} activeTab={tab.id} onChange={onTabChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16.5,
    backgroundColor: colors.black,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.cardBorder,
    borderRadius: radii.card,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { color: colors.text, fontSize: 20, fontWeight: '500', lineHeight: 24, textAlign: 'center' },
  pressed: { opacity: 0.7 },
});

export default HomeScreen;
