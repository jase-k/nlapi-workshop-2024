// src/app.js
const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const fs = require("fs");
const path = require("path");

require('dotenv').config();

app.use(cors());
// Swagger options
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My Recipe App API',
        version: '1.0.0',
        description: 'API documentation for My Recipe App',
      },
      servers: [
        {
          url: 'http://localhost:3303',
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
    apis: ["./src/routes/*.js", "./src/models/*.js"],
  };
  
// Initialize Swagger JSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Save the latest swagger docs to a file
const swaggerFileName = process.env.NLAPI_SCHEMA_NAME;
console.log("swaggerFileName", swaggerFileName);
const swaggerOutputPath = path.join(__dirname, `../${swaggerFileName}.swagger.json`);
fs.writeFileSync(swaggerOutputPath, JSON.stringify(swaggerDocs, null, 2), 'utf-8');

// Swagger UI setup
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to parse JSON
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const nlapiRoutes = require("./routes/nlapiRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const shoppingListItemRoutes = require("./routes/shoppingListItemRoutes");
const slackRoutes = require("./routes/slackRoutes");

app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/nlapi", nlapiRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/shopping-list", shoppingListItemRoutes);
app.use("/api/slack", slackRoutes);

module.exports = app;
