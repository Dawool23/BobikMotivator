""" import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'manager_motivation.settings')

application = get_asgi_application()
 """

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from motivation.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'manager_motivation.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Для обработки обычных HTTP-запросов
    "websocket": AuthMiddlewareStack(  # Для WebSocket-запросов с авторизацией
        URLRouter(
            websocket_urlpatterns  # Подключаем маршруты WebSocket
        )
    ),
})
