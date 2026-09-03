import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChildModeToast from '../components/ChildModeToast';
import LinearTabBar, { TAB_BAR_BOTTOM, TAB_BAR_HEIGHT } from '../components/LinearTabBar';
import RoundControl from '../components/RoundControl';
import ThemeToggle from '../components/ThemeToggle';
import { AllergenIcon, ChildIcon, SettingsIcon } from '../icons';
import { TABS, getTab, mainActionLabel, selectionSummary } from '../tabs';
import { useTheme } from '../ThemeContext';
import { CONTENT_MAX_WIDTH, SHORT_SCREEN_HEIGHT } from '../theme';

const HomeScreen = ({
  allergenCount, childMode, childToastVersion, activeTab, onTabChange,
  selectedIngredients = [], onAllergens, onChildMode, onMainAction, onEditIngredients,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const shortScreen = height <= SHORT_SCREEN_HEIGHT;
  const tab = getTab(activeTab);
  const isAssemble = tab.id === 'assemble';

  return (
    <View
      style={[styles.screen, {
        backgroundColor: colors.background,
        paddingTop: shortScreen
          ? Math.max(24, insets.top + 12)
          : Math.max(48, insets.top + 20),
        // Место под плавающий таб-бар, чтобы контент не уходил под него.
        paddingBottom: Math.max(TAB_BAR_BOTTOM, insets.bottom) + TAB_BAR_HEIGHT + 16,
      }]}
    >
      {childMode && childToastVersion > 0 ? <ChildModeToast key={childToastVersion} /> : null}

      <View style={styles.content}>
        <View style={styles.header}>
          <ThemeToggle />
        </View>

        <View style={styles.center}>
          {/* Слот держит высоту строки и на «Рандоме», где текста нет:
              иначе кнопка и круглые контролы прыгали бы при смене таба. */}
          <View style={styles.summarySlot}>
            {isAssemble ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Выбранные продукты: ${selectionSummary(selectedIngredients)}`}
                onPress={onEditIngredients}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={[styles.summary, { color: colors.text }]}>
                  {selectionSummary(selectedIngredients)}
                </Text>
              </Pressable>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onMainAction}
            style={({ pressed }) => [
              styles.mainAction,
              { backgroundColor: colors.accent },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.mainActionLabel, { color: colors.accentInk }]}>
              {mainActionLabel(tab.id, selectedIngredients.length)}
            </Text>
          </Pressable>

          <View accessibilityLabel="Фильтры блюда" style={styles.controls}>
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
        </View>
      </View>

      <LinearTabBar tabs={TABS} activeTab={tab.id} onChange={onTabChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 16.5 },
  // Мобильная колонка по центру: на широком экране интерфейс не растягивается.
  content: { flex: 1, width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
  header: { alignItems: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 },
  // minHeight равен lineHeight строки: одна строка резервируется всегда.
  summarySlot: { minHeight: 36, maxWidth: '100%', alignItems: 'center', justifyContent: 'flex-end' },
  summary: { fontSize: 30, lineHeight: 36, textAlign: 'center' },
  // Кнопка обжимает надпись: 12 px по краям, высота 56, полное скругление.
  mainAction: {
    height: 56,
    paddingHorizontal: 12,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainActionLabel: { fontSize: 20, fontWeight: '500' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  pressed: { opacity: 0.7 },
});

export default HomeScreen;
