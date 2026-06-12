const { Router } = require('express');
const Livro = require('../models/Livro');

const router = Router();

// GET /livros?titulo=... — listar todos ou filtrar por título
router.get('/', async (req, res) => {
  // #swagger.summary = 'Lista todos os livros ou filtra por título'
  // #swagger.parameters['titulo'] = { in: 'query', description: 'Filtro por título', type: 'string' }
  try {
    const { titulo } = req.query;
    const filtro = titulo ? { titulo: { $regex: titulo, $options: 'i' } } : {};
    const livros = await Livro.find(filtro).sort({ criado_em: -1 });
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET /livros/:id — buscar por id
router.get('/:id', async (req, res) => {
  // #swagger.summary = 'Busca um livro pelo ID'
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST /livros — cadastrar livro
router.post('/', async (req, res) => {
  /* #swagger.summary = 'Cadastra um novo livro'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { titulo: 'Clean Code', autor: 'Robert C. Martin' }
     }
  */
  try {
    const { titulo, autor } = req.body;
    const livro = await Livro.create({ titulo, autor });
    res.status(201).json(livro);
  } catch (err) {
    // Erros de validação do Mongoose (campo obrigatório ausente etc.)
    if (err.name === 'ValidationError') {
      const mensagens = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ erro: mensagens.join(', ') });
    }
    res.status(500).json({ erro: err.message });
  }
});

// PATCH /livros/:id/status — alternar disponível/emprestado
router.patch('/:id/status', async (req, res) => {
  // #swagger.summary = 'Alterna o status do livro entre disponivel e emprestado'
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });

    livro.status = livro.status === 'disponivel' ? 'emprestado' : 'disponivel';
    await livro.save();
    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE /livros/:id — remover livro
router.delete('/:id', async (req, res) => {
  // #swagger.summary = 'Remove um livro pelo ID'
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
