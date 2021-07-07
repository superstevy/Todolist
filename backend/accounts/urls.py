from django.urls import path
from knox import views as knox_views
from .views import RegisterAPI, LoginAPI, userList

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/<int:pk>/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/user-list/', userList.as_view(), name='user-list'),
]
