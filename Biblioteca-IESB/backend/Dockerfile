FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Gera swagger.json automaticamente durante o build
RUN node swagger.js

EXPOSE 3000

CMD ["node", "src/app.js"]
