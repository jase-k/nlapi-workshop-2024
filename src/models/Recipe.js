const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RecipeIngredient = require('./RecipeIngredient');

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeInput:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the recipe
 *         instructions:
 *           type: string
 *         recipeIngredients:
 *           type: array
 *           description: Ingredients required for the recipe
 *           items:
 *            oneOf:
 *              - $ref: '#/components/schemas/RecipeIngredientInputCreateIngredient'
 *              - $ref: '#/components/schemas/RecipeIngredientInput'
 *       example:
 *         title: Spaghetti Bolognese
 *         recipeIngredients: [{ingredientId: 1, quantity: 2}, {ingredient_name: Tomato, quantity: 200, unitOfMeasure: "grams"}]
 *         instructions: Cook spaghetti, prepare sauce, mix together
 *     Recipe:
 *       type: object
 *       required:
 *         - id
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
 *         recipeIngredients:
 *           type: array
 *           description: Ingredients required for the recipe
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 *         instructions:
 *           type: string
 *           description: Cooking instructions
 *       example:
 *         id: 1
 *         title: Spaghetti Bolognese
 *         recipeIngredients: [{id: 1, ingredient: {id: 1, name: "Tomato"}, quantity: 2}, {id: 2, ingredient: {id: 2, name: "Spaghetti"}, quantity: 1}]
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
