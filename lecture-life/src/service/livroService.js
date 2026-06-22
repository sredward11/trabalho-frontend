const URL_BASE = 'http://localhost:3000';

function getToken() {
  return localStorage.getItem('token');
}

export async function listarLivros() {
  const resposta = await fetch(`${URL_BASE}/books`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!resposta.ok) {
    throw new Error('Erro ao listar livros.');
  }

  return resposta.json();
}

export async function cadastrarLivro(dados) {
  const resposta = await fetch(`${URL_BASE}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error('Erro ao cadastrar livro.');
  }

  return resposta.json();
}