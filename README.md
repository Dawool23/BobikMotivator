# BobikMotivator

## Развёртка

Для развёртки приложения потребуется Docker.

После его установки (или включения) необходимо выполнить следующие шаги:

1. В каталогах `bobik-motivation-front` и `manager_motivation` cкопировать `.env.docker.example` в `.env`
2. С помощью терминала, находясь в корне проекта, выполнить команду

    ```shell
    docker compose up -d --build
    ```

3. После сборки контейнеров необходимо, находясь всё в том же каталоге, выполнить команду:

    ```shell
    docker compose run --rm motivation-backend python manage.py migrate
    ```

    Это создаст таблицы со всеми связями в базе данных.
    При последующих изменениях кода программы на уже 'раскатанной' системе, следует использовать:

    ```shell
    docker compose run --rm motivation-backend python manage.py makemigrations
    ```

После этого приложение готово к работе.

## Backend

## Frontend
