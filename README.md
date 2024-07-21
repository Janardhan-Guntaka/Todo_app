Holiday Tick List
A simple task management application to help you keep track of your holiday to-dos. This project is built using the MERN stack (MongoDB, Express.js, React, Node.js).

Table of Contents
Features
Screenshots
Installation
Usage
API Endpoints
Technologies Used
Contributing
License
Features
User authentication (signup, login, logout)
Add, edit, and delete tasks
Track progress of each task with a progress bar
Responsive design
Screenshots

Installation
Follow these steps to set up the project locally:
open PSQL command line:
1.create database todoapp;

2.create table todos(
 id VARCHAR(255) PRIMARY KEY,
 user_email VARCHAR(255),
 title VARCHAR(30),
 progress INT,
 date DATE NOT NULL DEFAULT CURRENT_DATE
);

3.create table users(
email VARCHAR(255) PRIMARY KEY,
 hashed_password VARCHAR(255));
Clone the repository:

sh
git clone https://github.com/yourusername/holiday-tick-list.git
cd holiday-tick-list
Install backend dependencies:

sh

cd server
npm install
Install frontend dependencies:

sh

cd ../client
npm install
Set up environment variables:
Create a .env file in the server directory with the following content:

sh
REACT_APP_SERVERURL=http://localhost:5000
Run the backend server:

sh
cd ../server
npm start
Run the frontend server:

sh
cd ../client
npm start
Usage
Sign Up or Log In:
Access the authentication page to sign up or log in.
Add a Task:
Use the "Add New" button to create a new task.
Edit or Delete a Task:
Click the "Edit" button to modify a task.
Click the "Delete" button to remove a task.
API Endpoints
POST /signup - Create a new user
POST /login - Authenticate a user
POST /todos - Create a new task
GET /todos/:userEmail - Get all tasks for a user
PUT /todos/:id - Update a task
DELETE /todos/:id - Delete a task
Technologies Used
Frontend:
React
CSS
Backend:
Node.js
Express.js
Postgresql
Authentication:
JSON Web Tokens (JWT)
bcrypt
Contributing
Contributions are welcome! Please follow these steps:
