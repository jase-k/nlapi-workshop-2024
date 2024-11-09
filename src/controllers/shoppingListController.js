const ShoppingListItem = require('../models/ShoppingList');

exports.createShoppingListItem = async (req, res) => {
  try {
    const { recipeIngredientId, companyId } = req.body;
    const shoppingListItem = await ShoppingListItem.create({ recipeIngredientId, companyId });
    res.status(201).json(shoppingListItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shopping list item' });
  }
};

exports.getAllShoppingListItems = async (req, res) => {
  try {
    const shoppingListItems = await ShoppingListItem.findAll();
    res.status(200).json(shoppingListItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve shopping list items' });
  }
};
