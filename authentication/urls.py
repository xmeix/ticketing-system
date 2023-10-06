from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/',views.user_login,name='login'),  
    path('register/',views.register,name='register'),  
    path('logout/',views.user_logout,name='logout'),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected_view/', views.protected_view, name='protected_view'),  # JWT Authentication
]
  