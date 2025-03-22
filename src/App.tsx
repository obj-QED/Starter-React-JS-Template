import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/page';
import CodingSession from './pages/CodingSession/page';
import Home from './pages/Home/page';
import { Layout } from 'antd';

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<CodingSession />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
