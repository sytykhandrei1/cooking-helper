import { useSyncExternalStore } from 'react';

export const MOBILE_BREAKPOINT = 768;
export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`;

export const isMobileViewport = (width) => width <= MOBILE_BREAKPOINT;

const getMobileSnapshot = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
};

const subscribeToMobileViewport = (onChange) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};

  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }

  mediaQuery.addListener(onChange);
  return () => mediaQuery.removeListener(onChange);
};

export const useMobileLayout = () => useSyncExternalStore(
  subscribeToMobileViewport,
  getMobileSnapshot,
  () => false,
);
