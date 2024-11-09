const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');
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
 *             $ref: '#/components/schemas/ShoppingListItem'
 *     responses:
 *       201:
 *         description: Shopping list item created successfully
 *       401:
 *         description: Unauthenticated
 */
router.post('/', authenticateToken, shoppingListController.createShoppingListItem);

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
router.get('/', shoppingListController.getAllShoppingListItems);

module.exports = router;
