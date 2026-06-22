import { useState, useEffect } from 'react';
import CardLista from '../components/CardLista';
import { buscarEstatisticas } from '../service/leituraService';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    buscarEstatisticas().then(setStats).catch(console.error);
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold text-[#5c4033] mb-1">Dashboard</h2>
      <p className="text-[#8d6e63] mb-6">Resumo das suas leituras</p>

      {!stats && <p className="text-[#8d6e63]">Carregando estatísticas...</p>}

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardLista titulo="Total de Leituras" valor={stats.totalLeituras} />
          <CardLista titulo="Concluídos" valor={stats.concluidos} />
          <CardLista titulo="Páginas Lidas" valor={stats.totalPaginasLidos} />
          <CardLista
            titulo="Média de Notas"
            valor={
              stats.mediaNotas !== null && stats.mediaNotas !== undefined
                ? stats.mediaNotas.toFixed(1)
                : '—'
            }
          />
        </div>
      )}
    </section>
  );
}

export default Dashboard;