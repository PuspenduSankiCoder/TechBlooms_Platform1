const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/AuthMiddleware');
const {
  getProfile,
  updateProfile,
} = require('../controllers/UserController');

// All routes require authentication
router.use(protect);

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', getProfile);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', updateProfile);

module.exports = router;

