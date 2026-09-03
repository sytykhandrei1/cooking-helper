import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { darkColors, lightColors } from './theme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children, initialScheme = 'dark' }) => {
  const [scheme, setScheme] = useState(initialScheme);

  const toggleScheme = useCallback(() => {
    setScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({
    scheme,
    isDark: scheme === 'dark',
    colors: scheme === 'dark' ? darkColors : lightColors,
    toggleScheme,
  }), [scheme, toggleScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme вызван вне ThemeProvider');
  return value;
};

// Пересобирает StyleSheet только при смене палитры.
export const useThemedStyles = (factory) => {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [factory, colors]);
};
