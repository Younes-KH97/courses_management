import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Teachers from './pages/Teachers';
import Courses from './pages/Courses';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route  path="/" element={<Dashboard />} />
          <Route  path="/dashboard" element={<Dashboard />} />
          <Route  path="/teachers" element={<Teachers />} />
          <Route  path="/courses" element={<Courses />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
