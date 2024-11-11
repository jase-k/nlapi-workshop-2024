const express = require('express');
const router = express.Router();
const shoppingListItemController = require('../controllers/shoppingListItemController');
const authenticateToken = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: ShoppingLists
 *   description: Shopping list management
 */

/**
 * @swagger
 * /api/shopping-list:
 *   post:
 *     summary: Create a new shopping list item from a recipe ingredient. Currently only supports recipe ingredients and/or recipe_id does not support adding ingredients not in a recipe.
 *     tags: [ShoppingLists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingListItemInput'
 *           examples:
 *             example1:
 *               summary: Example with recipeIngredientId
 *               value:
 *                 recipeIngredientId: 1
 *             example2:
 *               summary: Example with recipeId
 *               value:
 *                 recipeId: 10
 *     responses:
 *       201:
 *         description: Shopping list item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingListItem'
 *       401:
 *         description: Unauthenticated
 */
router.post('', authenticateToken, shoppingListItemController.createShoppingListItem);

/**
 * @swagger
 * /api/shopping-list:
 *   get:
 *     summary: Get all shopping list items
 *     tags: [ShoppingLists]
 *     responses:
 *       200:
 *         description: A list of ShoppingListItem objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingListItem'
 */
router.get('', authenticateToken, shoppingListItemController.getAllShoppingListItems);


/**
 * @swagger
 * /api/shopping-list:
 *   delete:
 *     summary: Delete all items in user's shopping list
 *     tags: [ShoppingLists]
 *     responses:
 *       200:
 *         description: All shopping list items deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.delete('', authenticateToken, shoppingListItemController.deleteAllShoppingListItems);

module.exports = router;
