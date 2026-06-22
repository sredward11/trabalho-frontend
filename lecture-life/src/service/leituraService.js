const URL_BASE = 'http://localhost:3000';

function getToken() {
  return localStorage.getItem('token');
}

export async function buscarEstatisticas() {
  const resposta = await fetch(`${URL_BASE}/readings/stats`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!resposta.ok) {
    throw new Error('Erro ao buscar estatísticas.');
  }

  return resposta.json();
}

export async function listarLeituras() {
  const resposta = await fetch(`${URL_BASE}/readings`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!resposta.ok) {
    throw new Error('Erro ao listar leituras.');
  }

  return resposta.json();
}

export async function cadastrarLeitura(dados) {
  const resposta = await fetch(`${URL_BASE}/readings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error('Erro ao cadastrar leitura.');
  }

  return resposta.json();
}