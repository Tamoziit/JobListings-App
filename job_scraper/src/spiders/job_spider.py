import scrapy
import requests
from urllib.parse import urlencode

class JobSpider(scrapy.Spider):
    name = 'job_spider'

    api_url = 'https://job-search-api.svc.dhigroupinc.com/v1/dice/jobs/search'

    headers = {
        'x-api-key': '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8',
    }

    params = {
        'q': 'Software',
        'countryCode2': 'US',
        'radius': '30',
        'radiusUnit': 'mi',
        'page': '1',
        'pageSize': '20',
        'facets':
        'employmentType|postedDate|workFromHomeAvailability|workplaceTypes|employerType|easyApply|isRemote|willingToSponsor',
        'filters.workplaceTypes': 'Remote',
        'filters.employmentType': 'CONTRACTS',
        'filters.postedDate': 'ONE',
        'currencyCode': 'USD',
        'fields':
        'id|jobId|guid|summary|title|postedDate|modifiedDate|jobLocation.displayName|detailsPageUrl|salary|clientBrandId|companyPageUrl|companyLogoUrl|companyLogoUrlOptimized|positionId|companyName|employmentType|isHighlighted|score|easyApply|employerType|workFromHomeAvailability|workplaceTypes|isRemote|debug|jobMetadata|willingToSponsor',
        'culture': 'en',
        'recommendations': 'true',
        'interactionId': '0',
        'fj': 'true',
        'includeRemote': 'true',
    }

    def start_requests(self):
        # URL with query parameters
        url = f"{self.api_url}?{urlencode(self.params)}"

        yield scrapy.Request(
            url=url,
            headers=self.headers,
            method='GET',
            callback=self.parse,
        )

    def parse(self, response):
        jobs = response.json().get('data', [])

        for job in jobs:
            job_data = self.extract_job_data(job)

            if not job_data:
                self.logger.warning("Skipped invalid job data")
                continue

            # POST the validated data to the Django backend
            try:
                django_response = requests.post(
                    'http://127.0.0.1:8000/api/v1/jobs/add-job',
                    json=job_data,
                    headers={'Content-Type': 'application/json'}
                )

                if django_response.status_code == 201:
                    self.logger.info(f"Job added successfully: {job_data['title']}")
                else:
                    self.logger.error(f"Failed to add job: {django_response.json()}")

            except Exception as e:
                self.logger.error(f"Error while sending data to Django: {e}")

        # Handling pagination if more pages are available
        next_page = response.json().get('meta', {}).get('nextPage')
        if next_page:
            self.params['page'] = str(int(self.params['page']) + 1)
            url = f"{self.api_url}?{urlencode(self.params)}"
            yield scrapy.Request(
                url=url,
                headers=self.headers,
                method='GET',
                callback=self.parse,
            )

    def extract_job_data(self, job):
        try:
            job_data = {
                'id': job.get('id', '').strip(),
                'title': job.get('title', '').strip(),
                'posted_date': job.get('postedDate', '').strip(),
                'company_logo_url': job.get('companyLogoUrl', '').strip(),
                'company_page_url': job.get('companyPageUrl', '').strip(),
                'salary': job.get('salary', '').strip(),
                'company_name': job.get('companyName', '').strip(),
                'summary': job.get('summary', '').strip(),
                'location': job.get('jobLocation', {}).get('displayName', '').strip(),
                'is_remote': job.get('isRemote', False),
                'workplace_types': job.get('workplaceTypes', []),
            }

            if not job_data['id'] or not job_data['title']:
                return None

            return job_data
        except Exception as e:
            self.logger.error(f"Error extracting job data: {e}")
            return None
