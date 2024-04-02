from django.urls import path
from users.views import CustomRegistrationView

urlpatterns = [
    path('register/', CustomRegistrationView.as_view(), name='custom_register'),
]
