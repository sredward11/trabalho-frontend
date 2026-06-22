function CardLista({ titulo, valor, destaque }) {
  return (
    <div className={`bg-white border border-[#d7ccc8] rounded-lg p-5 flex flex-col gap-2 ${destaque ? 'py-8 items-center justify-center' : ''}`}>
      <span className={`text-[#8d6e63] font-medium ${destaque ? 'text-lg' : 'text-sm'}`}>{titulo}</span>
      <span className={`text-[#5c4033] font-bold ${destaque ? 'text-5xl' : 'text-3xl'}`}>{valor}</span>
    </div>
  );
}

export default CardLista;