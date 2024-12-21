from django.db import models
from django.utils.timezone import now

class Job(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    posted_date = models.DateTimeField(default=now)
    company_logo_url = models.URLField(null=True, blank=True)
    salary = models.CharField(max_length=255, null=True, blank=True)
    company_name = models.CharField(max_length=255, default="Unknown Company")
    summary = models.TextField(null=True, blank=True)
    is_remote = models.BooleanField(default=False)
    workplace_types = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
