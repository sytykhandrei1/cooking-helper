// Дизайн-токены. Тёмная палитра перенесена из CSS-переменных :root в src/App.css,
// светлая собрана ей в пару. Веб-версия читала цвета через var(--*),
// в React Native они приходят из useTheme().
export const darkColors = {
  background: '#000',
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
  sheetSurface: '#000',
  sheetFooter: 'rgba(0, 0, 0, 0.94)',
  sheetFooterLine: 'rgba(255, 255, 255, 0.07)',
  toastSurface: 'rgba(44, 44, 46, 0.97)',
  toastBorder: 'rgba(255, 255, 255, 0.12)',
  cardBorder: '#232323',
  toggleSurface: '#232326',
  toggleLine: '#303034',
  switchTrack: '#48484d',
  searchSurface: '#2a2a2d',
  searchPlaceholder: '#77777f',
  rowSurface: '#252528',
  rowSurfaceSelected: '#2c2c2e',
  checkBorder: '#55555b',
  errorText: '#ffd2cb',
  errorSurface: '#48221d',

  tabPill: 'rgba(126, 126, 126, 0.1)',
  themeTrack: '#1c1c1e',
  themeKnob: '#2c2c2e',
};

export const lightColors = {
  background: '#f2f2f7',
  card: '#fff',
  control: '#e4e4ea',
  line: '#d1d1d6',
  text: '#000',
  muted: '#6c727f',
  accent: '#1c1c1e',
  accentInk: '#fff',
  activeYellow: '#a8760a',
  shimmer: '#c7c7cc',

  backdrop: 'rgba(0, 0, 0, 0.38)',
  sheetSurface: '#fff',
  sheetFooter: 'rgba(255, 255, 255, 0.94)',
  sheetFooterLine: 'rgba(0, 0, 0, 0.08)',
  toastSurface: 'rgba(255, 255, 255, 0.97)',
  toastBorder: 'rgba(0, 0, 0, 0.1)',
  cardBorder: '#e2e2e8',
  toggleSurface: '#fff',
  toggleLine: '#e2e2e8',
  switchTrack: '#c7c7cc',
  searchSurface: '#e3e3ea',
  searchPlaceholder: '#8a8a90',
  rowSurface: '#fff',
  rowSurfaceSelected: '#ececf2',
  checkBorder: '#b8b8c0',
  errorText: '#7f231a',
  errorSurface: '#ffe3de',

  tabPill: 'rgba(120, 120, 128, 0.16)',
  themeTrack: '#e4e4ea',
  themeKnob: '#fff',
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
  mainAction: 260,
  theme: 260,
};

export const easing = { standard: [0.2, 0.8, 0.2, 1] };

// clamp() из CSS: в RN считаем от актуальной ширины окна.
export const clamp = (min, preferred, max) => Math.min(Math.max(min, preferred), max);

// Экранный брейкпоинт @media (max-height: 700px).
export const SHORT_SCREEN_HEIGHT = 700;

// Ширина контента: на широком экране интерфейс не растягивается,
// а держит мобильную колонку по центру.
export const CONTENT_MAX_WIDTH = 420;
