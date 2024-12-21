from django.urls import path
from .views import api_status, get_jobs, add_job, reset_database

urlpatterns = [
    path('', api_status),
    path('jobs/get-jobs', get_jobs),
    path('jobs/add-job', add_job),
    path('db/reset', reset_database),
]
