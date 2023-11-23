# Проект. Веб приложение sports-helper

## 1. Подготовка локальной среды

Подымаем тестовый контур через docker compose

```bash
docker compose up
```

Если все поднялось, создаём папку build командой:

выполним команду

```bash
docker compose exec frontend npm run build
```

Проверим корректность работы зайдя на http://localhost:3000

Подготовим локальный компьютер запустив local.yml

```bash
ansible-playbook local.yml --ask-become
```

```yml
---
- import_playbook: ./local_playbooks/add_hosts.yml 
- import_playbook: ./local_playbooks/mongo_key.yml 
- import_playbook: ./local_playbooks/nginx_cert.yml
```

Будут выполнены действия на localhost:

- добавлены записи  в  /etc/hosts
- сгенерирован секретный ключ `mongo_key` необходимый для репликации серверов mongo
- сгененирован самоподписанный сертификат для сервера nginx

## 2. Описание веб приложения sports-helper ( режим разработчика )

Для работы приложения sports-helper необходимы:

- frontend на rectjs
- backend на nodejs
- mongodb

### 2.1 Frontend

Папка client:

```txt
 client
│   ├── babel-plugin-macros.config.js
│   ├── build
│   ├── Dockerfile
│   ├── jsconfig.json
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── README.md
│   └── src
```

- package.json - основной json файл для установки пакетов для node. Также в этом файле указаны параметры запуска нашего приложения.

```js
 "proxy": "http://api:4200",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

proxy": "<http://api:4200>", `api` это имя контейнера с бэкендом
"start": "react-scripts start", скрипт старта приложения в dev среде. Располагаются в папке node_modules ( в контейнере )
"build": "react-scripts build", скрипт для создания папки build для prod среды.

- package-lock.json json файл для фиксации версий зависимостей.
- папка build это рабочий код приложения, папка создаётся при запуске команды `docker compose exec frontend npm run build`.
  данна папка копируется на сервер nginx.
- папка node modules пустая папка, эта папка куда инсталируются пакеты npm ( у нас она существует внутри контейнера frontend )
- Dockerfile - файл для создания контейнера frontend.  
 [Dockerfile](./client/Dockerfile)
- папка public - содержит index.html и картинки
- папка src содержит js код приложения

### 2.2 Backend

Папка server:

```txt
├── server
│   ├── controllers
│   ├── core
│   ├── Dockerfile
│   ├── models
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── server.ts
│   ├── tsconfig.json
│   ├── utils
│   └── yarn.lock
|   └── .env
```

- package.json основной файл для запуска api backend.

```js
 "scripts": {
    "start": "ts-node server.ts",
    "dev": "ts-node server.ts"
  },
```

- server.ts - основой файл с кодом приложения, происходит вызов функций.
- папка node modules пустая папка, эта папка куда инсталируются пакеты npm ( у нас она существует внутри контейнера api )
- .env файл содержит переменные для запуска нашего приложения.
- Dockerfile - файл для создания контейнера api.
   [Dockerfile](./server/Dockerfile)


Сервер с бэкапами также будет являться арбитром

backend1 - база mongo, приложение node
backend2 - база mongo, приложение node
backup база mongo репликация

ansible-playbook nginx.yml --tags=nginx_cfg -e backend_name="backend2"
