# Generated by Django 5.1.3 on 2024-11-30 08:46

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('motivation', '0005_alter_product_percent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='percent',
            field=models.DecimalField(db_column='percent', decimal_places=3, default=0.0, max_digits=4, validators=[django.core.validators.MaxValueValidator(1.0), django.core.validators.MinValueValidator(0.0)], verbose_name='Процент'),
        ),
    ]
