const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'Título é obrigatório.'],
      trim: true,
    },
    autor: {
      type: String,
      required: [true, 'Autor é obrigatório.'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['disponivel', 'emprestado'],
      default: 'disponivel',
    },
  },
  {
    timestamps: { createdAt: 'criado_em', updatedAt: false },
  }
);

module.exports = mongoose.model('Livro', LivroSchema);
