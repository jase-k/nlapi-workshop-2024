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
 * /api/shopping-lists:
 *   post:
 *     summary: Create a new shopping list item
 *     tags: [ShoppingLists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingListItemInput'
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
router.post('/', authenticateToken, shoppingListItemController.createShoppingListItem);

/**
 * @swagger
 * /api/shopping-lists:
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
router.get('/', shoppingListItemController.getAllShoppingListItems);

module.exports = router;
