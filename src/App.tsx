import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation/page';
import Home from './pages/Home/page';
import CodingSession from './pages/CodingSession/page';
import { theme as styledTheme } from './utils/generate-styled-theme';
import { getTitleColor, themeConfig } from './config/theme';
import LoadingSpinner from './components/LoadingSpinner';
import { ThemeToggle } from './elements/ThemeToggle/ThemeToggle';

const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

const App: React.FC = () => {
  // Получаем цвет заголовка
  const titleColor = getTitleColor();

  // Если Mantine тема отключена, используем простой layout
  if (!themeConfig.useMantineTheme) {
    return (
      <ThemeProvider theme={styledTheme}>
        <Router future={router.future}>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ 
              height: 60, 
              padding: '0 1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <h1 style={{ color: titleColor, margin: 0 }}>React App</h1>
              <ThemeToggle />
            </header>
            
            <div style={{ display: 'flex', flex: 1 }}>
              <nav style={{ 
                width: 300, 
                padding: '1rem',
                borderRight: '1px solid #e0e0e0'
              }}>
                <Navigation />
              </nav>
              
              <main style={{ flex: 1, padding: '1rem' }}>
                <React.Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/code" element={<CodingSession />} />
                  </Routes>
                </React.Suspense>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    );
  }

  // Если Mantine тема включена, импортируем и используем Mantine компоненты
  const MantineApp = () => {
    const { AppShell, Burger, Group, Title } = require('@mantine/core');
    const { useDisclosure } = require('@mantine/hooks');
    
    const [opened, { toggle }] = useDisclosure();

    return (
      <ThemeProvider theme={styledTheme}>
        <Router future={router.future}>
          <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }} padding="md">
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Title
                  order={1}
                  style={{
                    color: titleColor,
                  }}
                >
                  React App
                </Title>
                <ThemeToggle />
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

  return <MantineApp />;
};

export default App;
