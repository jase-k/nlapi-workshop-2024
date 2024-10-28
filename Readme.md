# NLAPI Integration Workshop
This repository is designed for a coding bootcamp workshop, showing how to integrate the NLAPI API to create a conversational experience within an app. The project includes both a backend (Node.js, Express, Sequelize, JWT) and a frontend (React), and automatically generates API documentation using Swagger (OpenAPI).

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation and Setup](#installation-and-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **Sequelize**: ORM (Object-Relational Mapper) for PostgreSQL.
- **PostgreSQL**: Relational database. + PGVector (Vector Search) + TGRM (Fuzzy Search)
- **JWT (jsonwebtoken)**: User authentication via JSON Web Tokens.
- **Bcrypt**: Password hashing.
- **Swagger**: Auto-generated API documentation with OpenAPI specification.
- **dotenv**: Manage environment variables.
- **Nodemon**: Auto-reloading during development.

## Frontend

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for API requests.
- **React Router**: Client-side routing for React applications.
- **Create React App (CRA)**: Tool for creating React applications with no build configuration.

## Features

- **User Authentication**: JWT-based authentication with hashed passwords (using bcrypt).
- **Database Integration**: PostgreSQL setup with Sequelize ORM, including User and Company models.
- **API Documentation**: Swagger UI integration for auto-generated OpenAPI docs.
- **Proxy Setup**: Create React App proxy for seamless API requests during development.
- **Scalable Architecture**: Separate backend and frontend for easy development and deployment.

## Folder Structure
```bash
my-app/
├── client/                     # React frontend (created using Create React App)
├── src/
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Entry point for the Node.js server
│   ├── config/                 # Configuration files (e.g., database setup)
│   ├── controllers/            # Controllers for handling API requests
│   ├── middlewares/            # Middleware (e.g., JWT authentication)
│   ├── models/                 # Sequelize models (User, Company)
│   ├── routes/                 # API route definitions
├── .env                        # Environment variables (ignored by Git)
├── package.json                # NPM dependencies and scripts for the backend
├── README.md                   # Project documentation (this file)
└── .gitignore                  # Files and directories to be ignored by Git
```

## Installation and Setup

### Prerequisites:
- Node.js (v14 or higher): Download and install Node.js
- PostgreSQL: Make sure PostgreSQL is installed and running. Download PostgreSQL

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone git@github.com:jase-k/nlapi-workshop-2024.git
    cd nlapi-workshop-2024
    ```

2. **Install backend dependencies:**

    ```bash
    npm install
    ```

3. **Set up the environment variables:**

    Create a `.env` file in the root directory and add the following content:

    ```bash
    DB_NAME=sample_db
    DB_USER=my_username
    DB_PASSWORD=my_password
    DB_HOST=localhost
    DB_DIALECT=postgres
    JWT_SECRET=my_jwt_secret
    ```

    Make sure to replace `sample_db`, `my_username`, `my_password`, and `my_jwt_secret` with your actual PostgreSQL credentials and a secret key for JWT.

4. **Set up the PostgreSQL database:**

    Ensure your PostgreSQL server is running. Then, create a new database with the name you provided in the `.env` file (e.g., `sample_db`).

    The following command will:
    - Run a new PostgreSQL container named `pg` with the specified environment variables for database name, user, and password.
    - Map the container's port 5432 to the host's port 5444.
    - Load the `pg_trgm` extension for PostgreSQL.
    - Wait for another 3 seconds to ensure the container is fully up and running.
    - Execute a command inside the running container to create the `pg_trgm` extension if it doesn't already exist.

    ```bash
    docker run -d --name pg -e POSTGRES_DB=sample_db -e POSTGRES_USER=my_username -e POSTGRES_PASSWORD=my_password -p 5444:5432 postgres:latest -c 'shared_preload_libraries=pg_trgm' && sleep 3 && docker exec pg psql -U my_username -d sample_db -c 'CREATE EXTENSION IF NOT EXISTS pg_trgm;'
    ```

5. **Sync the database and run the server:**

    ```bash
    npm run dev
    ```

    This will start the Express server with Nodemon (for hot-reloading) and sync the database with Sequelize models.

6. **Confirm Backend is Working:**
Navigate to localhost:3303/api-docs and you should see your swagger docs. 

### Frontend Setup

1. **Navigate to the client directory:**

    ```bash
    cd client
    ```

2. **Install frontend dependencies:**

    ```bash
    npm install
    ```

3. **Proxy Configuration:**

    The React app is set up to proxy API requests to the backend. In `client/package.json`, you'll find the following proxy setting:

    ```json
    "proxy": "http://localhost:3000"
    ```

    This ensures that requests from the frontend are forwarded to the backend during development.

4. **Start the frontend:**

    ```bash
    npm start
    ```

    This will start the React app in development mode and open it in your browser at `http://localhost:3000`.


### API Documentation

The backend API is automatically documented using Swagger. To view the API documentation:

1. **Run the backend server:**

    ```bash
    npm run dev
    ```

2. **Open your browser and navigate to:**

    ```bash
    http://localhost:3303/api-docs
    ```

    Here, you can view and test all the available API endpoints directly from the Swagger UI.


