// src/controllers/companyController.js
const { Company, User } = require('../models'); // Ensure User model is imported

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const companyData = {
      ...req.body
    };
    const company = await Company.create(companyData);

    // Update the user's companyId
    const user = await User.findByPk(req.user.id);
    if (user) {
      user.companyId = company.id;
      await user.save();
    }

    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });

    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
