import { describe, expect, it } from 'vitest';
import { DEFAULT_TAB, TABS, getTab, mainActionLabel, selectionSummary } from './tabs';

describe('табы главного экрана', () => {
  it('состоит из «Рандома» и «Собрать»', () => {
    expect(TABS.map((tab) => tab.label)).toEqual(['Рандом', 'Собрать']);
  });

  it('по умолчанию открывает рандом', () => {
    expect(DEFAULT_TAB).toBe('random');
  });

  it('на неизвестный id отдаёт первый таб', () => {
    expect(getTab('нет такого')).toBe(TABS[0]);
  });
});

describe('подписи основной кнопки', () => {
  it('на рандоме всегда предлагает новое блюдо', () => {
    expect(mainActionLabel('random')).toBe('Новое блюдо');
    expect(mainActionLabel('random', 3)).toBe('Новое блюдо');
  });

  it('на сборке меняется после выбора продуктов', () => {
    expect(mainActionLabel('assemble', 0)).toBe('Выбрать продукты');
    expect(mainActionLabel('assemble', 2)).toBe('Собрать блюдо');
  });
});

describe('текст над кнопкой', () => {
  it('без выбора сообщает, что ничего не выбрано', () => {
    expect(selectionSummary([])).toBe('Ничего не выбрано');
  });

  it('перечисляет выбранное через запятую', () => {
    expect(selectionSummary(['морковь', 'лук'])).toBe('морковь, лук');
  });
});
