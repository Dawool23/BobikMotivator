from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Roles, Employee, Clients, Product, Deals
from .serializer import RolesSerializer, EmployeeSerializer, ClientsSerializer, ProductSerializer, DealsSerializer
from rest_framework import generics
from django.http import JsonResponse
from .utils import calculate_premium


class PremiumAPIView(APIView):
    def get(self, request, deal_id):
        try:
            # Проверяем, существует ли сделка
            deal = Deals.objects.get(id=deal_id)
        except Deals.DoesNotExist:
            return Response({"error": "Сделка не найдена"}, status=status.HTTP_404_NOT_FOUND)

        # Вызываем функцию расчета премии
        result = calculate_premium(deal_id)
        if "error" in result:
            return Response({"error": result["error"]}, status=status.HTTP_400_BAD_REQUEST)

        # Возвращаем результат
        return Response(result, status=status.HTTP_200_OK)

class Profile(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

class LoginAPIView(APIView):

    def post(self, request):

        data = request.data

        username = data.get('username', None)

        password = data.get('password', None)

        if username is None or password is None:

            return Response({'error': 'Нужен и логин, и пароль'},

                            status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is None:

            return Response({'error': 'Неверные данные'},

                            status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        refresh.payload.update({

            'user_id': user.id,

            'username': user.username

        })

        return Response({

            'refresh': str(refresh),

            'access': str(refresh.access_token),

        }, status=status.HTTP_200_OK)

class LogoutAPIView(APIView):

    def post(self, request):
        refresh_token = request.data.get('refresh_token') # С клиента нужно отправить refresh token

        if not refresh_token:
            return Response({'error': 'Необходим Refresh token'},

                            status=status.HTTP_400_BAD_REQUEST)
        try:

            token = RefreshToken(refresh_token)
            token.blacklist() # Добавить его в чёрный список

        except Exception as e:

            return Response({'error': 'Неверный Refresh token'},

                            status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': 'Выход успешен'}, status=status.HTTP_200_OK)
    

class RolesAPIView(generics.ListAPIView):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

class EmployeeAPIView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class ClientsAPIView(generics.ListAPIView):
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer

class ProductAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class DealsAPIView(generics.ListAPIView):
    queryset = Deals.objects.all()
    serializer_class = DealsSerializer


""" from django.db.models import Sum, Count, F, FloatField, Max, ExpressionWrapper

# Собираем данные о продажах: сумма продаж и количество транзакций
sales_data = (
    Deals.objects.values("employee_id")
    .annotate(
        total_sales=Sum("sale_amount"),
        total_transactions=Count("id")
    )
)

# Находим максимальные значения для нормализации
max_sales = sales_data.aggregate(max_sales=Max("total_sales"))["max_sales"]
max_transactions = sales_data.aggregate(max_transactions=Max("total_transactions"))["max_transactions"]

# Нормализуем данные и рассчитываем рейтинг
ranked_data = (
    sales_data.annotate(
        normalized_sales=ExpressionWrapper(
            F("total_sales") / max_sales,
            output_field=FloatField()
        ),
        normalized_transactions=ExpressionWrapper(
            F("total_transactions") / max_transactions,
            output_field=FloatField()
        ),
        rating=ExpressionWrapper(
            (F("normalized_sales") + F("normalized_transactions")) / 2,
            output_field=FloatField()
        )
    )
    .order_by("-rating")
) """
