require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const { conectar } = require('./database');
const swaggerUi    = require('swagger-ui-express');

const livrosRouter = require('./routes/livros');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI
let swaggerFile;
try {
  swaggerFile = require('../swagger.json');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch {
  console.warn('swagger.json não encontrado — /docs indisponível');
}

// Rotas
app.use('/livros', livrosRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Conecta ao banco e sobe o servidor
const PORT = process.env.PORT || 3000;

conectar().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 API rodando em http://localhost:${PORT}`)
  );
});
