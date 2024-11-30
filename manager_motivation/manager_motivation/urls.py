from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from motivation.views import LoginAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
]
