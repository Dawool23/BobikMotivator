# Generated by Django 5.1.3 on 2024-12-01 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('motivation', '0011_alter_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='id',
            field=models.AutoField(db_column='id', primary_key=True, serialize=False),
        ),
    ]
