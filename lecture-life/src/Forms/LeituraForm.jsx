import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { cadastrarLeitura } from '../service/leituraService';
import { listarLivros } from '../service/livroService';

function LeituraForm() {
  const [livros, setLivros] = useState([]);
  const [sucesso, setSucesso] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const statusSelecionado = watch('status');
  const livroSelecionadoId = watch('bookId');

  useEffect(() => {
    listarLivros()
      .then((dados) => setLivros(Array.isArray(dados) ? dados : []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (statusSelecionado === 'concluido' && livroSelecionadoId) {
      const livro = livros.find((l) => (l._id || l.id) === livroSelecionadoId);
      if (livro && livro.paginasTotal) {
        setValue('paginasLidas', livro.paginasTotal);
      }
    }
  }, [statusSelecionado, livroSelecionadoId, livros, setValue]);

  async function onSubmit(dados) {
    setErroGeral('');

    // Micro-ajuste: remover datas e nota se não estiver "Concluído"
    if (dados.status !== 'concluido') {
      delete dados.dataInicio;
      delete dados.dataFim;
      delete dados.nota;
    }

    try {
      await cadastrarLeitura(dados);
      setSucesso('Leitura cadastrada com sucesso!');
      reset();
      setTimeout(() => setSucesso(''), 3000);
    } catch (err) {
      setErroGeral('Erro ao cadastrar leitura. Tente novamente.');
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#5c4033]">Nova Leitura</h2>
        <button
          type="button"
          onClick={() => navigate('/leituras')}
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
          <label htmlFor="bookId" className="font-semibold text-[#5c4033]">
            Livro *
          </label>
          <select
            id="bookId"
            {...register('bookId', { required: 'Selecione um livro.' })}
            className="border border-[#d7ccc8] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
          >
            <option value="">Selecione...</option>
            {livros.map((livro) => (
              <option key={livro._id || livro.id} value={livro._id || livro.id}>
                {livro.titulo}
              </option>
            ))}
          </select>
          {errors.bookId && <span className="text-red-500 text-sm">{errors.bookId.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="font-semibold text-[#5c4033]">
            Status *
          </label>
          <select
            id="status"
            {...register('status', { required: 'Selecione um status.' })}
            className="border border-[#d7ccc8] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
          >
            <option value="">Selecione...</option>
            <option value="planejando">Planejando</option>
            <option value="lendo">Lendo</option>
            <option value="concluido">Concluído</option>
            <option value="abandonado">Abandonado</option>
          </select>
          {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="paginasLidas" className="font-semibold text-[#5c4033]">
            Páginas Lidas
          </label>
          <input
            id="paginasLidas"
            type="number"
            {...register('paginasLidas', { valueAsNumber: true, min: 0 })}
            className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
          />
        </div>

        {statusSelecionado === 'concluido' && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="dataInicio" className="font-semibold text-[#5c4033]">
                Data de Início *
              </label>
              <input
                id="dataInicio"
                type="date"
                {...register('dataInicio', { required: 'Informe a data de início.' })}
                className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              />
              {errors.dataInicio && <span className="text-red-500 text-sm">{errors.dataInicio.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="dataFim" className="font-semibold text-[#5c4033]">
                Data de Conclusão *
              </label>
              <input
                id="dataFim"
                type="date"
                {...register('dataFim', { required: 'Informe a data de conclusão.' })}
                className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              />
              {errors.dataFim && <span className="text-red-500 text-sm">{errors.dataFim.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="nota" className="font-semibold text-[#5c4033]">
                Nota *
              </label>
              <input
                id="nota"
                type="number"
                {...register('nota', { 
                  required: 'Informe uma nota.',
                  valueAsNumber: true, 
                  min: { value: 0, message: 'A nota deve ser no mínimo 0.' }, 
                  max: { value: 10, message: 'A nota deve ser no máximo 10.' }
                })}
                className="border border-[#d7ccc8] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              />
              {errors.nota && <span className="text-red-500 text-sm">{errors.nota.message}</span>}
            </div>
          </>
        )}

        <div className="flex items-center gap-3">
          <input
            id="favorito"
            type="checkbox"
            {...register('favorito')}
            className="w-4 h-4 accent-[#5c4033]"
          />
          <label htmlFor="favorito" className="font-semibold text-[#5c4033]">
            Marcar como favorito
          </label>
        </div>

        {sucesso && <span className="text-green-600 font-medium text-center">{sucesso}</span>}
        {erroGeral && <span className="text-red-500 text-sm text-center">{erroGeral}</span>}

        <button
          type="submit"
          className="bg-[#5c4033] text-white font-bold py-3 px-6 rounded-md hover:bg-[#3e2723] transition"
        >
          Registrar Leitura
        </button>
      </form>
    </section>
  );
}

export default LeituraForm;