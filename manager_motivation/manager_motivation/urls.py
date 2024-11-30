from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from motivation.views import LoginAPIView, RolesAPIView, EmployeeAPIView, ClientsAPIView, ProductAPIView, DealsAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Авторизация
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login', LoginAPIView.as_view(), name='login'),
    path('api/roles', RolesAPIView.as_view(), name='roles'),
    path('api/clients', ClientsAPIView.as_view(), name='clients'),
    path('api/product', ProductAPIView.as_view(), name='product'),
    path('api/employee', EmployeeAPIView.as_view(), name='employee'),
    path('api/deals', DealsAPIView.as_view(), name='deals'),
]
