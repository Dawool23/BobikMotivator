# Generated by Django 5.1.3 on 2024-11-30 05:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('motivation', '0002_remove_employee_mail'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='clients',
            options={'verbose_name': 'Клиента', 'verbose_name_plural': 'Клиенты'},
        ),
        migrations.AlterModelOptions(
            name='deals',
            options={'verbose_name': 'Сделку', 'verbose_name_plural': 'Сделки'},
        ),
        migrations.AlterModelOptions(
            name='employee',
            options={'verbose_name': 'Сотрудника', 'verbose_name_plural': 'Сотрудники'},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'verbose_name': 'Товар', 'verbose_name_plural': 'Товары'},
        ),
        migrations.AlterModelOptions(
            name='roles',
            options={'verbose_name': 'Роль', 'verbose_name_plural': 'Роли'},
        ),
        migrations.AlterField(
            model_name='deals',
            name='date',
            field=models.DateTimeField(db_column='date', default=datetime.datetime.now, verbose_name='Дата'),
        ),
        migrations.AlterField(
            model_name='deals',
            name='payment_type',
            field=models.CharField(choices=[('Наличные', 'Наличные'), ('Банковская карта', 'Банковская карта'), ('Кредит', 'Кредит')], db_column='payment_type', default='Наличные', max_length=50, verbose_name='Тип оплаты'),
        ),
        migrations.AlterField(
            model_name='deals',
            name='status',
            field=models.CharField(choices=[('Не завершено', 'Не завершено'), ('Завершено', 'Завершено'), ('Отклонено', 'Отклонено')], db_column='status', default='Не завершено', max_length=50, verbose_name='Статус'),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.CharField(blank=True, db_column='description', max_length=300, null=True, verbose_name='Описание'),
        ),
    ]