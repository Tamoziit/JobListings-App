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

# Admin endpoint
@api_view(['POST'])
def reset_database(request):
    """
    Drop the existing database and create a new one.
    Requires superuser privileges.
    """
    try:
        # Get the database name
        database_name = connections.databases['default']['NAME']

        # SQL commands to drop and recreate the database
        sql_commands = [
            f"DROP DATABASE IF EXISTS {database_name};",
            f"CREATE DATABASE {database_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;",
        ]

        # Execute commands using the default database connection
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