from rest_framework import serializers
from .models import Roles, Employee, Clients, Product, Deals


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    id_roles = serializers.StringRelatedField()
    fillial = serializers.CharField(source='id_roles.fillial', read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'user', 'id_roles', 'fio', 'fillial']

class ClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class DealsSerializer(serializers.ModelSerializer):
    product_id = serializers.StringRelatedField()
    employers_id = serializers.StringRelatedField()
    client_id = serializers.StringRelatedField()

    class Meta:
        model = Deals
        fields = '__all__'
