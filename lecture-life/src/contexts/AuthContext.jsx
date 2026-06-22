import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(null);

  function login(dadosUsuario, token) {
    localStorage.setItem('token', token);
    setUsuario(dadosUsuario);
    setAutenticado(true);
  }

  function logout() {
    localStorage.removeItem('token');
    setUsuario(null);
    setAutenticado(false);
  }

  return (
    <AuthContext.Provider value={{ autenticado, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}