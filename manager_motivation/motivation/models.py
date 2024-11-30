from django.db import models
from django.conf import settings
from djmoney.models.fields import MoneyField
from datetime import datetime
from django.core.validators import MaxValueValidator, MinValueValidator


class Roles(models.Model):
    ROLES_CHOICES = [
        ('Менеджер', 'Менеджер'),
        ('Директор филиала', 'Директор филиала'),
        ('Генеральный директор', 'Генеральный директор'),
    ]

    id = models.AutoField(primary_key=True, db_column='id')
    name = models.CharField(max_length=50, choices=ROLES_CHOICES, db_column='name', verbose_name='Название роли')
    fillial = models.CharField(max_length=50, db_column='fillial', verbose_name='Филлиал', null=True, blank=True)

    class Meta:
        db_table = 'roles'
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'

    def __str__(self):
        return self.name
    
class Employee(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    fio = models.CharField(max_length=150, db_column='FIO', verbose_name='ФИО')
    id_roles = models.ForeignKey(Roles, on_delete=models.CASCADE, db_column='id_roles', verbose_name='Роль')

    class Meta:
        db_table = 'employee'
        verbose_name = 'Сотрудника'
        verbose_name_plural = 'Сотрудники'

    def __str__(self):
        #return str(f"{self.fio} | {self.id_roles}")
        return self.fio
    
class Clients(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    name = models.CharField(max_length=50, db_column='name', verbose_name='ФИО')

    class Meta:
        db_table = 'clients'
        verbose_name = 'Клиента'
        verbose_name_plural = 'Клиенты'

    def __str__(self):
        #return f"{self.name}"
        return self.name
    
class Product(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    name = models.CharField(max_length=50, db_column='name', verbose_name='Название товара')
    price = models.DecimalField(max_digits=12, decimal_places=2, db_column='price', verbose_name='Стоимость', default=0.00)
    percent = models.DecimalField(max_digits=4, 
                                  decimal_places=3, 
                                  validators=[
                                      MaxValueValidator(1.000),  # Максимальное значение
                                      MinValueValidator(0.000),  # Минимальное значение
                                      ],
                                      db_column='percent', verbose_name='Процент', default=0.000)
    description = models.CharField(max_length=300, db_column='description', verbose_name='Описание', null=True, blank=True)

    class Meta:
        db_table = 'product'
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    def __str__(self):
        #return f"{self.name} | Стоимость: {self.price}"
        return self.name

class Deals(models.Model):
    STATUS_CHOICES = [
        ('Не завершено', 'Не завершено'),
        ('Завершено', 'Завершено'),
        ('Отклонено', 'Отклонено'),
    ]

    PAYMENT_TYPE_CHOICES = [
        ('Наличные', 'Наличные'),
        ('Банковская карта', 'Банковская карта'),
        ('Кредит', 'Кредит'),
    ]

    id = models.AutoField(primary_key=True, db_column='id')
    employers_id = models.ForeignKey(Employee, on_delete=models.CASCADE, db_column='employers_id', verbose_name='Сотрудник')
    client_id = models.ForeignKey(Clients, on_delete=models.CASCADE, db_column='client_id', verbose_name='Клиент')
    date =  models.DateTimeField(db_column='date', verbose_name='Дата', default=datetime.now)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, db_column='product_id', verbose_name='Товар')
    payment_type = models.CharField(max_length=50, choices=PAYMENT_TYPE_CHOICES, db_column='payment_type', verbose_name='Тип оплаты', default='Наличные')
    sum =  models.DecimalField(max_digits=12, decimal_places=2, db_column='sum', verbose_name='Сумма', default=0.00)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, db_column='status', verbose_name='Статус', default='Не завершено')

    class Meta:
        db_table = 'deals'
        verbose_name = 'Сделку'
        verbose_name_plural = 'Сделки'

    def __str__(self):
        return f"Сделка {self.id}: {self.client_id} - {self.product_id} ({self.status} {self.sum})"
