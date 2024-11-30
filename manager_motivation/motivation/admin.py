from django.contrib import admin
from django.conf import settings
from .models import *

class RolesAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'fillial')
    
    list_display_links = ('id', 'name', 'fillial',)

    search_fields = (
        )

admin.site.register(Roles, RolesAdmin)

class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'fio',
        'id_roles')
    
    list_display_links = (
        'id',
        'user',
        'fio',
        'id_roles')

    search_fields = ()

admin.site.register(Employee, EmployeeAdmin)

class ClientsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',)
    
    list_display_links = (
        'id',
        'name',)

    search_fields = ()

admin.site.register(Clients, ClientsAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'price',
        'percent',
        'description',)
    
    list_display_links = (
        'id',
        'name',
        'price',
        'percent',
        'description',)

    search_fields = ()

admin.site.register(Product, ProductAdmin)

class DealsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'employers_id',
        'client_id',
        'date',
        'product_id',
        'payment_type',
        'sum',
        'status',)
    
    list_display_links = (
        'id',
        'employers_id',
        'client_id',
        'date',
        'product_id',
        'payment_type',
        'sum',
        'status',)

    search_fields = ()

admin.site.register(Deals, DealsAdmin)

