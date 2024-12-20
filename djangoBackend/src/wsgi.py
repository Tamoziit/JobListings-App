"""
WSGI config for djangoBackend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import logging

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')
logging.info(f"Server is starting on port {os.environ.get('DJANGO_PORT', '8000')}")

application = get_wsgi_application()
