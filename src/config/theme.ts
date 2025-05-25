import { createTheme, MantineColorsTuple } from '@mantine/core';
import { theme as styledTheme } from '@/utils/generate-styled-theme';

// Определяем цвета
const colors: Record<string, MantineColorsTuple> = {
  blue: ['#E3F2FF', '#B9E0FF', '#8CCDFF', '#5FBAFF', '#32A7FF', '#1AA1E0', '#0080CC', '#006699', '#004D66', '#003333'],
  gray: ['#F5F5F5', '#E8E8E8', '#D9D9D9', '#BFBFBF', '#8C8C8C', '#595959', '#434343', '#262626', '#1F1F1F', '#141414'],
};

// Создаем тему
export const theme = createTheme({
  // Основные настройки
  primaryColor: 'blue',
  primaryShade: 6,
  ...(styledTheme.typography.fontFamily && {
    fontFamily: 'var(--font-primary)',
  }),
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  // Цвета
  colors,

  // Размеры
  defaultRadius: 'var(--radius-sm)',
  radius: {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
  },

  ...(styledTheme.spacing && {
    spacing: Object.fromEntries(Object.entries(styledTheme.spacing).map(([key]) => [key, `var(--spacing-${key})`])),
  }),

  ...(styledTheme.shadows && {
    shadows: Object.fromEntries(Object.entries(styledTheme.shadows).map(([key]) => [key, `var(--shadow-${key})`])),
  }),

  // Переходы
  transitionTimingFunction: 'ease',
  transitionDuration: '200ms',

  // Другие настройки
  respectReducedMotion: true,
  cursorType: 'pointer',
  focusRing: 'auto',
});
