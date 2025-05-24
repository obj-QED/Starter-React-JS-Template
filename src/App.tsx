import React, { JSX, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import Navigation from '@/components/Navigation/page';
import LoadingSpinner from '@/components/LoadingSpinner';

// Ленивая загрузка страниц
const Home = React.lazy(() => import('@/pages/Home/page'));

const App: React.FC = (): JSX.Element => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Navigation />
        </AppShell.Header>

        <AppShell.Main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
};

export default App;
