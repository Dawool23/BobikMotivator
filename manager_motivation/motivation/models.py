from django.db import models
from django.conf import settings
from djmoney.models.fields import MoneyField


class Roles(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    name = models.CharField(max_length=50, db_column='name', verbose_name='Название роли')
    fillial = models.CharField(max_length=50, db_column='fillial', verbose_name='Филлиал')

    class Meta:
        db_table = 'roles'
        verbose_name = 'Роли'
        verbose_name_plural = 'Роли'

    def __str__(self):
        return self.name
    
class Employee(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    fio = models.CharField(max_length=150, db_column='FIO', verbose_name='ФИО')
    mail = models.CharField(max_length=100, db_column='mail', verbose_name='Email')
    id_roles = models.ForeignKey(Roles, on_delete=models.CASCADE, db_column='id_roles', verbose_name='Роль')

    class Meta:
        db_table = 'employee'
        verbose_name = 'Сотрудники'
        verbose_name_plural = 'Сотрудники'

    def __str__(self):
        return self.fio
    
class Clients(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    name = models.CharField(max_length=50, db_column='name', verbose_name='ФИО')

    class Meta:
        db_table = 'clients'
        verbose_name = 'Клиенты'
        verbose_name_plural = 'Клиенты'

    def __str__(self):
        return self.name
    
class Product(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    name = models.CharField(max_length=50, db_column='name', verbose_name='Название товара')
    price = MoneyField(max_digits=12, decimal_places=2, default_currency='RUB', db_column='price', verbose_name='Стоимость')
    percent = models.DecimalField(max_digits=4, decimal_places=2, db_column='percent', verbose_name='Процент')
    description = models.CharField(max_length=300, db_column='description', verbose_name='Описание')

    class Meta:
        db_table = 'product'
        verbose_name = 'Товвр'
        verbose_name_plural = 'Товар'

    def __str__(self):
        return self.name

class Deals(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    employers_id = models.ForeignKey(Employee, on_delete=models.CASCADE, db_column='employers_id', verbose_name='Сотрудник')
    client_id = models.ForeignKey(Clients, on_delete=models.CASCADE, db_column='client_id', verbose_name='Клиент')
    date =  models.DateTimeField(db_column='date', verbose_name='Дата')
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, db_column='product_id', verbose_name='Товар')
    payment_type = models.CharField(max_length=50, db_column='payment_type', verbose_name='Тип оплаты')
    sum = MoneyField(max_digits=12, decimal_places=2, default_currency='RUB', db_column='sum', verbose_name='Сумма')
    status = models.CharField(max_length=50, db_column='status', verbose_name='Статус')

    class Meta:
        db_table = 'deals'
        verbose_name = 'Сделки'
        verbose_name_plural = 'Сделки'

    def __str__(self):
        return self.employers_id
    
""" class Payment(models.model):
    id = models.AutoField(primary_key=True, db_column='id')
    deals_id = models.ForeignKey(Deals, on_delete=models.CASCADE, db_column='id', verbose_name='Сделка')
    payment_sum = MoneyField(max_digits=12, decimal_places=2, default_currency='RUB', db_column='payment_sum', verbose_name='Сумма оплаты')
    status = models.CharField(max_length=50, db_column='status', verbose_name='Статус')
    type = models.CharField(max_length=50, db_column='type', verbose_name='Тип оплаты')
    date =  models.DateTimeField(db_column='date', verbose_name='Дата')

    class Meta:
        db_table = 'payment'
        verbose_name = 'Оплата'
        verbose_name_plural = 'Оплата'

    def __str__(self):
        return self.payment_sum """

