const { Ingredient } = require('../models');

exports.createIngredient = async (req, res) => {
  try {
    const { name } = req.body;
    const ingredient = await Ingredient.create({ name });
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ingredient' });
  }
};

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve ingredients' });
  }
};
