// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./Company');
const bcrypt = require('bcrypt');


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         companyId:
 *           type: integer
 *           description: ID of the company the user belongs to
 *       example:
 *         name: Jane Doe
 *         email: jane.doe@example.com
 *         password: StrongPassword123
 */
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relationships
User.belongsTo(Company);
Company.hasMany(User);

// Hooks
User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

module.exports = User;
