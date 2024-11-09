const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Recipe = require('./Recipe');
// const Ingredient = require('./Ingredient');

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeIngredient:
 *       type: object
 *       required:
 *         - recipeId
 *         - ingredientId
 *         - quantity
 *       properties:
 *         recipeId:
 *           type: integer
 *           description: ID of the recipe
 *         ingredientId:
 *           type: integer
 *           description: ID of the ingredient
 *         quantity:
 *           type: string
 *           description: Quantity of the ingredient in the recipe
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *         ingredient:
 *           $ref: '#/components/schemas/Ingredient'
 *         recipe:
 *           $ref: '#/components/schemas/Recipe'
 *       example:
 *         recipeId: 1
 *         ingredientId: 2
 *         quantity: 200
 *         unitOfMeasure: "g"
 */
const RecipeIngredient = sequelize.define('recipe_ingredients', {
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unitOfMeasure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// RecipeIngredient.hasOne(Recipe);
// RecipeIngredient.belongsTo(Ingredient);

module.exports = RecipeIngredient;
