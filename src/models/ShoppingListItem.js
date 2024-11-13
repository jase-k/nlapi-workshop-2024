const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./Company');
const RecipeIngredient = require('./RecipeIngredient');
/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingListItemInput:
 *       type: object
 *       required:
 *       properties:
 *       oneOf:
 *         - properties:
 *             recipeIngredientId:
 *               type: integer
 *               description: ID of the recipe ingredient
 *         - properties:
 *             recipeId:
 *               type: integer
 *               description: ID of the recipe
 *     ShoppingListItem:
 *       type: object
 *       required:
 *         - recipeIngredientId
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         ingredientName:
 *           type: string
 *           description: Name of the ingredient
 *         quantity:
 *           type: string
 *           description: Quantity of the ingredient
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *         isPurchased:
 *           type: boolean
 *           description: Whether the item has been purchased
 *         recipes:
 *           type: array
 *           description: Recipes that contain the ingredient
 *           items:
 *             type: string
 *       example:
 *         ingredientName: Tomato
 *         quantity: 300
 *         unitOfMeasure: "g"
 *         isPurchased: false
 *         recipes: ["Spaghetti Bolognese", "Tomato Soup"]
 */
const ShoppingListItem = sequelize.define('shopping_list_items', {
  isPurchased: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Company.hasMany(ShoppingListItem, { foreignKey: 'companyId', onDelete: 'CASCADE' });
ShoppingListItem.belongsTo(Company, { foreignKey: 'companyId', onDelete: 'CASCADE' });
RecipeIngredient.hasMany(ShoppingListItem, { foreignKey: 'recipeIngredientId', onDelete: 'CASCADE' });
ShoppingListItem.belongsTo(RecipeIngredient, { foreignKey: 'recipeIngredientId', onDelete: 'CASCADE' });

module.exports = ShoppingListItem;
