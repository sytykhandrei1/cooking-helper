import React, { useMemo, useRef, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CloseButton from '../components/CloseButton';
import IngredientComposition from '../components/IngredientComposition';
import { useTheme } from '../ThemeContext';
import { CONTENT_MAX_WIDTH, radii } from '../theme';

const stepArtwork = [
  require('../../assets/featured-dish/step-prep-square.png'),
  require('../../assets/featured-dish/step-pan-square.png'),
  require('../../assets/featured-dish/step-finish-square.png'),
];

// Перенесено из веб-версии без изменений.
const parseRecipe = (recipe = '') => {
  const steps = recipe
    .replace(/\s+(?=\d+\.\s)/g, '\n')
    .split('\n')
    .map((step) => step.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);
  return steps.length ? steps : ['Подготовьте ингредиенты и приготовьте блюдо до готовности.'];
};

const RecipeScreen = ({ dish, onClose, onAnother, actionLabel = 'Новое блюдо' }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const steps = useMemo(() => parseRecipe(dish?.recipe), [dish]);
  const servings = dish?.servings || 4;
  const timeMinutes = dish?.timeMinutes || Math.max(20, steps.length * 10);
  const meta = `Порций ${servings} · Время ${timeMinutes} минут`;

  return (
    <Modal
      visible={Boolean(dish)}
      transparent={false}
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onClose}
      onShow={() => {
        setScrolled(false);
        scrollRef.current?.scrollTo({ y: 0, animated: false });
      }}
    >
      {dish ? (
        <View
          accessibilityViewIsModal
          accessibilityLabel={`Рецепт: ${dish.name}`}
          style={[styles.screen, { backgroundColor: colors.background }]}
        >
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={[styles.scrollInner, {
              paddingTop: Math.max(68, insets.top + 21) + 60,
              paddingBottom: Math.max(50, insets.bottom + 16) + 72,
            }]}
            scrollEventThrottle={16}
            onScroll={(event) => setScrolled(event.nativeEvent.contentOffset.y > 116)}
          >
            <Text style={[styles.title, { color: colors.text }]}>{dish.name}</Text>
            <Text style={[styles.meta, { color: colors.text }]}>{meta}</Text>

            <IngredientComposition dish={dish} />

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Ингредиенты</Text>
              {(dish.ingredients || []).map((ingredient) => (
                <Text key={ingredient} style={[styles.listItem, { color: colors.text }]}>
                  {'•'}  {ingredient}
                </Text>
              ))}
            </View>

            <View style={styles.process}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Рецепт</Text>
              <View style={styles.steps}>
                {steps.map((step, index) => (
                  <View key={`${dish.id}-${index}`} style={styles.step}>
                    <View style={styles.stepImageBox}>
                      <Image
                        source={stepArtwork[Math.min(index, stepArtwork.length - 1)]}
                        resizeMode="contain"
                        style={styles.stepImage}
                      />
                    </View>
                    <Text style={[styles.stepText, { color: colors.text }]}>
                      {index + 1}. {step}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Шапка липнет к верху и получает фон только после прокрутки — как в вебе. */}
          <View
            pointerEvents="box-none"
            style={[styles.topbar, {
              paddingTop: Math.max(68, insets.top + 21),
              backgroundColor: scrolled ? colors.background : 'transparent',
            }]}
          >
            <CloseButton onPress={onClose} label="Закрыть рецепт" />
            {scrolled ? (
              <View pointerEvents="none" style={styles.compactTitle}>
                <Text numberOfLines={1} style={[styles.compactName, { color: colors.text }]}>
                  {dish.name}
                </Text>
                <Text style={[styles.compactMeta, { color: colors.muted }]}>{meta}</Text>
              </View>
            ) : null}
          </View>

          <View
            pointerEvents="box-none"
            style={[styles.dock, {
              paddingBottom: Math.max(50, insets.bottom + 16),
              backgroundColor: colors.background,
            }]}
          >
            <Pressable
              accessibilityRole="button"
              onPress={onAnother}
              style={({ pressed }) => [
                styles.dockButton,
                { backgroundColor: colors.accent },
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.dockLabel, { color: colors.accentInk }]}>{actionLabel}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollInner: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  title: { fontSize: 32, fontWeight: '700', lineHeight: 32, letterSpacing: -0.64 },
  meta: { marginTop: 8, fontSize: 15, lineHeight: 20 },
  section: { marginTop: 16 },
  sectionTitle: { marginBottom: 8, fontSize: 20, fontWeight: '500', lineHeight: 24 },
  listItem: { paddingBottom: 2, fontSize: 15, lineHeight: 19 },
  process: { marginTop: 34 },
  steps: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 15, rowGap: 28 },
  step: { width: '47%' },
  stepImageBox: { width: '100%', aspectRatio: 1 },
  stepImage: { width: '100%', height: '100%' },
  stepText: { marginTop: 8, fontSize: 15, lineHeight: 20 },
  topbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 128,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  compactTitle: { position: 'absolute', top: 69, left: 72, right: 72, alignItems: 'center' },
  compactName: { fontSize: 16, fontWeight: '600', lineHeight: 18 },
  compactMeta: { marginTop: 2, fontSize: 13 },
  dock: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  dockButton: {
    width: '100%',
    maxWidth: 343,
    minHeight: 56,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockLabel: { fontSize: 20, fontWeight: '500' },
  pressed: { opacity: 0.7 },
});

export default RecipeScreen;
