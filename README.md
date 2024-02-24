# Social Media Dashboard
## Introduction
Social Media Dashboard is a full stack application used to display the analytics of any social media post consisting of a title and a description. The dashboard is used to display the number of likes, shares and comments on the social media post. It is built using different layers such as for the business logic layer Django has been used and for the presentation layer React has been used. To store the data Django has a database of it's own which can store data in the memory and it is known as dbsqlite3.
## Prerequisites
1) NodeJs or npm installed to initiate the frontend
 ```bash
 npm install
 ```
2) For Styles, install react-bootstrap and bootstrap
```bash
npm install react-bootstrap bootstrap
```
3) For backend, firstly install pipenv to setup a virtual environment
```bash
pip install pipenv
```
4) To use then rest services provided by Django, install djangorestframework through pipenv
```bash
pipenv install djangorestframework
```
5) In order to integrate backend with frontend CORS headers are to be installed
```bash
pipenv install django-corsheaders
```
## How to run the application
For backend run the surver through following command 
```bash
python manage.py runserver
```
For frontned run the server through following command
```bash
npm start
```
## Challenges
1) The most challenging part of building the application was dealing with the CORS policies. You might receive the error that you cannot access your api because CORS policy has blocked it. You can resolve the error by adding corsmiddleware in your settings.py and allow some sources to access the headers (For more information checkout my settings.py).
2) The most frustrating challenge that I am currently facing is building logic for user authentication where only those users who have registered to the portal which have the access to manipulatde or read the dashboard.
