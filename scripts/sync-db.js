const sequelize = require("../src/config/database");

const PORT = process.env.PORT || 3303;

// Test database connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database & tables synced!");
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });
