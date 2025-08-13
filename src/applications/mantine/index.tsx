import React, { memo } from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AppShell, Burger, Group, MantineProvider, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';

import { ThemeProvider } from 'styled-components';

import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';
import { lightTheme } from '@/config/mantine-theme';
import { themeConfig } from '@/config/theme';
import CodingSession from '@/pages/CodingSession/page';
import Home from '@/pages/Home/page';
import { theme as styledTheme } from '@/utils/generate-styled-theme';

// Импортируем Mantine стили
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

const App: React.FC = memo(() => {
  const { useStyledComponents } = themeConfig;
  const [opened, { toggle }] = useDisclosure(false);

  const content = (
    <Router future={router.future}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding='md'
      >
        <AppShell.Header>
          <Group h='100%' px='md'>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom='sm'
              size='sm'
            />
            <Title
              order={1}
              style={{
                color: '#1aa1e0',
              }}
            >
              React App (Mantine{useStyledComponents ? ' + Styled' : ''})
            </Title>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p='md'>
          <Navigation />
        </AppShell.Navbar>

        <AppShell.Main>
          <React.Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/code' element={<CodingSession />} />
            </Routes>
          </React.Suspense>
        </AppShell.Main>
      </AppShell>
    </Router>
  );

  // Если styled-components включены, оборачиваем в ThemeProvider
  if (useStyledComponents) {
    return (
      <MantineProvider theme={lightTheme}>
        <Notifications />
        <ThemeProvider theme={styledTheme}>{content}</ThemeProvider>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider theme={lightTheme}>
      <Notifications />
      {content}
    </MantineProvider>
  );
});

export default App;
