const Application = require('../models/Application');

// @desc    Create a new application
// @route   POST /api/apply
// @access  Private
exports.createApplication = async (req, res) => {
  try {
    const { appliedFor, additionalInfo } = req.body;
    const userId = req.user._id;

    // Validation
    if (!appliedFor) {
      return res.status(400).json({
        success: false,
        message: 'Please provide the application field',
      });
    }

    // Check if user already applied for the same program
    const existingApplication = await Application.findOne({
      userId,
      appliedFor,
      status: { $in: ['pending', 'under-review', 'accepted'] },
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this program',
      });
    }

    // Create application
    const application = await Application.create({
      userId,
      appliedFor,
      additionalInfo,
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get user's applications
// @route   GET /api/apply
// @access  Private
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await Application.find({ userId })
      .sort({ date: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

