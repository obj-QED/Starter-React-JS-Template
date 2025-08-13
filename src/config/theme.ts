import { useEffect, useState } from 'react';

import { theme as styledTheme } from '@/utils/generate-styled-theme';

// Конфигурация темы
export const themeConfig = {
  // Настройка из переменных окружения
  useMantineTheme: import.meta.env.VITE_USE_MANTINE_THEME === 'true' || false,
  useStyledComponents:
    import.meta.env.VITE_USE_STYLED_COMPONENTS === 'true' || false,

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

// Функция для получения активной темы
export const getActiveTheme = () => {
  return themeConfig.useMantineTheme ? styledTheme : styledTheme;
};

// Хук для управления темами без Mantine Provider
export function useSimpleTheme() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'auto'>(
    'light'
  );

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
    setCurrentTheme(theme);

    // Применяем тему к body
    if (typeof document !== 'undefined') {
      if (
        theme === 'dark' ||
        (theme === 'auto' && getSystemTheme() === 'dark')
      ) {
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
    const savedTheme = localStorage.getItem(
      `${themeConfig.localStorage.prefix}${themeConfig.localStorage.themeKey}`
    );
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark' | 'auto');
    } else {
      setTheme('auto');
    }
  }, []);

  // Сохраняем тему в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(
      `${themeConfig.localStorage.prefix}${themeConfig.localStorage.themeKey}`,
      currentTheme
    );
  }, [currentTheme]);

  return {
    isDark:
      currentTheme === 'dark' ||
      (currentTheme === 'auto' && getSystemTheme() === 'dark'),
    toggleTheme,
    setTheme,
    currentTheme,
    config: themeConfig,
  };
}

// Основной хук для управления темами
export function useTheme() {
  if (themeConfig.useMantineTheme) {
    // Динамический импорт Mantine хука
    const [MantineHook, setMantineHook] = useState<any>(null);

    useEffect(() => {
      import('./mantine-theme').then(({ useMantineTheme }) => {
        setMantineHook(() => useMantineTheme);
      });
    }, []);

    if (MantineHook) {
      return MantineHook();
    }

    // Fallback к простой теме пока Mantine загружается
    return useSimpleTheme();
  }

  return useSimpleTheme();
}
