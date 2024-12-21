# CareerFleet: JobListings-App  
*A Job Portal App (Internship Task)* 

## Overview  
CareerFleet is a robust job portal application developed as part of an internship task for *Ignis Tech Solutions*. It connects job seekers with employers, offering features to browse, and filter for job listings seamlessly.  

## Screenshots  
Below are some glimpses of the application:  

### Landing Page  
<img align="center" alt="ss1" src="/screenshots/ss1.png"> 

### Job List Page  
<img align="center" alt="ss2" src="/screenshots/ss2.png">

### Job Searching & Filtering  
<img align="center" alt="ss3" src="/screenshots/ss3.png"> 

### Application & Job Details Page  
<img align="center" alt="ss4" src="/screenshots/ss4.png"> 


### Key Features  
- Search and filter job listings.  
- View detailed job descriptions.   
- User-friendly interface optimized for desktop and mobile.  

### Tech Stack  
- **Frontend**: React.js, Tailwind CSS. 
- **Backend**: Django REST framework
- **Web Scraping**: Scrapy
- **Database**: MySQL 

### Getting Started  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/Tamoziit/JobListings-App.git  
   ```  
2. Navigate to the project directory and install dependencies:  
   ```bash  
   pip install -r requirements.txt
   cd frontend
   npm install
   ```  
3. Start the backend development server:  
   ```bash  
   cd djangoBackend
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```  
4. Scrape job website to populate the local DB:
    ```bash  
   cd job_scraper
   scrapy crawl job_spider
   ```
4. Start the React Application:
    ```bash  
   cd frontend
   npm run dev
   ```
6. Navigate to http://localhost:5173/


### Footnotes
While completing this assignment the major challenges I had to face were:
- Writing the Backend in DRF.
- Utilising a web scrapper to handle pagination.

This is how I got over thses challenges:
- I am well versed with Node + Express framework for writing robust backend applications. After figuring out the workflow of the project (by writing it in node, thats why, the project repo has 2 backend servers, one written in Node.js, the other in Django REST), all I had to adapt to was DRF syntax & environment.
- I handled the pagination by recursively scraping the GET requests on the initial first page of the given website, which eventually led to other pages.
