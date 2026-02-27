
const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const careersData = require('../data/careers');

// @route   GET /api/careers
// @desc    Get all careers or search/filter careers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, category, minSalary, maxSalary } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Salary range filter
    if (minSalary || maxSalary) {
      query.salaryMin = {};
      query.salaryMax = {};
      if (minSalary) query.salaryMin.$gte = Number(minSalary);
      if (maxSalary) query.salaryMax.$lte = Number(maxSalary);
    }

    const careers = await Career.find(query).sort({ name: 1 });
    res.json(careers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/careers/search
// @desc    Search careers
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    
    const careers = await Career.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    }).limit(10);
    
    res.json(careers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/careers/seed
// @desc    Seed careers database (run once)
// @access  Public
router.post('/seed', async (req, res) => {
  try {
    // Clear existing careers
    await Career.deleteMany({});
    
    // Insert new careers
    await Career.insertMany(careersData);
    
    res.json({ message: 'Careers seeded successfully', count: careersData.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/careers/categories
// @desc    Get all unique categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Career.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/careers/:id
// @desc    Get single career by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

