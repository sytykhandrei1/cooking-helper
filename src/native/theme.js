// Дизайн-токены перенесены из CSS-переменных :root в src/App.css.
// Веб-версия читала их через var(--*), в React Native они импортируются напрямую.
export const colors = {
  black: '#000',
  card: '#1c1c1e',
  control: '#2c2c2e',
  line: '#343437',
  text: '#fff',
  muted: '#9299a2',
  accent: '#f6f7f8',
  accentInk: '#000',
  activeYellow: '#c48a00',
  shimmer: '#48484a',

  backdrop: 'rgba(0, 0, 0, 0.62)',
  sheetFooter: 'rgba(0, 0, 0, 0.94)',
  sheetFooterLine: 'rgba(255, 255, 255, 0.07)',
  toastSurface: 'rgba(44, 44, 46, 0.97)',
  toastBorder: 'rgba(255, 255, 255, 0.12)',
  cardBorder: '#232323',
  toggleSurface: '#232326',
  toggleLine: '#303034',
  switchTrack: '#48484d',
  errorText: '#ffd2cb',
  errorSurface: '#48221d',

  // Плавающий таб-бар, значения из expo-linear-like-bottom-tabs.
  tabPill: 'rgba(126, 126, 126, 0.1)',
};

export const radii = {
  control: 28,
  card: 31.5,
  sheet: 30,
  toggleList: 22,
  tabBar: 25,
  row: 15,
  pill: 999,
};

// Тайминги и кривая совпадают с CSS-анимациями fade-in и sheet-up.
export const timings = {
  backdrop: 170,
  sheet: 240,
  switch: 160,
  toastIn: 220,
  toastOut: 180,
  toastVisibleFor: 2800,
  tabSelect: 300,
};

export const easing = { standard: [0.2, 0.8, 0.2, 1] };

// clamp() из CSS: в RN считаем от актуальной ширины окна.
export const clamp = (min, preferred, max) => Math.min(Math.max(min, preferred), max);

// Экранный брейкпоинт @media (max-height: 700px).
export const SHORT_SCREEN_HEIGHT = 700;
