const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const SurveyResult = require('../models/SurveyResult');

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedResults');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (email) user.email = email;
    
    await user.save();
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/user/save-result
// @desc    Save a career result
// @access  Private
router.post('/save-result', protect, async (req, res) => {
  try {
    const { resultId } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user.savedResults.includes(resultId)) {
      user.savedResults.push(resultId);
      await user.save();
    }
    
    res.json({ message: 'Result saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/user/saved-results
// @desc    Get user's saved results
// @access  Private
router.get('/saved-results', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'savedResults',
        options: { sort: { createdAt: -1 } }
      });
    
    res.json(user.savedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/user/saved-results/:id
// @desc    Delete a saved result
// @access  Private
router.delete('/saved-results/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.savedResults = user.savedResults.filter(
      result => result.toString() !== req.params.id
    );
    
    await user.save();
    
    res.json({ message: 'Result removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/user/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const latestResult = await SurveyResult.findOne({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    const totalAssessments = await SurveyResult.countDocuments({ user: req.user._id });
    
    res.json({
      name: user.name,
      email: user.email,
      assessmentCount: totalAssessments,
      latestResult: latestResult ? {
        _id: latestResult._id,
        results: latestResult.results.slice(0, 3),
        createdAt: latestResult.createdAt
      } : null,
      savedResultsCount: user.savedResults.length,
      memberSince: user.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

