from django.contrib import admin
from django.conf import settings
from .models import *

class RolesAdmin(admin.ModelAdmin):
    list_display =(
        'id',
        'name',
        'fillial')
    
    list_display_links = ('id', 'name', 'fillial',)

    search_fields = ('id', 'institute__name__icontains','name',)

admin.site.register(Roles, RolesAdmin)
