// Табы главного экрана. Модуль намеренно без импортов из react-native,
// чтобы описание вкладок можно было проверить тестами.
export const TABS = [
  { id: 'random', label: 'Рандом', action: 'Реши за меня' },
  { id: 'assemble', label: 'Собрать', action: 'Соберу сам' },
];

export const DEFAULT_TAB = TABS[0].id;

export const getTab = (id) => TABS.find((tab) => tab.id === id) || TABS[0];
