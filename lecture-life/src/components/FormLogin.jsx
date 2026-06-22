function FormLogin({
  email,
  senha,
  emailErro,
  senhaErro,
  erroGeral,
  aoMudarEmail,
  aoMudarSenha,
  aoSubmeter,
}) {
  return (
    <form onSubmit={aoSubmeter} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-semibold text-[#5c4033]">
          E-mail
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={aoMudarEmail}
          placeholder="seu@email.com"
          className="border border-[#d7ccc8] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
        />
        {emailErro && <span className="text-red-500 text-sm">{emailErro}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="senha" className="font-semibold text-[#5c4033]">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={aoMudarSenha}
          placeholder="••••••"
          className="border border-[#d7ccc8] p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
        />
        {senhaErro && <span className="text-red-500 text-sm">{senhaErro}</span>}
      </div>

      {erroGeral && <span className="text-red-500 text-sm text-center">{erroGeral}</span>}

      <button
        type="submit"
        className="bg-[#5c4033] text-white font-bold py-3 px-6 rounded-md hover:bg-[#3e2723] transition"
      >
        Entrar
      </button>
    </form>
  );
}

export default FormLogin;