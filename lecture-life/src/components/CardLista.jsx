function CardLista({ titulo, valor }) {
  return (
    <div className="bg-white border border-[#d7ccc8] rounded-lg p-5 flex flex-col gap-2">
      <span className="text-[#8d6e63] text-sm font-medium">{titulo}</span>
      <span className="text-[#5c4033] text-3xl font-bold">{valor}</span>
    </div>
  );
}

export default CardLista;