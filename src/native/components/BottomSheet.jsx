import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated, Easing, Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CloseButton from './CloseButton';
import { useTheme } from '../ThemeContext';
import { easing, radii, timings } from '../theme';

const BEZIER = Easing.bezier(...easing.standard);

// Аналог .sheet-backdrop / .bottom-sheet из App.css.
// Веб закрывал шит мгновенно (return null), поэтому анимируется только появление.
// Modal берёт на себя Escape в вебе и системную кнопку «Назад» на Android —
// это заменяет ручной слушатель keydown из веб-версии.
const BottomSheet = ({ open, title, description, onClose, children, footer }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    if (open) return;
    backdropOpacity.setValue(0);
    translateY.setValue(0);
    setMeasured(false);
  }, [open, backdropOpacity, translateY]);

  // Высоту шита знаем только после раскладки, поэтому съезд снизу запускаем в onLayout.
  const startEntrance = useCallback((event) => {
    if (measured) return;
    setMeasured(true);
    translateY.setValue(event.nativeEvent.layout.height);
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: timings.backdrop,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: timings.sheet,
        easing: BEZIER,
        useNativeDriver: true,
      }),
    ]).start();
  }, [measured, backdropOpacity, translateY]);

  return (
    <Modal
      visible={open}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.backdropHost}>
        <Animated.View style={[styles.backdrop, { backgroundColor: colors.backdrop, opacity: backdropOpacity }]} />
        {/* Клик по затемнению закрывает шит, как onMouseDown по .sheet-backdrop.
            Для скринридеров он скрыт: закрывать нужно кнопкой в шапке. */}
        <Pressable
          style={StyleSheet.absoluteFill}
          accessibilityElementsHidden
          importantForAccessibility="no"
          onPress={onClose}
        />
        <Animated.View
          accessibilityViewIsModal
          accessibilityLabel={title}
          onLayout={startEntrance}
          style={[
            styles.sheet,
            {
              borderColor: colors.line,
              backgroundColor: colors.sheetSurface,
              maxHeight: Math.min(windowHeight * 0.84, 760),
              opacity: measured ? 1 : 0,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.header}>
            <CloseButton onPress={onClose} />
            <View style={styles.headerText}>
              <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
              {description ? <Text style={[styles.description, { color: colors.muted }]}>{description}</Text> : null}
            </View>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentInner}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>

          {footer ? (
            <View style={[styles.footer, {
              borderTopColor: colors.sheetFooterLine,
              backgroundColor: colors.sheetFooter,
              paddingBottom: Math.max(16, insets.bottom + 10),
            }]}>
              {footer}
            </View>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdropHost: { flex: 1, justifyContent: 'flex-end' },
  backdrop: StyleSheet.absoluteFillObject,
  sheet: {
    width: '100%',
    overflow: 'hidden',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -24 },
    shadowOpacity: 0.55,
    shadowRadius: 40,
  },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 14, alignItems: 'flex-start' },
  headerText: { marginTop: 20 },
  // fontWeight 700 и lineHeight 29.16 — это вычисленные стили <h2> из веб-версии.
  title: { fontSize: 27, lineHeight: 29.16, letterSpacing: -0.945, fontWeight: '700' },
  description: { marginTop: 7, fontSize: 14, lineHeight: 19 },
  content: { flexShrink: 1 },
  contentInner: { paddingHorizontal: 16, paddingBottom: 18 },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
});

export default BottomSheet;
