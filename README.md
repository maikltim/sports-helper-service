Подымаем тестовый контур через docker compose

```bash
docker compose up
```

Если все поднялось, создаём папку build командой:

выполним команду

```bash
docker compose exec frontend npm run build
```

Playbook nginx_cert.yml необходим если нужно создать, локальный самоподписанный сертификат  
в папку .ansible/roles/nginx/files

```bash
ansible-playbook nginx_cert.yml --ask-become
```

Сервер с бэкапами также будет являться арбитром

backend1 - база mongo, приложение node
backend2 - база mongo, приложение node
backup база mongo репликация