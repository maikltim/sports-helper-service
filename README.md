# Проект. Веб приложение sports-helper

## 1. Подготовка локальной среды

Подымаем тестовый контур через docker compose

```bash
docker compose up
```

Проверим корректность работы зайдя на <http://localhost:3000>  
Если все поднялось, создаём папку build командой,  
это необходимо для дальнейшего создания prod:  

выполним команду

```bash
docker compose exec frontend npm run build
```

Для удаления контейнеров используется команда:  

```bash
docker compose down -v
```

## 2. Описание веб приложения sports-helper ( режим разработчика )

Для работы приложения sports-helper необходимы:

- frontend на reactjs
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
- папка node modules пустая папка, эта папка куда инсталлируются пакеты npm ( у нас она существует внутри контейнера frontend )
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

- server/core/db.ts - содержит параметры подключения backend к базе данных mongo.

### 2.3 Mongo

Для работы Backend необходим сервис mongodb не старше 5 ой версии.

### 2.4 Запуск сервиса в dev режиме

Сервис в dev режиме запускается с помощью docker compose.

```bash
docker compose up
```

Docker-compose:

```yml
version: '3.8'
services:
  frontend:
    build: ./client
    restart: always
    ports:
      - '3000:3000'
    depends_on:
      - api
    volumes:
     - frontend_node_modules:/app/node_modules
     - ./client:/app
    networks:
      - my_network
  api:
    build: ./server
    restart: always
    ports:
      - '4200:4200'
    depends_on:
      - mongo
    volumes:
     - api_node_modules:/app/node_modules
     - ./server:/app
    networks:
      - my_network
  mongo:
    image: mongo:5.0.23-rc0
    restart: always
    ports:
     - 8081:8081
    volumes:
     - mongo_data:/data/db
    networks:
      - my_network
  my_network:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.25.0.0/16        
volumes:
  mongo_data:
  frontend_node_modules:  
  api_node_modules:
```

Ссылка по которой будет доступно приложение:

<http://localhost:3000>

## 3. Запуск проекта в prod

### 3.1 Подготовим локальный компьютер

Запустим local.yml

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

### 3.2 Запуск серверов

Подымаем все сервера:

```ruby
vagrant up
```

После создания сервисов необходимо перезапустить сервис на secondary backend2 в силу специфики работы приложения sports-helper после включения сервера backend2 в репликационную группу.
Запускаем для этого скрипт ./restart_backend.sh ( выбираем backend2)

```bash
cd ansible
./restart_backend.sh 
Выберите сервер backend для перезапуска sports-helper:

1. backend1

2. backend2
Введите номер хоста (1 или 2): 1
```

Схема работы нашего приложения:

![scheme](images/scheme.png)

После запуска всех сервисов приложение sports-helper будет доступно по адресу:

<https://sports-helper>

Мониторинг будет доступен по адресу:

<http://monitoring:3000>

Сервер prometheus будет доступен по адресу:

<http://monitoring:9090>

Логи располагаются на сервере backup.

Проверка существования логов:

```bash
cd ansible
ansible-playbook install.yml --tags=check-logs -l backup
```

Проверка существования бэкапов:

Бэкапы базы mongo располагаются на сервере backup:

```bash
cd ansible
ansible-playbook install.yml --tags=show-backups -l backup
```

Проверка состояния реплиакции mongodb:

```bash
ansible-playbook install.yml --tags=show_repl -l backend1
```

Бэкапом кода приложения является github репозитарий.

На всех серверах запущена система безопасности selinux в режиме enforcing,  
а также запущен firewall.

### 3.3 Подробное описание ролей основных сервисов

Запуск всех серверов происходит с помощью оркестратора vagrant, provisioning настроен с помощью ansible.
Каждый сервис описан с помощью ролей ansible. Роли ansible настроены таким образом, чтобы работало наследование тегов при запуске playbook с тегами.

Основной playbook по запуску ролей:

```yml
---
- name: Install roles
  hosts: all
  become: yes
  gather_facts: true
  roles:
    - monitoring
    - logs
    - nginx
    - mongodb
    - nodejs
    - backup
    - firewalld
```

**Роль nginx теги:**

- install_nginx - установка nginx
- nginx_cfg - генерация nginx cfg
- syn_fold - синхронизация папки build frontend
- nginx_selinux - настройка модуля безопасности selinux

**Роль nodejs теги:**

- install node - установка node
- copy_app - копирование папки server - рабочего кода приложения backend
- create_service - создание сервиса backend sports-helper
- restart - перезапуск службы sports-helper

**Роль mongodb теги:**

- install_mongo - установка mongodb
- enable_auth - создание служебных пользователей и включение авторизации mongo
- mongo_conf - генерация конфига базы mongo
- enable_repl - включение репликации базы mongo, запускается на основном primary участнике репликации,  
  необходимо запускать,когда все остальные участники репликации существуют, при восстановлении сервера primary, данный тег желательно не использовать.
- show_repl - проверка состояния репликации mongodb

**Роль backup теги:**

- backup - создания сервиса планировщика по выполнению бэкапов с помощью mongodump.
- show-backups -  проверка существования бэкапов.

**Роль logs теги:**

- rsyslog-client - настройка клиента по отправки логов rsyslog
- rsyslog-srv - настройка сервера по приему логов rsyslog
- check-logs - проверка существования логов на сервере rsylog

**Роль monitoring теги:**

- install_prom - установка prometheus
- srv_prom_cfg - настройка конфига prometheus
- install_node_exp - установка node exporter для prometheus
- install_grafana - установка grafana
- settings_grafana - настройка grafana

**Роль firewalld теги:**

- firewall_on - включение и настройка firewall. Разрешенные порты указаны в папке groups_vars.
- firewall_off - отключение firewall.

### 3.4 Восстановление сервисов

Сервера frontend, backend1, backend2, backup, monitoring восстанавливаются командной:

```bash
vagrant up "имя сервера"
```

В случае восстановления backend2, backup, которые являются secondary участниками репликации mongodb,  
база автоматически произведет репликацию на восстановленный сервер.

При восстановление сервера backend1, который является primary участником репликации mongodb, база автоматически произведет репликацию, и backend1 станет primary.
За автоматическое переключение запросов на резервный бэкенд в случае отказа отвечает nginx сервер:

```nginx
upstream backend {
    server {{ backend_name }}:{{ backend_port }} fail_timeout=3s max_fails=2;
    server {{ backend_name_back }}:{{ backend_port }} backup;
}
```

Также стоит учесть, что при восстановление backend1, в момент provision сервера, которое занимает время, так как сервер включен и доступен, nginx будет считать сервер доступным ( хотя сервер еще устаналивается ) и секция:
``server {{ backend_name }}:{{ backend_port }} fail_timeout=3s max_fails=2;`` будет ввести на еще не готовый сервис. Чтобы этого не происходило, можно воспользоваться скиптом ``change_app.sh`` переключающим на другой бэкенд. Либо производить восстановление в часы для технического обслуживания ( бэкенд будет не доступен ).

```bash
cd ansible
user:~/sports-helper-service/ansible$ ./change_app.sh
Выберите хост для переключения backend:

1. backend1

2. backend2
```

В Vagrantfile желательно убрать тег "enable_repl", для избежания долгого ожидания при повтором включении репликации ( ansible пропустит ошибку )

```ruby
elsif boxconfig[:vm_name] == "backend1"  ansible.tags = ["install_mongo", "enable_auth", "mongo_conf", "enable_repl", "install_node", "create_service", "copy_app", "rsyslog-client", "install_node_exp", "firewall_on"]
```

Должно быть так:

```ruby
elsif boxconfig[:vm_name] == "backend1"  ansible.tags = ["install_mongo", "enable_auth", "mongo_conf", "install_node", "create_service", "copy_app", "rsyslog-client", "install_node_exp", "firewall_on"]
```

После восстановления вернуть основной бэкенд скриптом ./change_app.sh ( если скрипт использовали для переключения на backend2 )

### 3.5 Карта ansible

```bash
.
├── ansible.cfg
├── change_app.sh
├── group_vars
│   ├── backup_servers.yml
│   ├── clients.yml
│   ├── mongo_primary.yml
│   ├── mongo_secondary.yml
│   └── monitoring.yml
├── hosts
├── install.yml
├── local_playbooks
│   ├── add_hosts.yml
│   ├── mongo_key.yml
│   └── nginx_cert.yml
├── local.yml
├── roles
│   ├── backup
│   ├── firewalld
│   ├── logs
│   ├── mongodb
│   ├── monitoring
│   ├── nginx
│   └── nodejs
```
