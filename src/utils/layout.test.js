import { describe, expect, it } from 'vitest';
import { isMobileViewport, MOBILE_BREAKPOINT, MOBILE_MEDIA_QUERY } from './layout';

describe('responsive layout', () => {
  it('uses the new interface through the mobile breakpoint', () => {
    expect(isMobileViewport(320)).toBe(true);
    expect(isMobileViewport(MOBILE_BREAKPOINT)).toBe(true);
  });

  it('uses the legacy interface above the mobile breakpoint', () => {
    expect(isMobileViewport(MOBILE_BREAKPOINT + 1)).toBe(false);
    expect(isMobileViewport(1440)).toBe(false);
  });

  it('keeps the JavaScript and CSS breakpoint aligned', () => {
    expect(MOBILE_MEDIA_QUERY).toBe('(max-width: 768px)');
  });
});
