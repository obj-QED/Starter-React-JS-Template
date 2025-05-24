import React, { JSX, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation/page';
import { Layout } from 'antd';
import { theme } from '@/style/theme/styled-theme';
import LoadingSpinner from '@/components/LoadingSpinner';

// Ленивая загрузка страниц
const Home = React.lazy(() => import('./pages/Home/page'));

const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout className="layout">
          <Navigation />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
