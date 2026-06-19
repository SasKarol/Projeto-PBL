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
