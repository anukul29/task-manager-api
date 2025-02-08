# Task Management API

A simple Task Management API that allows users to manage tasks with basic JWT-based authentication.

## Features

- User Registration and Login
- JWT Authentication
- Create, Read, Update, Delete (CRUD) tasks
- Mark tasks as complete
- Add due dates
- List tasks with filters (status, due date)
- Basic Validation
- Unit Tests with Jest & Supertest

## Technology Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JSON Web Token (JWT)**
- **express-validator** for validations
- **bcryptjs** for password hashing
- **Jest** and **Supertest** for testing
- **morgan** for logging

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or remote)

## API Endpoints

### Register a New User
- **Endpoint**: `POST /api/users/register`
- **Request Body**:

- "username": "johndoe",
- "password": "secret123"

- **Response**:
- "username": "johndoe",
- "password": "secret123"


### Login
- **Endpoint**: `POST /api/users/login`
- **Request Body**:

- "username": "johndoe",
- "password": "secret123"

- **Response**:
-  "message": "Login successful",
-  "token": "<JWT_TOKEN>"


### Create Task
- **Endpoint**: `POST /api/tasks`
- **Request Body**:
-  "title": "Design Homepage",
-  "description": "Create wireframes and mockups",
-  "dueDate": "2025-12-31"

- **Response**:
-  "message": "Task created",
-  "task": 
-    "_id": "<task_id>",
-    "user": "<user_id>",
-    "title": "Design Homepage",
-    "description": "Create wireframes and mockups",
-    "dueDate": "2025-12-31T00:00:00.000Z",
-    "status": "pending",


### Get Tasks
- **Endpoint**: `GET /api/tasks`
- **Query Parameters**:
-   "status → Filter by pending or completed"
-   "dueBefore → Tasks with dueDate on or before this date"
-   "dueAfter → Tasks with dueDate on or after this date"

- **Request Body**:
-   "GET /api/tasks?status=pending&dueBefore=2025-12-31"

- **Response**:
-    "_id": "<task_id>",
-    "title": "Design Homepage",
-    "description": "Create wireframes",
-    "dueDate": "2025-12-31T00:00:00.000Z",
-    "status": "pending",
-    "..."


### Get Task
- **Endpoint**: `GET /api/tasks/:id`

- **Response**:
```
{
  "_id": "<task_id>",
  "title": "Design Homepage",
  "description": "Create wireframes",
  "dueDate": "2025-12-31T00:00:00.000Z",
  "status": "pending",
  ...
}
```


### Update Task
- **Endpoint**: `PUT /api/tasks/:id`

- **Request Body**:
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "dueDate": "2025-10-10",
  "status": "completed"
}
```


- **Response**:
```json
{
  "message": "Task updated",
  "task": {
    "_id": "<task_id>",
    "title": "Updated Title",
    "description": "Updated description",
    "dueDate": "2025-10-10T00:00:00.000Z",
    "status": "completed",
    ...
  }
}
```


### Mark Task as Complete
- **Endpoint**: `PATCH /api/tasks/:id/complete`

- **Response**:
```json
{
  "message": "Task marked as completed",
   "task": 
     "_id": "<task_id>",
     "status": "completed",
     "..."
}
```

### Delete
- **Endpoint**: `DELETE /api/tasks/:id`

- **Response**:
```
{
  "message": "Task deleted"
}
```