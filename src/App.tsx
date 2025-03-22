import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation/page';
import CodingSession from './pages/CodingSession/page';
import Home from './pages/Home/page';
import { Layout } from 'antd';
import { theme } from '@/style/theme/styled-theme';

const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout className="layout">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/code" element={<CodingSession />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
