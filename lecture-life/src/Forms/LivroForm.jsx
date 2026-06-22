import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { cadastrarLivro } from '../service/livroService';

function LivroForm() {
  const [sucesso, setSucesso] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(dados) {
    setErroGeral('');

    try {
      await cadastrarLivro(dados);
      setSucesso('Livro cadastrado com sucesso!');
      reset();
      setTimeout(() => setSucesso(''), 3000);
    } catch (err) {
      setErroGeral('Erro ao cadastrar livro. Tente novamente.');
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#5c4033]">Cadastrar Novo Livro</h2>
        <button
          type="button"
          onClick={() => navigate('/livros')}
          className="text-[#8d6e63] hover:text-[#5c4033] font-medium transition"
        >
          ← Voltar
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-2xl bg-white p-6 rounded-lg border border-[#d7ccc8]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="titulo" className="font-semibold text-[#5c4033]">
            Título *
          </label>
          <input
            id="titulo"
            type="text"
            {...register('titulo', { required: 'Título é obrigatório.' })}
            className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
          />
          {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="autor" className="font-semibold text-[#5c4033]">
            Autor
          </label>
          <input
            id="autor"
            type="text"
            {...register('autor')}
            className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="anoPublicacao" className="font-semibold text-[#5c4033]">
            Ano de Publicação
          </label>
          <input
            id="anoPublicacao"
            type="number"
            {...register('anoPublicacao', { valueAsNumber: true })}
            className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="categoria" className="font-semibold text-[#5c4033]">
            Categoria
          </label>
          <select
            id="categoria"
            {...register('categoria')}
            className="border border-[#d7ccc8] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
          >
            <option value="">Selecione...</option>
            <option value="Romance">Romance</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Ficção">Ficção</option>
            <option value="Biografia">Biografia</option>
            <option value="Acadêmico">Acadêmico</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="paginasTotal" className="font-semibold text-[#5c4033]">
            Total de Páginas
          </label>
          <input
            id="paginasTotal"
            type="number"
            {...register('paginasTotal', {
              valueAsNumber: true,
              min: { value: 1, message: 'Deve ser maior que zero.' },
            })}
            className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
          />
          {errors.paginasTotal && <span className="text-red-500 text-sm">{errors.paginasTotal.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="sinopse" className="font-semibold text-[#5c4033]">
            Sinopse
          </label>
          <textarea
            id="sinopse"
            {...register('sinopse')}
            rows={4}
            className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63] resize-none"
          />
        </div>

        {sucesso && <span className="text-green-600 font-medium text-center">{sucesso}</span>}
        {erroGeral && <span className="text-red-500 text-sm text-center">{erroGeral}</span>}

        <button
          type="submit"
          className="bg-[#5c4033] text-white font-bold py-3 px-6 rounded-md hover:bg-[#3e2723] transition"
        >
          Salvar Livro
        </button>
      </form>
    </section>
  );
}

export default LivroForm;