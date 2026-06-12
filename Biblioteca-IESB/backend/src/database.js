const mongoose = require('mongoose');
require('dotenv').config();

async function conectar() {
  const dbEncoded = encodeURIComponent(process.env.MONGO_DB);
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${dbEncoded}?retryWrites=true&w=majority`;
  let tentativas = 0;

  while (tentativas < 10) {
    try {
      await mongoose.connect(uri);
      console.log('✅ MongoDB conectado.');
      return;
    } catch (err) {
      tentativas++;
      console.log(`⏳ Aguardando MongoDB... tentativa ${tentativas}/10`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  console.error('❌ Não foi possível conectar ao MongoDB.');
  process.exit(1);
}

module.exports = { conectar };