

---

## Como rodar
 Validação do Sistema

Após a implementação, foram realizados testes para verificar o funcionamento da API utilizando Docker Compose, terminal (curl) e MongoDB Atlas.

## Testes realizados

### 1. Inicialização da aplicação

O projeto foi executado utilizando:

```bash
docker compose up --build
```

Resultado:

* Backend iniciado com sucesso;
* Conexão estabelecida com o MongoDB Atlas;
* API disponível na porta 3000.

Mensagem exibida no terminal:

```text
✅ MongoDB conectado.
🚀 API rodando em http://localhost:3000
```

---

### 2. Health Check

Foi realizada uma requisição para verificar a disponibilidade da API.

Comando:

```bash
curl http://localhost:3000/health
```

Resposta:

```json
{
  "status": "ok"
}
```

Resultado esperado: API disponível e operacional.

---

### 3. Cadastro de livro

Foi realizado o cadastro de um novo livro.

Comando:

```bash
curl -X POST http://localhost:3000/livros \
-H "Content-Type: application/json" \
-d '{"titulo":"Clean Code","autor":"Robert C. Martin"}'
```

Resultado:

* Livro cadastrado com sucesso.
* Registro armazenado no MongoDB Atlas.

---

### 4. Listagem de livros

Comando:

```bash
curl http://localhost:3000/livros
```

Resultado:

A API retornou corretamente os livros cadastrados.

---

### 5. Alteração de status

Foi testada a alteração entre os estados "disponível" e "emprestado" utilizando o endpoint PATCH.

Resultado:

A alteração foi realizada corretamente e persistida no banco de dados.

---

### 6. Busca por ID

Foi realizada a consulta de um livro utilizando seu identificador.

Resultado:

A API retornou corretamente os dados do livro solicitado.

---

### 7. Busca por título

Foi realizada a pesquisa utilizando o parâmetro de consulta (`?titulo=`).

Resultado:

A filtragem retornou corretamente os livros correspondentes ao título informado.

---

### 8. Remoção de livro

Foi realizada a exclusão de um livro pelo seu identificador.

Resultado:

O livro foi removido com sucesso do banco de dados.

---

## Conclusão dos testes

Todos os endpoints previstos no escopo do projeto foram executados com sucesso.

Também foi validado que:

* a aplicação executa corretamente em container Docker;
* a comunicação com o MongoDB Atlas ocorre sem falhas;
* os dados permanecem persistidos no banco;
* a API responde corretamente às operações CRUD.

