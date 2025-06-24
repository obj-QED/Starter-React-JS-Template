import { createTheme, MantineColorsTuple, MantineColorShade } from '@mantine/core';
import { theme as styledTheme } from '@/utils/generate-styled-theme';
import { useMantineColorScheme } from '@mantine/core';
import { useState, useEffect } from 'react';

// Конфигурация темы
export const themeConfig = {
  // Настройка из переменных окружения
  useMantineTheme: import.meta.env.VITE_USE_MANTINE_THEME === 'true',
  
  // Настройки приложения
  app: {
    name: 'ReactJS Starter',
    version: '1.0.0',
    description: 'ReactJS Starter',
  },
  
  // Настройки API
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 5000,
  },
  
  // Настройки пагинации
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  },
  
  // Настройки localStorage
  localStorage: {
    prefix: 'react-js_',
    tokenKey: 'token',
    themeKey: 'theme',
    languageKey: 'language',
  },
} as const;

// Определяем цвета
const colors: Record<string, MantineColorsTuple> = {
  blue: ['#E3F2FF', '#B9E0FF', '#8CCDFF', '#5FBAFF', '#32A7FF', '#1AA1E0', '#0080CC', '#006699', '#004D66', '#003333'],
  gray: ['#F5F5F5', '#E8E8E8', '#D9D9D9', '#BFBFBF', '#8C8C8C', '#595959', '#434343', '#262626', '#1F1F1F', '#141414'],
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
    spacing: Object.fromEntries(Object.entries(styledTheme.spacing).map(([key]) => [key, `var(--spacing-${key})`])),
  }),
  ...(styledTheme.shadows && {
    shadows: Object.fromEntries(Object.entries(styledTheme.shadows).map(([key]) => [key, `var(--shadow-${key})`])),
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
  white: '#141414',
  black: '#FFFFFF',
  defaultGradient: {
    from: 'blue.6',
    to: 'blue.8',
    deg: 45,
  },
});

// Экспортируем основную тему (по умолчанию светлая)
export const theme = lightTheme;

// Функция для получения цвета заголовка в зависимости от настроек
export const getTitleColor = () => {
  if (themeConfig.useMantineTheme) {
    return theme.colors?.gray?.[9] || '#141414';
  }
  return styledTheme.colors?.primary || '#1aa1e0';
};

// Функция для получения активной темы
export const getActiveTheme = () => {
  return themeConfig.useMantineTheme ? theme : styledTheme;
};

// Хук для управления темами без Mantine Provider
export function useSimpleTheme() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'auto'>('light');

  // Функция для определения системной темы
  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Функция для установки темы
  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    setCurrentTheme(theme);
    
    // Применяем тему к body
    if (typeof document !== 'undefined') {
      if (theme === 'dark' || (theme === 'auto' && getSystemTheme() === 'dark')) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
    }
  };

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  // Инициализация темы при загрузке
  useEffect(() => {
    const savedTheme = localStorage.getItem(`${themeConfig.localStorage.prefix}${themeConfig.localStorage.themeKey}`);
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark' | 'auto');
    } else {
      setTheme('auto');
    }
  }, []);

  // Сохраняем тему в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(`${themeConfig.localStorage.prefix}${themeConfig.localStorage.themeKey}`, currentTheme);
  }, [currentTheme]);

  return {
    isDark: currentTheme === 'dark' || (currentTheme === 'auto' && getSystemTheme() === 'dark'),
    toggleTheme,
    setTheme,
    currentTheme,
    config: themeConfig,
  };
}

// Хук для управления темами с Mantine Provider
export function useMantineTheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useMantineColorScheme();

  // Функция для определения системной темы
  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
    config: themeConfig,
  };
}

// Основной хук для управления темами
export function useTheme() {
  if (themeConfig.useMantineTheme) {
    return useMantineTheme();
  }
  return useSimpleTheme();
}
