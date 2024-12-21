from django.core.management.base import BaseCommand  
from django.db import connections
from django.db.utils import OperationalError
import logging

logger = logging.getLogger('django')

class Command(BaseCommand):
    help = 'Checks the database connection'

    def handle(self, *args, **kwargs):
        try:
            connections['default'].cursor()
            self.stdout.write(self.style.SUCCESS('Database connection successful'))
            logger.info('Database connection successful')
        except OperationalError as e:
            self.stdout.write(self.style.ERROR(f'Error connecting to database: {e}'))
            logger.error(f'Error connecting to database: {e}')
