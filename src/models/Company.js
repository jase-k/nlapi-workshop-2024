// src/models/Company.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Company name
 *         address:
 *           type: string
 *           description: Company address
 *       example:
 *         id: 1
 *         name: Looney Tunes Inc.
 *         address: 123 Business Rd.
 */
const Company = sequelize.define('companies', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
});

module.exports = Company;
