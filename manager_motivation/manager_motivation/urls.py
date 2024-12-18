from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from motivation.views import LoginAPIView, LogoutAPIView, RolesAPIView, EmployeeAPIView, ClientsAPIView, ProductAPIView, DealsAPIView, PremiumAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Авторизация
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login', LoginAPIView.as_view(), name='login'),
    path('api/logout', LogoutAPIView.as_view(), name='logout'),
    path('api/roles', RolesAPIView.as_view(), name='roles'),
    path('api/clients', ClientsAPIView.as_view(), name='clients'),
    path('api/product', ProductAPIView.as_view(), name='product'),
    path('api/employee', EmployeeAPIView.as_view(), name='employee'),
    path('api/deals', DealsAPIView.as_view(), name='deals'),
     path('api/premium/<int:deal_id>/', PremiumAPIView.as_view(), name='premium_api'),
]
