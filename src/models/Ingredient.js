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
 *       example:
 *         id: 1
 *         name: Tomato
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
RecipeIngredient.belongsTo(Ingredient);

module.exports = Ingredient;
