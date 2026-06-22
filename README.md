# LectureLife — Frontend

Bem-vindo ao repositório Frontend do **LectureLife**, uma aplicação web intuitiva e moderna desenvolvida para o gerenciamento de biblioteca pessoal e acompanhamento de leituras.

Desenvolvida com **React + Vite**, **Tailwind CSS**, **React Router DOM**, e **React Hook Form**, esta interface consome a **LectureLife API** para proporcionar uma experiência completa de ponta a ponta.

---

## 🎯 Visão Geral do Projeto

O LectureLife permite que o usuário crie uma conta, faça login, cadastre livros, registre leituras e acompanhe todas as suas estatísticas através de um Dashboard.

### 🔗 Repositórios Relacionados
- **Backend (API)**: [https://github.com/sredward11/lecturelife-api]
- **Frontend (Este Repositório)**: Este código contém a interface do usuário.

---

## ✨ Funcionalidades

- **Autenticação**: Cadastro de novos usuários e login com JWT (JSON Web Token), incluindo rotas protegidas que impedem acesso não autorizado.
- **Dashboard Estatístico**: Resumo automático exibindo total de leituras, páginas lidas, média de notas e a quantidade de livros por status (Lendo, Planejando, Abandonado, Concluído).
- **Gestão de Livros**: Cadastro e listagem dinâmica de livros.
- **Gestão de Leituras**: Registro de leitura atrelado aos livros cadastrados.
  - *Automações*: Ao marcar a leitura como "Concluída", os campos de data de início, conclusão e nota tornam-se obrigatórios. O campo "Páginas Lidas" é preenchido automaticamente com o total de páginas do livro.
- **Interface Responsiva**: Estilização moderna baseada em Tailwind CSS.

---

## 🛠️ Pré-requisitos de Sistema

Para rodar este projeto sem problemas, certifique-se de ter os seguintes softwares instalados na sua máquina:

1. **Git** (Para clonar os repositórios)
2. **Node.js** v18+ (Para rodar a API localmente, caso não use docker nela)
3. **Docker** e **Docker Compose** (Para rodar o Frontend de forma isolada)
   - *Nota para usuários de Windows*: Certifique-se de que o **WSL 2** (Windows Subsystem for Linux) está ativado e integrado ao Docker Desktop.
4. **MongoDB Atlas** (Ou instância local do MongoDB) para o banco de dados do Backend.

---

## 🚀 Passo a Passo de Execução

A execução completa do projeto depende de duas partes: O Backend (API) e o Frontend. É **obrigatório** rodar o backend primeiro para que o frontend consiga autenticar e buscar os dados.

### PASSO 1: Executando o Backend (LectureLife API)

1. Clone o repositório do backend na sua máquina:
   ```bash
   git clone https://github.com/sredward11/lecturelife-api.git
   cd lecturelife-api
   ```
2. Crie um arquivo chamado `.env` na raiz da pasta `lecturelife-api` e configure suas variáveis de ambiente:
   ```env
   PORT=3000
   JWT_PASSWORD=senha
   JWT_USERNAME=usuario
   JWT_SECRET=sua_chave_secreta_jwt
   MONGODB_URI=sua_string_de_conexao_do_mongodb_atlas
   ```
3. Instale as dependências da API:
   ```bash
   npm install
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   > ✅ A API estará rodando em `http://localhost:3000` e a documentação do Swagger estará disponível em `http://localhost:3000/api-docs`. Mantenha este terminal aberto!

---

### PASSO 2: Executando o Frontend (Este Repositório)

Com a API rodando no Passo 1, abra um **novo terminal** para subir o frontend.

1. Navegue até a raiz do repositório do Frontend e entre na pasta principal:
   ```bash
   cd lecture-life
   ```
2. Construa e suba o contêiner Docker em segundo plano (modo detached):
   ```bash
   docker compose up -d
   ```
3. Instale as dependências do Node.js **por dentro** do contêiner instanciado:
   ```bash
   docker compose exec app npm install
   ```
4. Inicialize o servidor Vite **por dentro** do contêiner:
   ```bash
   docker compose exec app npm run dev
   ```
   > ✅ O Vite informará no terminal que está rodando. O Frontend agora pode ser acessado no navegador pelo endereço: **http://localhost:5173**

---

## 🗺️ Fluxo de Avaliação Recomendado

Para testar 100% da aplicação e avaliar as validações e integrações:

1. Acesse `http://localhost:5173` no seu navegador. Você será redirecionado para a tela de Login.
2. Clique no link **"Criar usuário"**.
3. Preencha Nome, E-mail e Senha e cadastre a conta (verifique a notificação de sucesso).
4. Volte e faça o **Login** com a conta recém-criada.
5. Acesse o menu **"Livros"** e cadastre pelo menos um livro.
6. Acesse o menu **"Leituras"** e clique em **"+ Nova Leitura"**.
   - Selecione o livro cadastrado.
   - Marque o status como **"Concluído"**.
   - *Observe:* As páginas lidas serão preenchidas automaticamente. Tente salvar sem colocar as datas ou nota e veja a validação bloqueando o envio e exibindo mensagens em vermelho.
   - Preencha as datas e a nota corretamente e salve.
7. Vá para o **"Dashboard"** e verifique os cards quantitativos atualizados.
8. Verifique as tabelas de **"Livros"** e **"Leituras"** com as formatações e dados dinâmicos.
9. Teste o logout clicando em **"Sair"** no final da Sidebar (será redirecionado de volta ao login e o JWT será excluído do LocalStorage).

---

## 📁 Estrutura de Rotas do Frontend

| Rota | Descrição e Comportamento |
|---|---|
| `/login` | Tela inicial e de acesso (Pública). Redireciona para `/` se já autenticado. |
| `/cadastro` | Tela de registro de novo usuário (Pública). |
| `/` | Dashboard principal com cards dinâmicos (Protegida). |
| `/livros` | Tabela listando todos os livros cadastrados no BD (Protegida). |
| `/livros/novo` | Formulário controlado para inserção de um livro (Protegida). |
| `/leituras` | Tabela listando leituras associadas ao usuário logado (Protegida). |
| `/leituras/nova` | Formulário com integrações complexas e autopreenchimento (Protegida). |

---

## ⚠️ Solução de Problemas Comuns (Troubleshooting)

- **A aplicação parou na tela de Loading ou deu erro de "Failed to Fetch" no Login/Cadastro:**
  - **Motivo:** O frontend não conseguiu conectar ao backend.
  - **Solução:** Verifique se o terminal da API (Passo 1) está aberto, sem erros, e rodando exatamente na porta `3000`. Acesse `http://localhost:3000/api-docs` no navegador para testar.
- **MongoDB falhando ao conectar no Backend (Timeout):**
  - **Motivo:** IP não liberado na Cloud, credenciais erradas, MONGO_URI errada ou JWT_SECRET errado.
  - **Solução:** Acesse o MongoDB Atlas, vá em "Network Access" e garanta que o IP `0.0.0.0/0` (Allow Access from Anywhere) está ativo para testes. Confirme também a variável `MONGODB_URI` no `.env` da API.
- **O Docker não sobe o contêiner ou o `npm install` falha:**
  - **Solução:** Tente rodar os comandos no terminal como Administrador, ou garanta que seu Docker Engine está ligado (ícone verde no Docker Desktop). Reinicie o Docker Desktop se necessário. A porta 5173 deve estar livre na sua máquina.

---

## 👥 Desenvolvedores

Projeto acadêmico desenvolvido pelas equipes de Engenharia de Software:
- **Carlos Eduardo Mendonça de Morais**
- **Ana Clara de Paulo Arantes Sousa**
- **Nathalya Messias**

