const { Recipe, RecipeIngredient, Ingredient } = require('../models');
const { Op } = require('sequelize');

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

exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const recipe = await Recipe.findByPk(id, {
      include: [{ model: RecipeIngredient, include: [{ model: Ingredient }] }]
    });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve recipe' });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, instructions } = req.body;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    await recipe.update({ title, instructions });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    await recipe.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};

exports.searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const recipes = await Recipe.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`
        }
      }
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search recipes' });
  }
};
