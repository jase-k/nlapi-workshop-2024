const { ShoppingListItem, RecipeIngredient } = require('../models');

exports.createShoppingListItem = async (req, res) => {
  try {
    const { recipeIngredientId, recipeId } = req.body;
    const companyId = req.user.companyId;
    let shoppingListItems = [];
    if (recipeIngredientId) {
      shoppingListItems.push(await ShoppingListItem.create({ recipeIngredientId, companyId }));
    } else if (recipeId) {
      const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId } });
      recipeIngredients.forEach(async (recipeIngredient) => {
        // Note: Create Many would be more efficient here
        shoppingListItems.push(await ShoppingListItem.create({ recipeIngredientId: recipeIngredient.id, companyId }));
      });
    }
    res.status(201).json(shoppingListItems);
  } catch (error) {
    console.error("Error in createShoppingListItem", error);
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      res.status(400).json({ error: 'Recipe Ingredient does not exist.' });
    } else {
      res.status(500).json({ error: `Failed to create shopping list item: ${error}` });
    }
  }
};

exports.getAllShoppingListItems = async (req, res) => {
  try {
    const shoppingListItems = await ShoppingListItem.findAll({ where: { companyId: req.user.companyId } });
    shoppingListItems.forEach(async (shoppingListItem) => {
      const recipeIngredient = await RecipeIngredient.findByPk(shoppingListItem.recipeIngredientId);
      console.log("recipeIngredient", recipeIngredient);
      shoppingListItem["recipeIngredient"] = recipeIngredient;
    });
    res.status(200).json(shoppingListItems);
  } catch (error) {
    console.error("Error in getAllShoppingListItems", error);
    res.status(500).json({ error: 'Failed to retrieve shopping list items' });
  }
};

exports.deleteAllShoppingListItems = async (req, res) => {
  try {
    await ShoppingListItem.destroy({ where: { companyId: req.user.companyId } });
    res.status(200).json({ message: 'All shopping list items deleted successfully' });
  } catch (error) {
    console.error("Error in deleteAllShoppingListItems", error);
    res.status(500).json({ error: 'Failed to delete shopping list items' });
  }
};
