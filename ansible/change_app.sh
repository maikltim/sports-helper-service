#!/bin/bash

# Если аргументы не заданы, предложить выбор хоста
if [ "$#" -eq 0 ]; then
    echo "Выберите хост для переключения backend:"
    echo -e "\n1. backend1"
    echo -e "\n2. backend2"

    # Чтение ввода пользователя
    read -p "Введите номер хоста (1 или 2): " choice

# Если аргументы заданы, использовать их
else
    choice="$1"
fi

# Проверка выбора
case "$choice" in
  1)
    backend="backend1"
    ;;
  2)
    backend="backend2"
    ;;
  *)
    echo "Неверный выбор. Выберите 1 или 2."
    exit 1
    ;;
esac

# Вывод выбранного бэкэнда
echo "Выбран backend: $backend"

echo -e "\nПерезапускаю nginx для использования $backend\n"
ansible-playbook nginx.yml --tags=nginx_cfg -e "backend_name=$backend"
echo -e "\nПерезапускаю sports-helper.service для использования $backend\n"
ansible-playbook node.yml -l $backend --tags=restart