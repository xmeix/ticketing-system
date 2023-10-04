from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('login/',views.user_login,name='login'),  
    path('register/',views.register,name='register'),  
    path('logout/',views.user_logout,name='logout'),  
    # path('addticket/',views.addticket,name='addticket'),  
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh')
]