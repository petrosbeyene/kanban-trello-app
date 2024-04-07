from django.shortcuts import render
from django.http import HttpResponseRedirect

from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer


class CustomRegistrationView(RegisterView):
    serializer_class = CustomRegisterSerializer


def password_reset_confirm(request, uidb64, token):
    spa_url = f"http://localhost:5173/reset-password/{uidb64}/{token}/"
    return HttpResponseRedirect(spa_url)
