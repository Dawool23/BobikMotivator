# Generated by Django 5.1.3 on 2024-11-30 04:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('motivation', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='mail',
        ),
    ]
