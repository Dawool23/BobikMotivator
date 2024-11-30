from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Deals
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from utils import calculate_premium

@receiver(post_save, sender=Deals)
def handle_deal_premium(sender, instance, created, **kwargs):
    if created:  # Если сделка создана
        premium_result = calculate_premium(instance.id)
        print(f"Премия рассчитана: {premium_result}")
