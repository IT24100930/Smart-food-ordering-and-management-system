# Smart Food Ordering and Management System

Smart Food Ordering and Management System is a university-level full stack project built with React, Spring Boot, and MySQL. Customers can register, log in, browse foods, place orders, and track them. Admin users can view dashboard details, users, foods, and orders.

## Project Structure

```text
Smart-food-ordering-and-management-system/
├── frontend/   # React + Vite frontend
├── backend/    # Spring Boot backend
├── database/   # SQL scripts
└── README.md
```

## Technology Stack

- Frontend: React, Vite, React Router
- Backend: Spring Boot, Spring Data JPA
- Database: MySQL
- Build Tools: npm, Maven Wrapper

## Main Features

- User registration and login
- Customer and admin roles
- Food category and food listing
- Add to cart and checkout
- Order creation and order tracking
- Admin dashboard summary
- Admin order management
- Admin user management
- Add new food items from admin panel
- Simple chatbot widget on frontend

## Current Working Scope

This project is now a working MVP.

- Frontend is connected to the backend through real API calls
- Backend is connected to MySQL
- Data is stored in the database
- Demo seed data is created automatically when the backend starts

## Default Admin Account

- Email: `admin@smartfood.com`
- Password: `admin123`

## Requirements

Before running the project, make sure you have:

- Java 17
- Node.js and npm
- XAMPP MySQL running on port `3306`

## Database Setup

The backend is configured for MySQL using:

- Database name: `smart_food_db`
- Host: `localhost`
- Port: `3306`
- Default username: `root`
- Default password: blank

Backend configuration is in:

- [backend/src/main/resources/application.properties](C:/Users/USER/Documents/GitHub/Smart-food-ordering-and-management-system/backend/src/main/resources/application.properties)

If your MySQL root account has a password, update:

```properties
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
```

You can also create and inspect the database manually using:

- [database/schema.sql](C:/Users/USER/Documents/GitHub/Smart-food-ordering-and-management-system/database/schema.sql)
- [database/seed.sql](C:/Users/USER/Documents/GitHub/Smart-food-ordering-and-management-system/database/seed.sql)
- [database/queries.sql](C:/Users/USER/Documents/GitHub/Smart-food-ordering-and-management-system/database/queries.sql)

## How to Run

### 1. Start MySQL

Open XAMPP and start MySQL on port `3306`.

### 2. Run the Backend

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### 3. Run the Frontend

Open another terminal:

```bash
cd frontend
npm.cmd install
npm.cmd run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Important Frontend Config

Frontend API base URL is set in:

- [frontend/.env](C:/Users/USER/Documents/GitHub/Smart-food-ordering-and-management-system/frontend/.env)

```env
VITE_API_URL=http://localhost:8080/api
```

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

## Verified Functions

The following were checked successfully:

- Frontend production build with `npm.cmd run build`
- Backend test run with `.\mvnw.cmd test`
- `GET /api/foods`
- `GET /api/categories`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/orders`
- `GET /api/orders?email=...`
- `GET /api/admin/orders`
- `GET /api/admin/dashboard-summary`

## Useful Notes

- The backend auto-creates the database if it does not already exist.
- The backend also seeds initial categories, foods, and default users.
- Orders are stored in MySQL and visible in admin order management.
- Login does not use JWT yet. This is a simple university project MVP.

## Limitations

These parts are still simple and can be improved later:

- No JWT authentication
- No advanced role-based backend security
- No payment gateway integration
- No delete/update for every admin module
- Chatbot is still a simple frontend helper

## Recommended Next Improvements

- Add JWT authentication and protected backend routes
- Add update/delete for foods, users, and orders
- Add inventory update logic when orders are placed
- Add better reports and charts
- Add Swagger or API documentation
- Add unit and integration tests for controllers and services

## Author Note

This project is designed in a simple and understandable way, suitable for a university project submission. The structure is organized, but the code avoids unnecessary complexity so it is easier to study and explain.
