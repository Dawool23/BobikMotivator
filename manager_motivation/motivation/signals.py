from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Deals
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@receiver(post_save, sender=Deals)
def notify_sales_update(sender, instance, created, **kwargs):
    if created:  # Новая продажа
        channel_layer = get_channel_layer()
        data = {
            "message": "Новая продажа зарегистрирована!",
            "sale_id": instance.id,
            "sum": str(instance.sum),
        }
        async_to_sync(channel_layer.group_send)(
            "sales_updates",  # Название группы WebSocket
            {"type": "send_sales_update", "data": data}
        )
        # Вызов алгоритма расчета премий
        calculate_premium()
