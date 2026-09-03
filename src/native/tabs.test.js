import { describe, expect, it } from 'vitest';
import { DEFAULT_TAB, TABS, getTab } from './tabs';

describe('табы главного экрана', () => {
  it('состоит из «Рандома» и «Собрать»', () => {
    expect(TABS.map((tab) => tab.label)).toEqual(['Рандом', 'Собрать']);
  });

  it('связывает таб с действием на карточке', () => {
    expect(getTab('random').action).toBe('Реши за меня');
    expect(getTab('assemble').action).toBe('Соберу сам');
  });

  it('по умолчанию открывает рандом', () => {
    expect(DEFAULT_TAB).toBe('random');
  });

  it('на неизвестный id отдаёт первый таб', () => {
    expect(getTab('нет такого')).toBe(TABS[0]);
  });
});
