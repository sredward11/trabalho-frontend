import { useState, useEffect } from 'react';
import CardLista from '../components/CardLista';
import { buscarEstatisticas, listarLeituras } from '../service/leituraService';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [extraStats, setExtraStats] = useState(null);

  useEffect(() => {
    buscarEstatisticas().then(setStats).catch(console.error);
    listarLeituras()
      .then((leituras) => {
        if (Array.isArray(leituras)) {
          setExtraStats({
            lendo: leituras.filter(l => l.status === 'lendo').length,
            abandonado: leituras.filter(l => l.status === 'abandonado').length,
            planejando: leituras.filter(l => l.status === 'planejando').length,
          });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold text-[#5c4033] mb-1">Dashboard</h2>
      <p className="text-[#8d6e63] mb-6">Resumo das suas leituras</p>

      {(!stats || !extraStats) && <p className="text-[#8d6e63]">Carregando estatísticas...</p>}

      {(stats && extraStats) && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <CardLista titulo="Concluídos" valor={stats.concluidos} />
            <CardLista titulo="Planejando" valor={extraStats.planejando} />
            <CardLista titulo="Lendo" valor={extraStats.lendo} />
            <CardLista titulo="Abandonado" valor={extraStats.abandonado} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CardLista titulo="Total de Leituras" valor={stats.totalLeituras} destaque={true} />
            <CardLista
              titulo="Média de Notas"
              valor={
                stats.mediaNotas !== null && stats.mediaNotas !== undefined
                  ? stats.mediaNotas.toFixed(1)
                  : '—'
              }
              destaque={true}
            />
            <CardLista titulo="Páginas Lidas" valor={stats.totalPaginasLidos} destaque={true} />
          </div>
        </>
      )}
    </section>
  );
}

export default Dashboard;