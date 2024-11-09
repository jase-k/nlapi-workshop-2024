const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RecipeIngredient = require('./RecipeIngredient');

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Title of the recipe
 *         ingredients:
 *           type: string
 *           description: Ingredients required for the recipe
 *         instructions:
 *           type: string
 *           description: Cooking instructions
 *         recipeIngredients:
 *           type: array
 *           description: Ingredients required for the recipe
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 *       example:
 *         title: Spaghetti Bolognese
 *         ingredients: Spaghetti, minced meat, tomato sauce
 *         instructions: Cook spaghetti, prepare sauce, mix together
 */
const Recipe = sequelize.define('recipes', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Recipe.hasMany(RecipeIngredient, { foreignKey: 'recipeId' });
RecipeIngredient.belongsTo(Recipe);


module.exports = Recipe;
