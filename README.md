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

### POST api/login

**Пример запроса:**

```json
{
    "username":"username",
    "password":"password"
}
```

**Пример ответа:**

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczODE4MTYxMywiaWF0IjoxNzMyOTk3NjEzLCJqdGkiOiIzZDlmOTJlY2I0MmI0MTY4YTdjNTVjNGJiN2E0YzkwYiIsInVzZXJfaWQiOjE3LCJ1c2VybmFtZSI6IkdvcmVsb3ZBQSJ9.KuwaFOCIXRRM9--sPVBM_08gnKvFg5teXoFghhiWfuo",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1NTg5NjEzLCJpYXQiOjE3MzI5OTc2MTMsImp0aSI6IjI0NjVlY2VkOTJkZjRiZDJhZmM2ODgxZjg2MzY2NTc5IiwidXNlcl9pZCI6MTcsInVzZXJuYW1lIjoiR29yZWxvdkFBIn0.Q0OZHinDqiilmBPV1H7DyUHevKOvUEDmbmWNdBx6Sgk"
}
```

### POST api/logout

**Пример запроса:**

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczODE4MTc2MSwiaWF0IjoxNzMyOTk3NzYxLCJqdGkiOiJjMmI0YzIyNzRiZmM0N2ZmODg5MjliMGM4OTZhNTFlZSIsInVzZXJfaWQiOjE3LCJ1c2VybmFtZSI6IkdvcmVsb3ZBQSJ9.pX-mn95eD05c8uY8g4QzL_Rc_DU__8V_uIpEfoAOSrI"
}
```

**Пример ответа:**

```json
{
  "success": "Выход успешен"
}
```

### POST api/token/refresh

**Пример запроса:**

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczODE4MjA4MCwiaWF0IjoxNzMyOTk4MDgwLCJqdGkiOiJlOWU1ODBmODg5MjA0MjQ1YmVkYWM0ZmExYWMyOGY5MiIsInVzZXJfaWQiOjE3LCJ1c2VybmFtZSI6IkdvcmVsb3ZBQSJ9.q0cmHLqXle9q1-ppzDmNlCMg7IS2FiaeLNlNV37m6RA"
}
```

**Примеры ответа:**

- Success:

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1NTkwMDkwLCJpYXQiOjE3MzI5OTgwODAsImp0aSI6ImM1ZDNiZDk3MDc4ZDRhZDM5NDY2MDVhYWNlYTI1MWJhIiwidXNlcl9pZCI6MTcsInVzZXJuYW1lIjoiR29yZWxvdkFBIn0.u75Wc0_X3dKXHaGe7Lt5W1HVfEWKp-o0cWNsx-iAzxk",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczODE4MjA5MCwiaWF0IjoxNzMyOTk4MDkwLCJqdGkiOiIxMWJhMTBjNDU1NmI0MjQxOTJkZmQ2ZTc4MGZkMDEwYiIsInVzZXJfaWQiOjE3LCJ1c2VybmFtZSI6IkdvcmVsb3ZBQSJ9.n_-xRYJ-Ng9b0NHoQM8EyVgLIJDITCqMcPwuJKCogzs"
}
```

- Error:

```json
{
"detail": "Токен занесен в черный список",
"code": "token_not_valid"
}
```

### GET api/roles

**Примеры ответа:**

```json
[
    {
        "id": 1,
        "name": "Менеджер",
        "fillial": "1"
    },
    {
        "id": 2,
        "name": "Директор филиала",
        "fillial": "1"
    },
    {
        "id": 4,
        "name": "Генеральный директор",
        "fillial": null
    },
    {
        "id": 5,
        "name": "Менеджер",
        "fillial": "2"
    },
    {
        "id": 6,
        "name": "Директор филиала",
        "fillial": "2"
    },
    {
        "id": 7,
        "name": "Менеджер",
        "fillial": "3"
    },
    {
        "id": 8,
        "name": "Директор филиала",
        "fillial": "3"
    }
]
```

### GET api/clients

**Примеры ответа:**

```json
[
    {
        "id": 1,
        "name": "Захарова Полина Викторовна"
    },
    {
        "id": 2,
        "name": "Розанова Виктория Олеговна"
    },
    {
        "id": 3,
        "name": "Новиков Вячеслав Львович"
    },
    {
        "id": 4,
        "name": "Зотова Елизавета Марковна"
    },
    {
        "id": 5,
        "name": "Аксенова Валерия Тимуровна"
    },
    {
        "id": 6,
        "name": "Смирнов Илья Михайлович"
    },
    {
        "id": 7,
        "name": "Борисова Олеся Романовна"
    },
    {
        "id": 8,
        "name": "Мартынов Николай Александрович"
    },
    {
        "id": 9,
        "name": "Копылов Иван Дмитриевич"
    },
    {
        "id": 10,
        "name": "Копылов Иван Дмитриевич"
    },
    {
        "id": 11,
        "name": "Тарасов Фёдор Романович"
    },
    {
        "id": 12,
        "name": "Гаврилова Диана Макаровна"
    },
    {
        "id": 13,
        "name": "Шаповалов Антон Александрович"
    }
]
```

### GET api/product

**Примеры ответа:**

```json
[
    {
        "id": 2,
        "name": "Kia Seltos",
        "price": "3500000.00",
        "percent": "0.015",
        "description": "Состояние: новое"
    },
    {
        "id": 3,
        "name": "BMW 330i xDrive",
        "price": "5000000.00",
        "percent": "0.005",
        "description": "Состояние: новое"
    },
    {
        "id": 4,
        "name": "BMW 550d",
        "price": "8000000.00",
        "percent": "0.015",
        "description": "Состояние: БУ"
    },
    {
        "id": 5,
        "name": "Mercedes-Benz E400",
        "price": "7000000.00",
        "percent": "0.005",
        "description": "Состояние: новое"
    },
    {
        "id": 6,
        "name": "Audi A7",
        "price": "9000000.00",
        "percent": "0.005",
        "description": "Состояние: новое"
    },
    {
        "id": 7,
        "name": "Mercedes-Maybach GLS600",
        "price": "17000000.00",
        "percent": "0.005",
        "description": "Состояние: БУ"
    },
    {
        "id": 8,
        "name": "Mercedes-AMG G63",
        "price": "40000000.00",
        "percent": "0.005",
        "description": "Состояние: новое"
    },
    {
        "id": 9,
        "name": "BMW M8 Competition",
        "price": "13000000.00",
        "percent": "0.015",
        "description": "Состояние: БУ"
    },
    {
        "id": 1,
        "name": "Hyundai Sonata",
        "price": "3000000.00",
        "percent": "0.005",
        "description": "Состояние: новое"
    }
]
```

### GET api/employee

**Примеры ответа:**

### GET api/deals

**Примеры ответа:**

## Frontend
