const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./Company');

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingListItem:
 *       type: object
 *       required:
 *         - recipeIngredientId
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         recipeIngredientId:
 *           type: integer
 *           description: ID of the recipe ingredient
 *         isPurchased:
 *           type: boolean
 *           description: Whether the item has been purchased
 *         companyId:
 *           type: integer
 *           description: ID of the company the shopping list belongs to
 *       example:
 *         recipeIngredientId: 1
 *         companyId: 1
 */
const ShoppingListItem = sequelize.define('shopping_list_items', {
  recipeIngredientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isPurchased: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Establish a one-to-one relationship
Company.hasMany(ShoppingListItem, { foreignKey: 'companyId' });
ShoppingListItem.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = ShoppingListItem;
