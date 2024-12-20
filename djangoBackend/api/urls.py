from django.urls import path
from .views import api_status, get_jobs

urlpatterns = [
    path('', api_status),
    path('jobs/get-jobs', get_jobs),
]
