const sequelize = require('../src/config/database');
const _models = require('../src/models'); // Import all models so they are registered with sequelize

async function syncDatabase() {

  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Drop the database
    await sequelize.drop({ cascade: true, logging: true });
    console.log('Database dropped...');

    await sequelize.sync({ force: true, alter: true });
    console.log('Database & tables synced!');
  } catch (err) {
    console.error('Unable to sync the database:', err);
  }
}

syncDatabase();
