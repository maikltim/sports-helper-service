FROM node:14

WORKDIR /app

EXPOSE 3000

COPY package*.json ./

# Установка зависимостей
RUN npm install

COPY . ./

CMD ["npm", "start"]
# Запуск бесконечной команды для предотвращения завершения контейнера
#CMD tail -f /dev/null