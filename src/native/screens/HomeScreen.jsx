import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChildModeToast from '../components/ChildModeToast';
import LinearTabBar, { TAB_BAR_BOTTOM, TAB_BAR_HEIGHT } from '../components/LinearTabBar';
import RoundControl from '../components/RoundControl';
import ThemeToggle from '../components/ThemeToggle';
import { AllergenIcon, ChildIcon, SettingsIcon } from '../icons';
import { MAIN_ACTION_LABELS, TABS, getTab, mainActionLabel, selectionSummary } from '../tabs';
import { useTheme } from '../ThemeContext';
import { CONTENT_MAX_WIDTH, SHORT_SCREEN_HEIGHT, easing, timings } from '../theme';

const BEZIER = Easing.bezier(...easing.standard);
const CONTROL_SIZE = 56;
const CONTROL_GAP = 16;
// Кнопка обжимает надпись: по 16 px слева и справа.
const MAIN_ACTION_PADDING = 16;

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
  const label = mainActionLabel(tab.id, selectedIngredients.length);

  // Ширину каждой надписи меряем заранее на скрытых копиях: анимировать
  // width можно только к известному числу, а сам текст меняется мгновенно.
  const [labelWidths, setLabelWidths] = useState({});
  // Надпись меняется не мгновенно, а через затухание: иначе на середине
  // анимации новый текст обрезается многоточием в ещё не выросшей кнопке.
  const [shownLabel, setShownLabel] = useState(label);
  const labelOpacity = useRef(new Animated.Value(1)).current;
  const actionWidth = useRef(new Animated.Value(0)).current;
  const settled = useRef(false);
  const target = labelWidths[label];
  // Ширину надписи фиксируем по замеру: тогда обрезать нечего и многоточие
  // не появляется, даже пока кнопка ещё не доросла.
  const shownWidth = labelWidths[shownLabel] == null
    ? undefined
    : Math.ceil(labelWidths[shownLabel]) + 2;

  useEffect(() => {
    if (label === shownLabel) return;
    // Без очистки намеренно: stop() здесь останавливал бы уже не затухание,
    // а обратное проявление, и надпись замирала невидимой.
    Animated.timing(labelOpacity, {
      toValue: 0,
      duration: 90,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;
      setShownLabel(label);
      Animated.timing(labelOpacity, {
        toValue: 1,
        duration: 170,
        easing: BEZIER,
        useNativeDriver: true,
      }).start();
    });
  }, [label, shownLabel, labelOpacity]);

  useEffect(() => {
    if (target == null) return;
    // +2 — запас на округление: onLayout отдаёт ширину вниз, и текста
    // не хватало буквально на долю пикселя, включая многоточие.
    const to = Math.ceil(target) + MAIN_ACTION_PADDING * 2 + 2;
    if (!settled.current) {
      settled.current = true;
      actionWidth.setValue(to);
      return;
    }
    Animated.timing(actionWidth, {
      toValue: to,
      duration: timings.mainAction,
      easing: BEZIER,
      useNativeDriver: false,
    }).start();
  }, [target, actionWidth]);

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

      <View style={styles.measure} pointerEvents="none" aria-hidden>
        {MAIN_ACTION_LABELS.map((item) => (
          <Text
            key={item}
            style={[styles.mainActionLabel, styles.measureItem]}
            numberOfLines={1}
            onLayout={(event) => {
              const { width: w } = event.nativeEvent.layout;
              setLabelWidths((current) => (current[item] ? current : { ...current, [item]: w }));
            }}
          >
            {item}
          </Text>
        ))}
      </View>

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

          <Animated.View style={[styles.mainActionBox, target == null ? styles.hidden : null, { width: actionWidth }]}>
            <Pressable
              accessibilityRole="button"
              onPress={onMainAction}
              style={({ pressed }) => [
                styles.mainAction,
                { backgroundColor: colors.control },
                pressed && styles.pressed,
              ]}
            >
              <Animated.Text
                style={[
                  styles.mainActionLabel,
                  { color: colors.text, opacity: labelOpacity, width: shownWidth },
                ]}
              >
                {shownLabel}
              </Animated.Text>
            </Pressable>
          </Animated.View>

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
  mainActionBox: {
    height: CONTROL_SIZE,
    borderRadius: CONTROL_SIZE / 2,
    overflow: 'hidden',
  },
  mainAction: {
    flex: 1,
    paddingHorizontal: MAIN_ACTION_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidden: { opacity: 0 },
  // Копии надписей вне потока: нужны только чтобы узнать их ширину.
  // Ширина контейнера задана с запасом, иначе текст переносится по словам
  // и меряется короче, чем есть.
  measure: { position: 'absolute', top: 0, left: 0, width: 1000, opacity: 0 },
  measureItem: { position: 'absolute', top: 0, left: 0 },
  mainActionLabel: { fontSize: 20, fontWeight: '500', textAlign: 'center' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: CONTROL_GAP },
  pressed: { opacity: 0.7 },
});

export default HomeScreen;
