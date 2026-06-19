const mongoose = require('mongoose');
require('dotenv').config();

async function conectar() {
  const uri = process.env.MONGO_URI;

  let tentativas = 0;

  while (tentativas < 10) {
    try {
      await mongoose.connect(uri);
      console.log('✅ MongoDB conectado.');
      return;
    } catch (err) {
      console.log(err.message); // <- você colocou esta linha?
      tentativas++;
      console.log(`⏳ Aguardando MongoDB... tentativa ${tentativas}/10`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  console.error('❌ Não foi possível conectar ao MongoDB.');
  process.exit(1);
}

module.exports = { conectar };