from django.urls import path
from .views import api_status

urlpatterns = [
    path('', api_status),
]
