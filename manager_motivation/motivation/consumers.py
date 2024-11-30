import json
from channels.generic.websocket import AsyncWebsocketConsumer

class SalesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "sales_updates"
        # Подключаемся к группе
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Отключаемся от группы
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def send_sales_update(self, event):
        # Отправляем данные клиенту
        data = event['data']
        await self.send(text_data=json.dumps(data))
