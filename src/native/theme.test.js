import { describe, expect, it } from 'vitest';
import { SHORT_SCREEN_HEIGHT, clamp, darkColors, lightColors, radii } from './theme';

describe('токены нативной темы', () => {
  it('повторяет clamp() из CSS', () => {
    // clamp(31px, 12.4vw, 46.5px) при разной ширине окна
    expect(clamp(31, 320 * 0.124, 46.5)).toBe(39.68);
    expect(clamp(31, 200 * 0.124, 46.5)).toBe(31);
    expect(clamp(31, 480 * 0.124, 46.5)).toBe(46.5);
  });

  it('держит брейкпоинт низкого экрана вместе с CSS', () => {
    expect(SHORT_SCREEN_HEIGHT).toBe(700);
  });

  it('сохраняет цвета из :root веб-версии в тёмной палитре', () => {
    expect(darkColors.background).toBe('#000');
    expect(darkColors.card).toBe('#1c1c1e');
    expect(darkColors.control).toBe('#2c2c2e');
    expect(darkColors.activeYellow).toBe('#c48a00');
    expect(radii.card).toBe(31.5);
  });

  it('описывает светлую палитру теми же ключами, что и тёмную', () => {
    expect(Object.keys(lightColors).sort()).toEqual(Object.keys(darkColors).sort());
  });

  it('разводит фон и текст между палитрами', () => {
    expect(lightColors.background).not.toBe(darkColors.background);
    expect(lightColors.text).not.toBe(darkColors.text);
  });
});
