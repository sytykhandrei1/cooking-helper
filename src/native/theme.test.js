import { describe, expect, it } from 'vitest';
import { SHORT_SCREEN_HEIGHT, clamp, colors, radii } from './theme';

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

  it('сохраняет цвета из :root веб-версии', () => {
    expect(colors.black).toBe('#000');
    expect(colors.card).toBe('#1c1c1e');
    expect(colors.control).toBe('#2c2c2e');
    expect(colors.activeYellow).toBe('#c48a00');
    expect(radii.card).toBe(31.5);
  });
});
