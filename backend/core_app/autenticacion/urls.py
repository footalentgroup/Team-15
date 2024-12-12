from django.urls import path
from autenticacion.views import BasicLoginView, DeleteUserView, GoogleOAuthService, RegisterUserView, UpdateUserView

urlpatterns = [
    path('google-login/', GoogleOAuthService.as_view(), name='google-oauth'),
    path('basic-login/', BasicLoginView.as_view(), name='basic-login'),
    path('basic-register/', RegisterUserView.as_view(), name='register'),
    path('update/<int:pk>/', UpdateUserView.as_view(), name='update-user'),
    path('delete/<int:pk>/', DeleteUserView.as_view(), name='delete-user'),
]