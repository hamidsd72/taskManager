# Task Management System

A full-stack task management application built with Laravel (backend) and React (frontend).

## Features

- Create, read, update, and delete tasks
- Task status management (pending, in-progress, completed)
- Due date tracking
- Responsive UI with ant design

## Technologies

- Backend: Laravel 12, PHP 8.3
- Frontend: React 19, ant design
- Database: MySQL
- Testing: PHPUnit - Feature (backend), Jest/React Testing Library (frontend)

## Prerequisites

- PHP 8.3
- Composer
- Node.js 22+
- MySQL
- Docker

## Installation

### Option 1: Local Development

#### Backend
1. Clone the repository
2. Navigate to the backend folder: `cd todo-backend`
3. Copy `.env.example` to `.env` and configure your database settings
4. Install dependencies: `composer install`
5. Generate application key: `php artisan key:generate`
6. Run migrations: `php artisan migrate`
7. Start the server: `php artisan serve`

#### Frontend
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Option 2: Docker

1. Install Docker and Docker Compose
2. Run `docker-compose up --build`
3. Access the application at `http://localhost:8080`

## Testing

#### Backend tests
```bash
cd todo-backend
php artisan test