import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Livros from './pages/Livros';
import Leituras from './pages/Leituras';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="livros" element={<Livros />} />
        <Route path="leituras" element={<Leituras />} />
      </Route>
    </Routes>
  );
}

export default App;