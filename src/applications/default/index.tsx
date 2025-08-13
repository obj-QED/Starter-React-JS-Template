import React, { memo, useMemo } from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';
import { themeConfig } from '@/config/theme';
import CodingSession from '@/pages/CodingSession/page';
import Home from '@/pages/Home/page';
import { theme as styledTheme } from '@/utils/generate-styled-theme';
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

const App: React.FC = memo(() => {
  const { useStyledComponents } = useMemo(() => themeConfig, []);

  const content = (
    <Router future={router.future}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header
          style={{
            height: 60,
            padding: '0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <h1 style={{ color: '#1aa1e0', margin: 0 }}>
            React App (Default + SCSS)
          </h1>
        </header>

        <div style={{ display: 'flex', flex: 1 }}>
          <nav
            style={{
              width: 300,
              padding: '1rem',
              borderRight: '1px solid #e0e0e0',
            }}
          >
            <Navigation />
          </nav>

          <main style={{ flex: 1, padding: '1rem' }}>
            <React.Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/code' element={<CodingSession />} />
              </Routes>
            </React.Suspense>
          </main>
        </div>
      </div>
    </Router>
  );

  // Если styled-components включены, оборачиваем в ThemeProvider
  if (useStyledComponents) {
    return <ThemeProvider theme={styledTheme}>{content}</ThemeProvider>;
  }

  return content;
});

export default App;
