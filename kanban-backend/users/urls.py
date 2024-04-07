from django.urls import path
from users.views import CustomRegistrationView, password_reset_confirm

urlpatterns = [
    path('password-reset/confirm/<uidb64>/<token>/', password_reset_confirm, name='password_reset_confirm'),
    path('register/', CustomRegistrationView.as_view(), name='custom_register'),
]