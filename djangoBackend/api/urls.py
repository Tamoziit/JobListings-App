from django.urls import path
from .views import api_status, get_jobs, add_job, get_job_by_id, reset_database

urlpatterns = [
    path('', api_status),
    path('jobs/get-jobs', get_jobs),
    path('jobs/add-job', add_job),
    path('jobs/<str:job_id>', get_job_by_id),
    path('db/reset', reset_database),
]
