// Табы главного экрана. Модуль намеренно без импортов из react-native,
// чтобы описание вкладок и подписи кнопок можно было проверить тестами.
export const TABS = [
  { id: 'random', label: 'Рандом' },
  { id: 'assemble', label: 'Собрать' },
];

export const DEFAULT_TAB = TABS[0].id;

export const getTab = (id) => TABS.find((tab) => tab.id === id) || TABS[0];

// Надпись на основной кнопке зависит от таба и от того, выбраны ли продукты.
export const mainActionLabel = (tabId, selectedCount = 0) => {
  if (tabId === 'assemble') return selectedCount ? 'Собрать блюдо' : 'Выбрать продукты';
  return 'Новое блюдо';
};

// Текст над кнопкой на табе «Собрать».
export const selectionSummary = (selected = []) => (
  selected.length ? selected.join(', ') : 'Ничего не выбрано'
);
