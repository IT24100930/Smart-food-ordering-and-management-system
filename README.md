# Smart Food Ordering and Management System

This is a full stack university project built with React, Spring Boot, and MySQL.

The system includes:

- customer registration and login
- food browsing by category
- cart and checkout flow
- order placement and order tracking
- admin dashboard
- admin food, user, and order management

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Spring Boot, Spring Data JPA
- Database: MySQL
- Tools: npm, Maven Wrapper

## Project Structure

```text
Smart-food-ordering-and-management-system/
|- frontend/
|- backend/
|- database/
`- README.md
```

## Prerequisites

Make sure you have these installed before running the project:

- Java 17
- Node.js and npm
- XAMPP or MySQL Server

## Database Requirements

The backend is configured to use MySQL with these default values:

- Host: `localhost`
- Port: `3306`
- Database: `smart_food_db`
- Username: `root`
- Password: blank

Backend configuration file:

- `backend/src/main/resources/application.properties`

If your MySQL username or password is different, update these lines:

```properties
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
```

You can also use the SQL files in the `database` folder:

- `database/schema.sql`
- `database/seed.sql`
- `database/queries.sql`

Note:
- The backend already uses `createDatabaseIfNotExist=true`
- The backend also seeds default categories, foods, and users automatically on startup

## Default Admin Account

Use this account to log in as admin:

- Email: `admin@smartfood.com`
- Password: `admin123`

## Setup Instructions

### 1. Start MySQL

If you are using XAMPP:

1. Open XAMPP Control Panel
2. Start `MySQL`
3. Make sure it runs on port `3306`

### 2. Run the Backend

Open a terminal in the project root and run:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

If you are not on Windows, use:

```bash
cd backend
./mvnw spring-boot:run
```

### 3. Run the Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Frontend Environment

Frontend environment file:

- `frontend/.env`

Current API configuration:

```env
VITE_API_URL=http://localhost:8080/api
```

If your backend runs on a different host or port, update this value.

## How to Use the Project

### Customer Flow

1. Open `http://localhost:5173`
2. Register a new account
3. Log in
4. Open the menu
5. Add food items to the cart
6. Checkout and place an order
7. View the order in the orders page

### Admin Flow

1. Log in with `admin@smartfood.com`
2. Open the admin dashboard
3. View users
4. View orders
5. Add food items
6. Check dashboard summary values

## Main API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Categories

- `GET /api/categories`

### Foods

- `GET /api/foods`
- `POST /api/foods`

### Orders

- `GET /api/orders?email=user@email.com`
- `POST /api/orders`

### Admin

- `GET /api/admin/dashboard-summary`
- `GET /api/admin/users`
- `GET /api/admin/orders`

## Verified Working Parts

The following parts were tested successfully:

- frontend build using `npm run build`
- backend test using `.\mvnw.cmd test`
- food loading from backend
- category loading from backend
- user registration
- user login
- order creation
- order loading by email
- admin orders endpoint
- admin dashboard summary endpoint

## Troubleshooting

### MySQL connection error

Check these:

- MySQL is running in XAMPP
- port `3306` is not blocked
- username and password in `application.properties` are correct

### Frontend cannot connect to backend

Check these:

- backend is running on `http://localhost:8080`
- frontend `.env` contains `VITE_API_URL=http://localhost:8080/api`
- no firewall is blocking local ports

### PowerShell blocks npm

If `npm` gives a PowerShell script error, use:

```bash
npm.cmd install
npm.cmd run dev
```

### Maven command not found

Use the Maven wrapper included in the project:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

## Limitations

This project is working as an MVP, but some parts are still simple:

- no JWT authentication
- no advanced backend authorization
- no real payment gateway
- no full update/delete support in every admin module
- chatbot is a simple helper widget

## Future Improvements

- add JWT authentication
- add update and delete for foods and orders
- reduce food stock automatically after checkout
- improve reports and charts
- add Swagger API documentation
- add more backend tests

## Summary

This project is ready to run for development and demonstration. It is designed to stay simple and understandable for a university submission while still using a real backend and MySQL database.
