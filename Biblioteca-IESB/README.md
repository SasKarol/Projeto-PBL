# Biblioteca Academica — Controle de Livros (PBL Caso 2)

API REST para controle de livros com Node.js, Express, Mongoose e MongoDB.

## Stack

| Camada  | Tecnologia                    |
|---------|-------------------------------|
| Backend | Node.js + Express + Mongoose  |
| Banco   | MongoDB 7                     |
| Admin   | Mongo Express                 |
| Docs    | Swagger (swagger-autogen)     |
| Infra   | Docker + Docker Compose       |
| CI/CD   | GitHub Actions                |

---

## Estrutura do projeto

```
biblioteca/
├── backend/
│   ├── src/
│   │   ├── app.js           <- entrada: rotas, swagger, sobe servidor
│   │   ├── database.js      <- conexão Mongoose com retry
│   │   ├── models/
│   │   │   └── Livro.js     <- Schema Mongoose
│   │   └── routes/
│   │       └── livros.js    <- CRUD completo
│   ├── swagger.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── .github/workflows/ci.yml
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Como rodar

### 1. Configure o ambiente

```bash
cp .env.example .env
```

O `.env` já vem com valores padrão que funcionam localmente.

### 2. Suba com Docker Compose

```bash
docker compose up --build
```

Aguarde: `✅ MongoDB conectado.` e `🚀 API rodando em http://localhost:3000`

### 3. Acesse

| Recurso        | URL                           |
|----------------|-------------------------------|
| API            | http://localhost:3000/livros  |
| Swagger / Docs | http://localhost:3000/docs    |
| Mongo Express  | http://localhost:8081         |
| Health check   | http://localhost:3000/health  |

---

## Rotas da API

| Método | Rota                  | Descrição                     |
|--------|-----------------------|-------------------------------|
| GET    | /livros               | Lista todos os livros         |
| GET    | /livros?titulo=abc    | Filtra por título             |
| GET    | /livros/:id           | Busca por ID                  |
| POST   | /livros               | Cadastra novo livro           |
| PATCH  | /livros/:id/status    | Alterna disponivel/emprestado |
| DELETE | /livros/:id           | Remove um livro               |
| GET    | /health               | Health check                  |

### Exemplo de cadastro

```bash
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Clean Code", "autor": "Robert C. Martin"}'
```

---

## CI/CD — Secret necessário no GitHub

**Settings → Secrets and variables → Actions → New repository secret**

| Nome        | Valor    |
|-------------|----------|
| MONGO_PASS  | senha123 |

---

## Parar os serviços

```bash
docker compose down        # para containers
docker compose down -v     # para e apaga os dados do banco
```
