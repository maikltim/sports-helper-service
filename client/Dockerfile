FROM node:14

WORKDIR /app

EXPOSE 3000

COPY package*.json  ./

# Установка зависимостей
RUN npm install

CMD ["npm", "start"]
