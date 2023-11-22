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

## 2. Описание веб приложения sports-helper

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

package.json - основной json файл для установки пакетов для Node
package-lock.json json файл для фиксации версий зависимостей.

Сервер с бэкапами также будет являться арбитром

backend1 - база mongo, приложение node
backend2 - база mongo, приложение node
backup база mongo репликация