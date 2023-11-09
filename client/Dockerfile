FROM node:12

WORKDIR /app

EXPOSE 3000

COPY package*.json ./

# Установка зависимостей
RUN npm install

COPY . ./

#CMD ["npm", "start", "--no-exit"]
# Запуск бесконечной команды для предотвращения завершения контейнера
CMD tail -f /dev/null