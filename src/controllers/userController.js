// src/controllers/userController.js
require("dotenv").config();
const { User } = require("../models");
const { fn, col } = require("sequelize");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({ where: { companyId: req.user.companyId } });
  res.json(users);
};

// Search by email or name
exports.searchUsers = async (req, res) => {
  const { query, searchBy = 'name', limit = 3, threshold = 0.3 } = req.query;

  if (!['name', 'email'].includes(searchBy)) {
    return res.status(400).json({ error: 'Invalid searchBy parameter. Use "name" or "email".' });
  }

  try {
    // Find all users and order them by similarity score in descending order
    // 'fn' is used to call a database function, 'similarity' in this case, which compares the 'searchBy' column with the 'query'
    // 'col' is used to specify the column to be compared
    // 'limit' restricts the number of results returned, parsed to an integer
    const searchUsers = await User.findAll({
      order: [[fn("similarity", col(searchBy), query), "DESC"]],
      limit: parseInt(limit, 10),
    });

    return res.json(searchUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}
