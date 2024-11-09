const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Recipe = require('./Recipe');
// const Ingredient = require('./Ingredient');

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeIngredientInputCreateIngredient:
 *       type: object
 *       required:
 *         - recipeId
 *         - ingredient_name
 *         - quantity
 *         - unitOfMeasure
 *       properties:
 *         recipeId:
 *           type: integer
 *           description: ID of the recipe
 *         ingredient_name:
 *           type: string
 *           description: Name of the ingredient
 *         quantity:
 *           type: float
 *           description: Quantity of the ingredient in the recipe
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *       example:
 *         ingredient_name: Tomato
 *         quantity: 200
 *         unitOfMeasure: "grams"
 *     RecipeIngredientInput:
 *       type: object
 *       required:
 *         - recipeId
 *         - ingredientId
 *         - quantity
 *         - unitOfMeasure
 *       properties:
 *         recipeId:
 *           type: integer
 *           description: ID of the recipe
 *         ingredientId:
 *           type: integer
 *           description: ID of the ingredient
 *         quantity:
 *           type: float
 *           description: Quantity of the ingredient in the recipe
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *       example:
 *         ingredientId: 1
 *         quantity: 200
 *         unitOfMeasure: "grams"
 *     RecipeIngredient:
 *       type: object
 *       required:
 *         - recipe
 *         - ingredient
 *         - quantity
 *       properties:
 *         quantity:
 *           type: string
 *           description: Quantity of the ingredient in the recipe
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *         ingredient:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID of the ingredient
 *             name:
 *               type: string
 *               description: Name of the ingredient
 *         recipe:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID of the recipe
 *             title:
 *               type: string
 *               description: Title of the recipe
 *       example:
 *         quantity: 200
 *         unitOfMeasure: "g"
 *         ingredient: {id: 1, name: "Tomato"}
 *         recipe: {id: 1, title: "Spaghetti Bolognese"}
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
