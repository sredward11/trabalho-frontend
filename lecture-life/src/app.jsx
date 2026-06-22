import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Livros from './pages/Livros';
import Leituras from './pages/Leituras';
import LivroForm from './Forms/LivroForm';
import LeituraForm from './Forms/LeituraForm';

function App() {
  const { autenticado } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!autenticado ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/cadastro"
        element={!autenticado ? <Cadastro /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={autenticado ? <Layout /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="livros" element={<Livros />} />
        <Route path="livros/novo" element={<LivroForm />} />
        <Route path="leituras" element={<Leituras />} />
        <Route path="leituras/nova" element={<LeituraForm />} />
      </Route>
      <Route path="*" element={<Navigate to={autenticado ? '/' : '/login'} />} />
    </Routes>
  );
}

export default App;