const sequelize = require('../src/config/database');
const { User, Company, Ingredient, Recipe, RecipeIngredient } = require('../src/models');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Database connected...');

    // Clear the database
    await sequelize.drop({ cascade: true });
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

    // Create ingredients
    const ingredients = await Ingredient.bulkCreate([
      { name: 'Tomato' },
      { name: 'Spaghetti' },
      { name: 'Ground Beef' },
      { name: 'Onion' },
      { name: 'Garlic' },
      { name: 'Olive Oil' },
      { name: 'Salt' },
      { name: 'Pepper' },
    ]);

    // Create recipes
    const recipes = await Recipe.bulkCreate([
      {
        title: 'Spaghetti Bolognese',
        instructions: 'Cook spaghetti, prepare sauce, mix together',
      },
      {
        title: 'Tomato Soup',
        instructions: 'Cook tomatoes, blend, season, and serve',
      },
    ]);

    // Create recipe ingredients
    await RecipeIngredient.bulkCreate([
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[0].id,
        quantity: 200,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[1].id,
        quantity: 100,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[2].id,
        quantity: 300,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[3].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[4].id,
        quantity: 2,
        unitOfMeasure: 'cloves',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[5].id,
        quantity: 2,
        unitOfMeasure: 'tablespoons',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[6].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[7].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[0].id,
        quantity: 500,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[3].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[4].id,
        quantity: 2,
        unitOfMeasure: 'cloves',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[5].id,
        quantity: 1,
        unitOfMeasure: 'tablespoon',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[6].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[7].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
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

