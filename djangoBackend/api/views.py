from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Job
from .serializers import JobSerializer

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
