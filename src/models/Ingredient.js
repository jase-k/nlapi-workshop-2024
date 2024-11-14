const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RecipeIngredient = require('./RecipeIngredient');
/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Name of the ingredient
 *         createdAt:
 *           type: string
 *           description: Date and time of creation
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           description: Date and time of last update
 *           format: date-time
 *       example:
 *         id: 1
 *         name: Tomato
 *         createdAt: 2024-01-01T00:00:00.000Z
 *         updatedAt: 2024-01-01T00:00:00.000Z
 *     IngredientInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the ingredient
 *       example:
 *         name: Tomato
*/
const Ingredient = sequelize.define('ingredients', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Ingredient.hasMany(RecipeIngredient, { foreignKey: 'ingredientId' });
RecipeIngredient.belongsTo(Ingredient, { foreignKey: 'ingredientId', as: 'Ingredient' });

module.exports = Ingredient;
