# Generated by Django 5.1.3 on 2024-12-01 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('motivation', '0010_remove_employee_hire_date_alter_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='id',
            field=models.AutoField(db_column='employers_id', primary_key=True, serialize=False),
        ),
    ]
