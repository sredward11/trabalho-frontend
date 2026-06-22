import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Cadastro() {
  const [erroGeral, setErroGeral] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const senha = watch('senha');

  const onSubmit = async (dados) => {
    setErroGeral('');
    const { nome, email, senha } = dados;

    try {
      const resposta = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setErroGeral(data.message || 'Erro ao criar usuário.');
        return;
      }

      navigate('/login', { state: { mensagemSucesso: 'Usuário criado com sucesso. Faça login para continuar.' } });
    } catch (err) {
      setErroGeral('Não foi possível conectar ao servidor.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0eb] font-sans">
      <div className="bg-white p-8 rounded-lg border border-[#d7ccc8] w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl mb-2">📚</span>
          <h1 className="font-bold text-3xl text-[#5c4033]">LectureLife</h1>
          <p className="text-[#8d6e63] mt-1">Crie sua conta para começar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[#5c4033] font-semibold">Nome</label>
            <input
              type="text"
              {...register('nome', { required: 'O campo de nome é obrigatório.' })}
              className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              placeholder="Seu nome"
            />
            {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#5c4033] font-semibold">E-mail</label>
            <input
              type="email"
              {...register('email', {
                required: 'O campo de e-mail é obrigatório.',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Formato de e-mail inválido.' },
              })}
              className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              placeholder="seu@email.com"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#5c4033] font-semibold">Senha</label>
            <input
              type="password"
              {...register('senha', {
                required: 'O campo de senha é obrigatório.',
                minLength: { value: 6, message: 'A senha deve ter no mínimo 6 caracteres.' },
              })}
              className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              placeholder="••••••"
            />
            {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#5c4033] font-semibold">Confirmar senha</label>
            <input
              type="password"
              {...register('confirmarSenha', {
                required: 'A confirmação de senha é obrigatória.',
                validate: (value) => value === senha || 'As senhas não coincidem.',
              })}
              className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              placeholder="••••••"
            />
            {errors.confirmarSenha && <span className="text-red-500 text-sm">{errors.confirmarSenha.message}</span>}
          </div>

          {erroGeral && <p className="text-red-500 text-sm text-center mt-2">{erroGeral}</p>}

          <button
            type="submit"
            className="mt-4 bg-[#5c4033] text-white font-bold py-3 rounded-md hover:bg-[#3e2723] transition"
          >
            Criar conta
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-[#8d6e63] font-medium hover:text-[#5c4033] transition">
            Já tenho usuário
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-sm text-[#8d6e63]">
        © 2026 LectureLife. Todos os direitos reservados.
      </footer>
    </div>
  );
}