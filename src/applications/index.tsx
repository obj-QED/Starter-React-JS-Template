import { lazy, Suspense } from 'react';

import { LoadingSpinner } from '@/components';
import { themeConfig } from '@/config/theme';

// Импортируем вариации приложений
import DefaultApp from './default';
import StyledComponentsApp from './styled-components';

// Lazy loading для Mantine приложения
const MantineApp = lazy(() => import('./mantine'));

// Выбираем вариацию на основе настроек
const App = () => {
  const { useMantineTheme, useStyledComponents } = themeConfig;

  // Если включена Mantine тема, используем Mantine приложение с Suspense
  if (useMantineTheme) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <MantineApp />
      </Suspense>
    );
  }

  // Если включены styled-components, используем Styled Components приложение
  if (useStyledComponents) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <StyledComponentsApp />
      </Suspense>
    );
  }

  // По умолчанию используем простое приложение
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DefaultApp />
    </Suspense>
  );
};

export default App;
