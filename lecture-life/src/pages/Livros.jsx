import { useNavigate } from 'react-router-dom';

function Livros() {
  const navigate = useNavigate();

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
      <p className="text-[#8d6e63]">Listagem em breve...</p>
    </section>
  );
}

export default Livros;