const sequelize = require('../src/config/database');
const User = require('../src/models/User');
const Company = require('../src/models/Company');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Database connected...');

    // Clear the database
    await sequelize.drop({cascade: true});
    console.log('Database cleared!');

    // Sync the models
    await sequelize.sync({ force: true });
    console.log('Database & tables synced!');

    // Create a company
    const company = await Company.create({
      name: 'Looney Tunes Inc.',
      address: '123 Business Rd.',
    });

    // Hash passwords
    const hashedPasswords = await Promise.all([
      bcrypt.hash('CarrotLover123', 10),
      bcrypt.hash('QuackQuack123', 10),
      bcrypt.hash('HuntWabbits123', 10),
      bcrypt.hash('RoadRunner123', 10),
      bcrypt.hash('RootinTootin123', 10),
    ]);

    // Create users with funny names
    const users = await User.bulkCreate([
      {
        name: 'Bugs Bunny',
        email: 'bugs.bunny@example.com',
        password: hashedPasswords[0],
        companyId: company.id,
      },
      {
        name: 'Daffy Duck',
        email: 'daffy.duck@example.com',
        password: hashedPasswords[1],
        companyId: company.id,
      },
      {
        name: 'Elmer Fudd',
        email: 'elmer.fudd@example.com',
        password: hashedPasswords[2],
        companyId: company.id,
      },
      {
        name: 'Wile E. Coyote',
        email: 'wile.e.coyote@example.com',
        password: hashedPasswords[3],
        companyId: company.id,
      },
      {
        name: 'Yosemite Sam',
        email: 'yosemite.sam@example.com',
        password: hashedPasswords[4],
        companyId: company.id,
      },
    ]);

    console.log('Seeding successful!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

seedDatabase();

