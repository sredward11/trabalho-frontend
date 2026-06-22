import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabela from '../components/Tabela';
import { listarLivros } from '../service/livroService';

function Livros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    listarLivros()
      .then((dados) => {
        setLivros(Array.isArray(dados) ? dados : []);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, []);

  const headers = ['Título', 'Autor', 'Categoria', 'Ano', 'Páginas', 'Sinopse'];

  const data = livros.map((livro) => ({
    titulo: livro.titulo,
    autor: livro.autor || '—',
    categoria: livro.categoria || '—',
    anoPublicacao: livro.anoPublicacao || '—',
    paginasTotal: livro.paginasTotal || '—',
    sinopse: livro.sinopse || '—',
  }));

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#5c4033]">Livros</h2>
        <button
          className="bg-[#5c4033] text-white font-bold py-2 px-4 rounded-md hover:bg-[#3e2723] transition"
          onClick={() => navigate('/livros/novo')}
        >
          + Novo Livro
        </button>
      </div>

      {carregando && <p className="text-[#8d6e63]">Carregando livros...</p>}
      {!carregando && livros.length === 0 && (
        <p className="text-[#8d6e63]">Nenhum livro cadastrado ainda.</p>
      )}
      {!carregando && livros.length > 0 && <Tabela headers={headers} data={data} />}
    </section>
  );
}

export default Livros;