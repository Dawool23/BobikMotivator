FROM python:3.12-alpine
ENV PYTHONDONTWRITEBYTECODE=1
# Устанавливает переменную окружения, которая гарантирует,
# что вывод из python будет отправлен прямо в терминал без предварительной буферизации
ENV PYTHONUNBUFFERED=1
# Устанавливает рабочий каталог контейнера — "code"
WORKDIR /code
# Копирует файл requirements из нашего локального проекта в контейнер
COPY requirements.txt /code/
# Запускает команду pip install для всех библиотек, перечисленных в requirements.txt
RUN pip install -r requirements.txt
# Копирует все файлы из нашего локального проекта в контейнер
COPY . /code/