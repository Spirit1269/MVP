# MVP
Minimal Viable Project


This is a database for my huge yarn collection using Express.js, PostgreSQL, Docker, HTML, CSS, and Render to perform CRUD operations on yarn stash. The system includes an API that allows you to create, read, update, and delete yarn data. The user can interact with the page to perform all theses functions.

# Requirements
Node.js
PostgreSQL
Docker
Render account

# Installation
Clone this repository
Run npm install
Create a .env file
Use the following code to get started:
npm init -y
npm install
touch .env

# Environment Variables
To run this project, you will need to add the following environment variables to your .env file

DATABASE_URL=postgres://<db-user>:<db-password>@<db-host>/<db-name>

PORT=<server-port>

# Usage
To start the API server, run the following command:

node server.js
  
This will start the server on the port specified in the .env file.
Once the server is running, you can perform CRUD operations on the patient records by sending HTTP requests to the API endpoints.
The available endpoints are:
GET /api/ - get all yarn records
GET /api/:name - get a specific yarn record by name
POST /api/ - add a new yarn record
PUT /api/:id - update an existing yarn record by ID
DELETE /api/:id - delete an existing yarn record by ID
  
# Deployment
To deploy this project on Render.com, you can follow these steps:

Create a new Render.com account and sign in to the dashboard Create a new web service and choose "Web Service" as the type Choose "Node.js" as the environment and set the build command to npm install && npm run build and the start command to npm start Set the environment variables in the "Environment" section of the service settings Click "Create Web Service" to deploy the project Once the service is deployed, you can access the API by visiting the URL provided by Render.com.
