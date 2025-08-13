import type { MantineColorShade, MantineColorsTuple } from '@mantine/core';
import { createTheme, useMantineColorScheme } from '@mantine/core';

import { theme as styledTheme } from '@/utils/generate-styled-theme';

// Определяем цвета
const colors: Record<string, MantineColorsTuple> = {
  blue: [
    '#E3F2FF',
    '#B9E0FF',
    '#8CCDFF',
    '#5FBAFF',
    '#32A7FF',
    '#1AA1E0',
    '#0080CC',
    '#006699',
    '#004D66',
    '#003333',
  ],
  gray: [
    '#F5F5F5',
    '#E8E8E8',
    '#D9D9D9',
    '#BFBFBF',
    '#8C8C8C',
    '#595959',
    '#434343',
    '#262626',
    '#1F1F1F',
    '#141414',
  ],
};

// Базовые настройки темы
const baseTheme = {
  primaryShade: 6 as MantineColorShade,
  ...(styledTheme.typography.fontFamily && {
    fontFamily: 'var(--font-primary)',
  }),
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  colors,
  ...(styledTheme.spacing && {
    spacing: Object.fromEntries(
      Object.entries(styledTheme.spacing).map(([key]) => [
        key,
        `var(--spacing-${key})`,
      ])
    ),
  }),
  ...(styledTheme.shadows && {
    shadows: Object.fromEntries(
      Object.entries(styledTheme.shadows).map(([key]) => [
        key,
        `var(--shadow-${key})`,
      ])
    ),
  }),
  transitionTimingFunction: 'ease',
  transitionDuration: '200ms',
  respectReducedMotion: true,
  cursorType: 'pointer' as const,
  focusRing: 'auto' as const,
};

// Светлая тема
export const lightTheme = createTheme({
  ...baseTheme,
  white: '#FFFFFF',
  black: '#141414',
  defaultGradient: {
    from: 'blue.4',
    to: 'blue.6',
    deg: 45,
  },
});

// Темная тема
export const darkTheme = createTheme({
  ...baseTheme,
  white: '#FFFFFF',
  black: '#141414',
  defaultGradient: {
    from: 'blue.4',
    to: 'blue.6',
    deg: 45,
  },
});

// Хук для управления темами с Mantine Provider
export function useMantineTheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useMantineColorScheme();

  // Функция для определения системной темы
  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  };

  // Функция для установки темы
  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    if (theme === 'auto') {
      setColorScheme(getSystemTheme());
    } else {
      setColorScheme(theme);
    }
  };

  return {
    isDark: colorScheme === 'dark',
    toggleTheme: toggleColorScheme,
    setTheme,
    currentTheme: colorScheme,
  };
}
