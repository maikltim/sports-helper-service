FROM node:14

WORKDIR /app

EXPOSE 4200

COPY package*.json ./

# Установка зависимостей
RUN npm install

#COPY . ./

CMD ["npm", "start"]