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
- **PostgreSQL**: Relational database.
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
### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install backend dependencies:**

    ```bash
    npm install
    ```

3. **Set up the environment variables:**

    Create a `.env` file in the root directory and add the following content:

    ```bash
    DB_NAME=my_database
    DB_USER=my_username
    DB_PASSWORD=my_password
    DB_HOST=localhost
    DB_DIALECT=postgres
    JWT_SECRET=my_jwt_secret
    ```

    Make sure to replace `my_database`, `my_username`, `my_password`, and `my_jwt_secret` with your actual PostgreSQL credentials and a secret key for JWT.

4. **Set up the PostgreSQL database:**

    Ensure your PostgreSQL server is running. Then, create a new database with the name you provided in the `.env` file (e.g., `my_database`).

    ```bash
    createdb my_database
    ```

5. **Sync the database and run the server:**

    ```bash
    npm run dev
    ```

    This will start the Express server with Nodemon (for hot-reloading) and sync the database with Sequelize models.

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

### Running the Application

To run the entire application (both backend and frontend):

1. **Backend:**

    In the root of the project, run:

    ```bash
    npm run dev
    ```

    This starts the backend server on `http://localhost:3000`.

2. **Frontend:**

    In a separate terminal, navigate to the client folder and run:

    ```bash
    cd client
    npm start
    ```

    This starts the frontend server (React) and proxies API requests to the backend.

### API Documentation

The backend API is automatically documented using Swagger. To view the API documentation:

1. **Run the backend server:**

    ```bash
    npm run dev
    ```

2. **Open your browser and navigate to:**

    ```bash
    http://localhost:3000/api-docs
    ```

    Here, you can view and test all the available API endpoints directly from the Swagger UI.

### Project Features

**User Authentication**

- Register: `POST /api/users/register`
- Login: `POST /api/users/login`
- Get Profile: `GET /api/users/profile` (requires JWT token)

**Company Management**

- Create a Company: `POST /api/companies`
- Get All Companies: `GET /api/companies`
- Get a Company by ID: `GET /api/companies/:id`

### Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Contact

For any questions or feedback, feel free to reach out to the repository owner.

With this README.md, your repository will be well-documented, and users will have clear instructions on how to set up and run the project, as well as an understanding of the technologies and structure used in the application. Let me know if you'd like to adjust or add more details!
