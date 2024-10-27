// src/routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authenticateToken = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management
 */

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, companyController.createCompany);

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: A list of companies
 */
router.get('/', companyController.getAllCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Company ID
 *     responses:
 *       200:
 *         description: Company data
 *       404:
 *         description: Company not found
 */
router.get('/:id', companyController.getCompanyById);

module.exports = router;
