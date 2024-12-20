from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Job
from .serializers import JobSerializer
from django.db import connections

@api_view(['GET'])
def api_status(request):
    return Response({"message": "Up and running at /api/v1"})

@api_view(['GET'])
def get_jobs(request):
    try:
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def add_job(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Job added successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_job_by_id(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        serializer = JobSerializer(job)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Job.DoesNotExist:
        return Response({"error": "Job not found"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Admin endpoint
@api_view(['POST'])
def reset_database(request):
    try:
        database_name = connections.databases['default']['NAME']

        sql_commands = [
            f"DROP DATABASE IF EXISTS {database_name};",
            f"CREATE DATABASE {database_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;",
        ]

        with connections['default'].cursor() as cursor:
            for command in sql_commands:
                cursor.execute(command)

        return Response(
            {"message": f"Database '{database_name}' has been reset successfully."},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"error": f"Failed to reset database: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )