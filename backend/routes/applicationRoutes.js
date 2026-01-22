const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/AuthMiddleware');
const {
  createApplication,
  getUserApplications,
} = require('../controllers/ApplicationController');

// All routes require authentication
router.use(protect);

// @route   POST /api/apply
// @desc    Create a new application
// @access  Private
router.post('/', createApplication);

// @route   GET /api/apply
// @desc    Get user's applications
// @access  Private
router.get('/', getUserApplications);

module.exports = router;

