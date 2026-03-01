const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Career = require('../models/Career');
const SurveyResult = require('../models/SurveyResult');

const streamMapping = {
  Arts: ['design', 'artist', 'creative', 'media', 'arts', 'graphic', 'interior', 'photographer', 'video', 'music'],
  Commerce: ['business', 'finance', 'marketing', 'account', 'commerce', 'management', 'entrepreneur', 'banker', 'analyst', 'hr'],
  Science: ['science', 'research', 'biological', 'chemical', 'physics', 'environmental', 'lab', 'biotechnologist'],
  Technology: ['software', 'developer', 'data', 'analysis', 'developer', 'cybersecurity', 'cloud', 'ux', 'engineer'],
  Healthcare: ['healthcare', 'nurse', 'doctor', 'therapist', 'medical', 'physical', 'clinical'],
  Education: ['education', 'teacher', 'instructional', 'tutor', 'teaching'],
  Engineering: ['engineer', 'mechanical', 'civil', 'electrical', 'aerospace', 'cad']
};

const calculateCareerMatches = (answers, careers) => {
  // Calculate scores for each category
  const scores = {
    Arts: 0,
    Commerce: 0,
    Science: 0,
    Technology: 0,
    Healthcare: 0,
    Education: 0,
    Engineering: 0
  };

  // Process skills answers
  if (answers.skills) {
    Object.entries(answers.skills).forEach(([key, value]) => {
      const numValue = Number(value) || 0;
      if (key === 'programming' || key === 'technical' || key === 'analytical') {
        scores.Technology += numValue;
        scores.Engineering += numValue;
      }
      if (key === 'creative') {
        scores.Arts += numValue;
      }
      if (key === 'communication' || key === 'teamwork') {
        scores.Commerce += numValue;
        scores.Healthcare += numValue;
        scores.Education += numValue;
      }
      if (key === 'leadership') {
        scores.Commerce += numValue;
      }
      if (key === 'math' || key === 'analytical') {
        scores.Science += numValue;
        scores.Technology += numValue;
      }
      if (key === 'research') {
        scores.Science += numValue;
        scores.Education += numValue;
      }
    });
  }

  // Process interests answers
  if (answers.interests) {
    Object.entries(answers.interests).forEach(([key, value]) => {
      const numValue = Number(value) || 0;
      if (key === 'technology') {
        scores.Technology += numValue;
        scores.Engineering += numValue;
      }
      if (key === 'business' || key === 'finance') {
        scores.Commerce += numValue;
      }
      if (key === 'healthcare') {
        scores.Healthcare += numValue;
      }
      if (key === 'arts' || key === 'creative') {
        scores.Arts += numValue;
      }
      if (key === 'science') {
        scores.Science += numValue;
      }
      if (key === 'education') {
        scores.Education += numValue;
      }
      if (key === 'marketing') {
        scores.Commerce += numValue;
        scores.Arts += numValue;
      }
      if (key === 'social') {
        scores.Healthcare += numValue;
        scores.Education += numValue;
        scores.Commerce += numValue;
      }
    });
  }

  // Process personality answers
  if (answers.personality) {
    Object.entries(answers.personality).forEach(([key, value]) => {
      const numValue = Number(value) || 0;
      if (key === 'introvert_extrovert' && numValue >= 4) {
        scores.Commerce += numValue * 0.5;
      }
      if (key === 'risk' && numValue >= 4) {
        scores.Commerce += numValue;
        scores.Arts += numValue * 0.5;
      }
      if (key === 'empathetic') {
        scores.Healthcare += numValue;
        scores.Education += numValue;
      }
      if (key === 'innovative') {
        scores.Technology += numValue;
        scores.Arts += numValue;
        scores.Engineering += numValue;
      }
    });
  }

  // Process work environment answers
  if (answers.workEnvironment) {
    Object.entries(answers.workEnvironment).forEach(([key, value]) => {
      const numValue = Number(value) || 0;
      if (key === 'remote') {
        scores.Technology += numValue * 0.5;
        scores.Arts += numValue * 0.5;
      }
      if (key === 'stability') {
        scores.Healthcare += numValue;
        scores.Education += numValue;
        scores.Commerce += numValue * 0.5;
      }
      if (key === 'growth') {
        scores.Commerce += numValue;
        scores.Technology += numValue;
      }
    });
  }

  // Calculate total to normalize scores
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  
  // Get a random seed based on answer values for variety
  const answerSeed = JSON.stringify(answers).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  
  // If total is 0 (all answers same), create varied scores based on seed
  let normalizedScores;
  if (total === 0) {
    // Create varied but deterministic scores based on the seed
    const base = 0.1;
    const variance = 0.03;
    const seed = (answerSeed % 100) / 100;
    
    normalizedScores = {
      Arts: base + Math.sin(seed * 7) * variance,
      Commerce: base + Math.sin(seed * 3) * variance,
      Science: base + Math.sin(seed * 5) * variance,
      Technology: base + Math.sin(seed * 2) * variance,
      Healthcare: base + Math.sin(seed * 6) * variance,
      Education: base + Math.sin(seed * 4) * variance,
      Engineering: base + Math.sin(seed * 1) * variance
    };
    
    // Re-normalize to ensure they sum to 1
    const sum = Object.values(normalizedScores).reduce((a, b) => a + b, 0);
    Object.keys(normalizedScores).forEach(key => {
      normalizedScores[key] = normalizedScores[key] / sum;
    });
  } else {
    normalizedScores = {
      Arts: scores.Arts / total,
      Commerce: scores.Commerce / total,
      Science: scores.Science / total,
      Technology: scores.Technology / total,
      Healthcare: scores.Healthcare / total,
      Education: scores.Education / total,
      Engineering: scores.Engineering / total
    };
  }

  console.log("Normalized Scores:", normalizedScores);

  // Calculate career matches
  const scored = careers.map(career => {
    const text = (career.name + " " + career.category + " " + career.skills.join(" ")).toLowerCase();
    
    let score = 30; // Minimum baseline score

    // Check each stream for matches - binary scoring (1 point per stream)
    Object.entries(streamMapping).forEach(([stream, keywords]) => {
      const hasMatch = keywords.some(keyword => text.includes(keyword));
      if (hasMatch) {
        score += normalizedScores[stream] * 80;
      }
    });

    return {
      career: career._id,
      careerName: career.name,
      category: career.category,
      matchScore: Math.min(Math.round(score), 95),
      description: career.description,
      salaryRange: `$${career.salaryMin?.toLocaleString() || 'N/A'} - $${career.salaryMax?.toLocaleString() || 'N/A'}`,
      education: career.education,
      growthRate: career.growthRate
    };
  });

  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
};

// @route   POST /api/survey/submit
// @desc    Submit survey answers and get career recommendations
// @access  Private
router.post('/submit', protect, async (req, res) => {
  try {
    const answers = req.body;

    const careers = await Career.find({});

    if (careers.length === 0) {
      return res.status(404).json({ message: 'No careers found in database' });
    }

    const results = calculateCareerMatches(answers, careers);

    await SurveyResult.create({
      user: req.user._id,
      answers,
      results
    });

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/survey/results/:id
// @desc    Get specific survey result by ID
// @access  Private
router.get('/results/:id', protect, async (req, res) => {
  try {
    const result = await SurveyResult.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('results.career');

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/survey/history
// @desc    Get user's survey history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const history = await SurveyResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/survey/latest-results
// @desc    Get user's latest survey result
// @access  Private
router.get('/latest-results', protect, async (req, res) => {
  try {
    const latestResult = await SurveyResult.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('results.career');

    if (!latestResult) {
      return res.status(404).json({ message: 'No results found' });
    }

    res.json(latestResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
