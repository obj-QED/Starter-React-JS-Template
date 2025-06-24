import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { theme } from '@/config/theme';

// Наши стили
import '@/assets/scss/index.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Проверяем, нужно ли использовать Mantine тему
const useMantineTheme = import.meta.env.VITE_USE_MANTINE_THEME === 'true';

// Загружаем стили Mantine только если тема включена
if (useMantineTheme) {
  import('@mantine/core/styles.css');
  import('@mantine/notifications/styles.css');
}

const AppWrapper = () => {
  if (useMantineTheme) {
    return (
      <MantineProvider theme={theme}>
        <Notifications />
        <App />
      </MantineProvider>
    );
  }
  
  return <App />;
};

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
    </QueryClientProvider>
  </React.StrictMode>
);
