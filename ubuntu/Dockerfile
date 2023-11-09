# Используйте базовый образ Ubuntu 20.04
FROM ubuntu:20.04

# Обновите список пакетов и установите необходимые утилиты
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8
RUN apt-get update && apt-get install -y iputils-ping iproute2 net-tools netcat wget curl mongodb-clients && apt-get clean

# Убедитесь, что контейнер остается активным
CMD ["tail", "-f", "/dev/null"]
