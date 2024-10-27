// src/app.js
const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My Sample App API',
        version: '1.0.0',
        description: 'API documentation for My Sample App',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'],
  };
  
// Initialize Swagger JSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to parse JSON
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');

app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);

module.exports = app;
