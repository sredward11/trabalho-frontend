import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabela from '../components/Tabela';
import { listarLeituras } from '../service/leituraService';

function Leituras() {
  const [leituras, setLeituras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    listarLeituras()
      .then((dados) => {
        setLeituras(Array.isArray(dados) ? dados : []);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, []);

  const headers = ['Livro', 'Status', 'Páginas Lidas', 'Favorito'];

  const statusLabels = {
    planejando: 'Planejando',
    lendo: 'Lendo',
    concluido: 'Concluído',
    abandonado: 'Abandonado',
  };

  const data = leituras.map((leitura) => ({
    livro: leitura.book?.titulo || '—',
    status: statusLabels[leitura.status] || leitura.status,
    paginasLidas: leitura.paginasLidas ?? '—',
    favorito: leitura.favorito ? '⭐' : '—',
  }));

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#5c4033]">Leituras</h2>
        <button
          className="bg-[#5c4033] text-white font-bold py-2 px-4 rounded-md hover:bg-[#3e2723] transition"
          onClick={() => navigate('/leituras/nova')}
        >
          + Nova Leitura
        </button>
      </div>

      {carregando && <p className="text-[#8d6e63]">Carregando leituras...</p>}
      {!carregando && leituras.length === 0 && (
        <p className="text-[#8d6e63]">Nenhuma leitura registrada ainda.</p>
      )}
      {!carregando && leituras.length > 0 && <Tabela headers={headers} data={data} />}
    </section>
  );
}

export default Leituras;