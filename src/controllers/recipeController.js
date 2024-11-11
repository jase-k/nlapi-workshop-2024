const { Recipe } = require('../models');

exports.createRecipe = async (req, res) => {
  try {
    const { title, instructions } = req.body;
    const recipe = await Recipe.create({ title, instructions });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipes' });
  }
};
