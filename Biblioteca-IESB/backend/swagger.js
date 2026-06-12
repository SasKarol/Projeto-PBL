const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Biblioteca Academica API',
    version: '1.0.0',
    description: 'API de controle de livros — PBL Caso 2',
  },
  host: 'localhost:3000',
};

const outputFile = './swagger.json';
const routes     = ['./src/app.js'];

swaggerAutogen(outputFile, routes, doc);
