from django.urls import path
from .views import *

urlpatterns = [
    path('api/dashboard', DashboardView.as_view(),name='dashboard'),
    path('api/auth/register', UserRegister.as_view(),name='register'),
    path('api/auth/login', UserLogin.as_view(),name='login'),
    path('api/auth/logout', UserLogout.as_view(),name='logout'),
    path('api/auth/user', UserView.as_view(),name='user')
]