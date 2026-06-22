import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FormLogin from '../components/FormLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mensagemSucesso = location.state?.mensagemSucesso || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErro('');
    setSenhaErro('');
    setErroGeral('');

    let formularioValido = true;

    if (!email) {
      setEmailErro('O campo de e-mail é obrigatório.');
      formularioValido = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErro('Formato de e-mail inválido.');
      formularioValido = false;
    }

    if (!senha) {
      setSenhaErro('O campo de senha é obrigatório.');
      formularioValido = false;
    } else if (senha.length < 6) {
      setSenhaErro('A senha deve ter no mínimo 6 caracteres.');
      formularioValido = false;
    }

    if (!formularioValido) return;

    try {
      const resposta = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErroGeral(dados.message || 'E-mail ou senha incorretos.');
        return;
      }

      login(dados.user, dados.token);
      navigate('/');
    } catch (err) {
      setErroGeral('Não foi possível conectar ao servidor.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0eb] font-sans">
      <div className="bg-white p-8 rounded-lg border border-[#d7ccc8] w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-8">
          <span className="text-5xl mb-2">📚</span>
          <h1 className="font-bold text-3xl text-[#5c4033]">LectureLife</h1>
          <p className="text-[#8d6e63] mt-1">Faça login para continuar</p>
        </div>

        {mensagemSucesso && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center text-sm font-medium">
            {mensagemSucesso}
          </div>
        )}

        <FormLogin
          email={email}
          senha={senha}
          emailErro={emailErro}
          senhaErro={senhaErro}
          erroGeral={erroGeral}
          aoMudarEmail={(e) => setEmail(e.target.value)}
          aoMudarSenha={(e) => setSenha(e.target.value)}
          aoSubmeter={handleSubmit}
        />

        <div className="mt-6 text-center">
          <Link to="/cadastro" className="text-[#8d6e63] font-medium hover:text-[#5c4033] transition">
            Criar usuário
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-sm text-[#8d6e63]">
        © 2026 LectureLife. Todos os direitos reservados.
      </footer>
    </div>
  );
}