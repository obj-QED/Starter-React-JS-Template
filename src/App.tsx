import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navigation from './components/Navigation/page';
import Home from './pages/Home/page';
import CodingSession from './pages/CodingSession/page';
import { theme } from './utils/generate-styled-theme';
import LoadingSpinner from './components/LoadingSpinner';

const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

const App: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <ThemeProvider theme={theme}>
      <Router future={router.future}>
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title order={1}>React App</Title>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <Navigation />
          </AppShell.Navbar>

          <AppShell.Main>
            <React.Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/code" element={<CodingSession />} />
              </Routes>
            </React.Suspense>
          </AppShell.Main>
        </AppShell>
      </Router>
    </ThemeProvider>
  );
};

export default App;
