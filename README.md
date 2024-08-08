# Node Mongo Product API Project

## Project Overview

This project is a **Product Management System** built using **Node.js** and **MongoDB**. The system allows users to register, login, and perform CRUD (Create, Read, Update, Delete) operations on products. The project incorporates user authentication using JWT (JSON Web Token) and HTTP Basic Authentication, and includes a Docker setup for easy deployment.

### Goal:
This was a practice project to refresh the framework for myself, and it serves as a foundational example for building similar API-driven applications.

## Features

- **User Registration and Login**: Allows users to register and login to the system.
- **Product Management**: Provides APIs to create, read, update, and delete products.
- **Authentication**: Secures the application with JWT and HTTP Basic Authentication.
- **Docker Support**: Includes Dockerfile and Docker Compose for containerization.
- **Testing**: Automated tests for user registration, login, and product management using Mocha, Chai, and Chai-HTTP.

## Project Structure

### `src/`
The main source directory containing the application code.

- **`config/`**: Contains the configuration files.
  - `db.js`: Database connection setup using Mongoose.

- **`controllers/`**: Contains the controller files, responsible for handling the logic of the application.
  - `productController.js`: Handles CRUD operations for products.
  - `userController.js`: Handles user registration and login functionality using JWT.
  - `userJwtController.js`: An alternative controller for JWT-based user operations (if necessary).

- **`middlewares/`**: Contains the middleware files used to handle authentication.
  - `httpAuthMiddleware.js`: Handles HTTP Basic Authentication.
  - `jwtAuthMiddleware.js`: Handles JWT Authentication.

- **`models/`**: Contains the Mongoose schema definitions.
  - `Product.js`: Schema definition for products.
  - `User.js`: Schema definition for users.

- **`routes/`**: Contains the routing files, defining the API endpoints.
  - `productRoutes.js`: Routes related to product management.
  - `userRoutes.js`: Routes related to user registration and login.

- **`utils/`**: Contains utility files (if any) for additional helper functions.

- **`index.js`**: The entry point of the application, where the Express server is set up and routes are connected.

### `test/`
Contains test files to validate the functionality of the application.

- `registerUser.test.js`: Tests the user registration functionality.
- `loginUser.test.js`: Tests the user login functionality.

### `docker-compose.yml`
Defines the Docker services for the project, including the application and MongoDB service.

### `Dockerfile`
Contains the instructions to build the Docker image for the Node.js application.

### `nodemon.json`
Configuration file for Nodemon, specifying which files to watch and ignore during development.

### `.gitignore`
Specifies files and directories to be ignored by Git, including `node_modules`, `.env`, and others.

### `Makefile`
A file to simplify Docker commands, allowing you to build, run, and stop Docker containers easily.

### `.env`
Holds environment variables, such as database URIs and JWT secrets. (Ensure this file is not tracked by Git for security reasons.)

## Setup and Usage

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or via Docker)
- Docker (optional but recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ammar313-cs/node-mongo-product-api-project.git
   cd node-mongo-product-api-project
   
2. **Install dependencies:**
    ```bash

    npm install

3. **Example of Hoe to setup .env file:**
    ```bash

    MONGO_URI=mongodb://localhost:27017/productdb
    JWT_SECRET=your_jwt_secret
    PORT=5000

4. **Running the Application Using Node.js:**
    ```bash

    npm start
    npm run dev

5. **Using Docker(makefile):**
   ```bash

   make build
   make up
   make logs
   make down

6. **Running Tests:**
    ```bash

    npm test

