# Lambda Notes

Note taking app that allows people to create personal notes, search for a specific note, and filter notes by assigned tag.

- Deployed Site:
  - https://lambda-notes-application.netlify.com

Tech:

- [React](https://reactjs.org/docs/getting-started.html)
- [Redux](https://redux.js.org/)
- [Django](https://docs.djangoproject.com/en/2.1/)
- [Django REST framework](https://www.django-rest-framework.org/)
- [Django REST framework JWT](http://getblimp.github.io/django-rest-framework-jwt/)
- [PostgreSQL]()

# How to start a local instance:

This app uses Django 2.1.2, Python 3.6, and React 16.3.

This project is broken up into a backend and frontend. The backend contains the Django project which uses the Django Rest Framework to host a simple API. The frontend uses React and queries data from the API.

- fork/clone repo

1. navigate into root directory
2. to start the backend server:
   - `cd backend/src`
   - `Create and activate a virtual environment`
   - `Run pip install -r requirements.txt`
   - `In /lambda_notes/settings.py change line 157 to CORS_ORIGIN_ALLOW_ALL = True`
   - `python manage.py runserver`

- Django server will be running at http://localhost:8000/

3.  to start the front end:
    - `cd frontend/lambda_notes`
    - `yarn install`
    - `yarn start`

- local host will be at http://localhost:3000/
