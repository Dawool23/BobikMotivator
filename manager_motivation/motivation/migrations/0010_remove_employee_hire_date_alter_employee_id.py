# Generated by Django 5.1.3 on 2024-12-01 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('motivation', '0009_employee_hire_date_alter_employee_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='hire_date',
        ),
        migrations.AlterField(
            model_name='employee',
            name='id',
            field=models.AutoField(db_column='id', primary_key=True, serialize=False),
        ),
    ]
