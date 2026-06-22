function Tabela({ headers, data }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#d7ccc8] max-w-5xl">
      <table className="w-full text-left bg-white">
        <thead className="bg-[#5c4033] text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3 font-semibold text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((linha, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-white' : 'bg-[#f5f0eb]'}
            >
              {Object.values(linha).map((valor, i) => (
                <td
                  key={i}
                  className="px-4 py-3 text-[#303030] text-sm border-t border-[#d7ccc8]"
                >
                  {valor}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;
