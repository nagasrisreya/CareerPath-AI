
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const SurveyResult = require('../models/SurveyResult');
const User = require('../models/User');
const Career = require('../models/Career');

// Career categories and their keywords
const skillCategories = {
  'Technical': ['programming', 'coding', 'software', 'computer', 'technical', 'engineering', 'data', 'analysis', 'math', 'scientific'],
  'Creative': ['creative', 'design', 'art', 'writing', 'music', 'visual', 'artistic', 'innovative', 'imaginative'],
  'Communication': ['communication', 'speaking', 'writing', 'presentation', 'teaching', 'counseling', 'people', 'social'],
  'Leadership': ['leadership', 'management', 'decision', 'organization', 'planning', 'supervising', 'directing'],
  'Problem Solving': ['problem', 'critical', 'analytical', 'logical', 'research', 'troubleshooting', 'debugging']
};

const interestCategories = ['Technology', 'Business', 'Healthcare', 'Arts', 'Science', 'Education', 'Engineering', 'Finance', 'Marketing', 'Social Services'];

const personalityTypes = {
  'Analytical': ['analytical', 'logical', 'detail', 'systematic'],
  'Creative': ['creative', 'imaginative', 'artistic', 'flexible'],
  'Social': ['social', 'helping', 'teaching', 'teamwork', 'communication'],
  'Leadership': ['leadership', 'leader', 'decision', 'assertive', 'ambitious'],
  'Practical': ['practical', 'hands-on', 'physical', 'realistic', 'technical']
};

const workEnvironmentTypes = {
  'Office': ['office', 'corporate', 'structured', 'indoor'],
  'Remote': ['remote', 'flexible', 'home', 'digital', 'virtual'],
  'Outdoor': ['outdoor', 'field', 'physical', 'environment'],
  'Fast-paced': ['fast', 'dynamic', 'high-pressure', 'deadline'],
  'Collaborative': ['team', 'collaborative', 'group', 'social'],
  'Independent': ['independent', 'alone', 'self-directed', 'autonomous'],
  'Startup': ['startup', 'innovative', 'flexible', 'casual'],
  'Large Company': ['large', 'corporate', 'established', 'structured']
};

// AI Career Matching Algorithm - Improved Version
const calculateCareerMatches = (answers, careers) => {
  const { skills, interests, personality, workEnvironment } = answers;
  
  // Analyze user's skill preferences based on their answers
  const userSkillProfile = analyzeSkillAnswers(skills || {});
  const userInterestProfile = analyzeInterestAnswers(interests || {});
  const userPersonalityProfile = analyzePersonalityAnswers(personality || {});
  const userEnvironmentProfile = analyzeEnvironmentAnswers(workEnvironment || {});
  
  // Score each career
  const scoredCareers = careers.map(career => {
    // Match skills
    let skillScore = 0;
    const careerSkills = career.skills.map(s => s.toLowerCase());
    Object.entries(userSkillProfile).forEach(([category, score]) => {
      if (score > 50) { // User prefers this category
        const categoryKeywords = skillCategories[category] || [];
        const match = careerSkills.some(skill => 
          categoryKeywords.some(kw => skill.includes(kw))
        );
        if (match) skillScore += score;
      }
    });
    skillScore = Math.min(skillScore, 100);
    
    // Match interests
    let interestScore = 0;
    const careerCategory = career.category.toLowerCase();
    Object.entries(userInterestProfile).forEach(([interest, score]) => {
      if (score > 30 && interest.toLowerCase().includes(careerCategory)) {
        interestScore += score;
      }
    });
    // Add bonus if career category matches user's top interest
    const topInterest = Object.entries(userInterestProfile).sort((a, b) => b[1] - a[1])[0];
    if (topInterest && topInterest[0].toLowerCase() === careerCategory) {
      interestScore += 30;
    }
    interestScore = Math.min(interestScore, 100);
    
    // Match personality
    let personalityScore = 0;
    const careerPersonality = career.personality.map(p => p.toLowerCase());
    Object.entries(userPersonalityProfile).forEach(([type, score]) => {
      if (score > 50) {
        const typeKeywords = personalityTypes[type] || [];
        const match = careerPersonality.some(p => 
          typeKeywords.some(kw => p.includes(kw))
        );
        if (match) personalityScore += score;
      }
    });
    personalityScore = Math.min(personalityScore, 100);
    
    // Match work environment
    let environmentScore = 0;
    const careerEnv = career.workEnvironment.map(e => e.toLowerCase());
    Object.entries(userEnvironmentProfile).forEach(([env, score]) => {
      if (score > 50) {
        const envKeywords = workEnvironmentTypes[env] || [];
        const match = careerEnv.some(e => 
          envKeywords.some(kw => e.includes(kw))
        );
        if (match) environmentScore += score;
      }
    });
    environmentScore = Math.min(environmentScore, 100);
    
    // Calculate weighted overall score
    const overallScore = (
      (skillScore * 0.30) +
      (interestScore * 0.25) +
      (personalityScore * 0.25) +
      (environmentScore * 0.20)
    );
    
    return {
      career: career._id,
      careerName: career.name,
      matchScore: Math.max(Math.min(Math.round(overallScore), 99), 10), // Keep between 10-99
      description: career.description,
      salaryRange: `$${career.salaryMin.toLocaleString()} - $${career.salaryMax.toLocaleString()}`,
      education: career.education,
      growthRate: career.growthRate,
      category: career.category,
      // Include breakdown for debugging
      breakdown: { skillScore, interestScore, personalityScore, environmentScore }
    };
  });
  
  // Sort by match score and return top 10
  return scoredCareers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);
};

// Analyze skill answers to build user profile
const analyzeSkillAnswers = (answers) => {
  const profile = {};
  const userAnswers = answers || {};
  const categoryKeys = Object.keys(skillCategories);
  
  // Get all answer values from skills object (which has keys like 'programming', 'analytical', etc.)
  const answerValues = Object.values(userAnswers);
  
  if (answerValues.length === 0) {
    // Return default profile if no answers
    categoryKeys.forEach(key => {
      profile[key] = 50;
    });
    return profile;
  }
  
  // Map each answer to a category based on its position
  Object.entries(userAnswers).forEach(([key, value], index) => {
    const score = parseInt(value) || 50;
    const category = categoryKeys[index % categoryKeys.length];
    if (!profile[category]) profile[category] = [];
    profile[category].push(score);
  });
  
  // Average the scores per category
  Object.keys(profile).forEach(key => {
    profile[key] = profile[key].reduce((a, b) => a + b, 0) / profile[key].length;
  });
  
  return profile;
};

// Analyze interest answers
const analyzeInterestAnswers = (answers) => {
  const profile = {};
  const userAnswers = answers || {};
  
  // Get all answer values from interests object
  const answerValues = Object.values(userAnswers);
  
  if (answerValues.length === 0) {
    // Return default profile if no answers
    interestCategories.forEach(interest => {
      profile[interest] = 50;
    });
    return profile;
  }
  
  // Map each answer to an interest based on its position
  Object.entries(userAnswers).forEach(([key, value], index) => {
    const score = parseInt(value) || 50;
    const interest = interestCategories[index % interestCategories.length];
    profile[interest] = score;
  });
  
  return profile;
};

// Analyze personality answers
const analyzePersonalityAnswers = (answers) => {
  const profile = {};
  const userAnswers = answers || {};
  const typeKeys = Object.keys(personalityTypes);
  
  // Get all answer values from personality object
  const answerValues = Object.values(userAnswers);
  
  if (answerValues.length === 0) {
    // Return default profile if no answers
    typeKeys.forEach(type => {
      profile[type] = 50;
    });
    return profile;
  }
  
  // Map each answer to a personality type based on its position
  Object.entries(userAnswers).forEach(([key, value], index) => {
    const score = parseInt(value) || 50;
    const type = typeKeys[index % typeKeys.length];
    if (!profile[type]) profile[type] = [];
    profile[type].push(score);
  });
  
  // Average per type
  Object.keys(profile).forEach(key => {
    profile[key] = profile[key].reduce((a, b) => a + b, 0) / profile[key].length;
  });
  
  return profile;
};

// Analyze work environment answers
const analyzeEnvironmentAnswers = (answers) => {
  const profile = {};
  const userAnswers = answers || {};
  const envKeys = Object.keys(workEnvironmentTypes);
  
  // Get all answer values from workEnvironment object
  const answerValues = Object.values(userAnswers);
  
  if (answerValues.length === 0) {
    // Return default profile if no answers
    envKeys.forEach(env => {
      profile[env] = 50;
    });
    return profile;
  }
  
  // Map each answer to an environment type based on its position
  Object.entries(userAnswers).forEach(([key, value], index) => {
    const score = parseInt(value) || 50;
    const env = envKeys[index % envKeys.length];
    if (!profile[env]) profile[env] = [];
    profile[env].push(score);
  });
  
  // Average per type
  Object.keys(profile).forEach(key => {
    profile[key] = profile[key].reduce((a, b) => a + b, 0) / profile[key].length;
  });
  
  return profile;
};

// @route   POST /api/survey/submit
// @desc    Submit survey answers and get career matches
// @access  Private
router.post('/submit', protect, async (req, res) => {
  try {
    const { answers } = req.body;
    
    if (!answers) {
      return res.status(400).json({ message: 'Please provide survey answers' });
    }
    
    // Get all careers from database
    const careers = await Career.find({});
    
    if (careers.length === 0) {
      return res.status(400).json({ message: 'No careers found in database. Please seed the database first.' });
    }
    
    // Calculate career matches using AI algorithm
    const results = calculateCareerMatches(answers, careers);
    
    // Save survey result
    const surveyResult = await SurveyResult.create({
      user: req.user._id,
      answers,
      results
    });
    
    // Update user's assessment count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { assessmentCount: 1 },
      $push: { savedResults: surveyResult._id }
    });
    
    res.status(201).json({
      _id: surveyResult._id,
      results,
      createdAt: surveyResult.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/survey/results/:id
// @desc    Get survey results by ID
// @access  Private
router.get('/results/:id', protect, async (req, res) => {
  try {
    const surveyResult = await SurveyResult.findById(req.params.id);
    
    if (!surveyResult) {
      return res.status(404).json({ message: 'Survey result not found' });
    }
    
    // Check if user owns this result
    if (surveyResult.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this result' });
    }
    
    res.json(surveyResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/survey/history
// @desc    Get user's survey history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const surveyResults = await SurveyResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('results createdAt');
    
    res.json(surveyResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/survey/latest-results
// @desc    Get user's latest survey results
// @access  Private
router.get('/latest-results', protect, async (req, res) => {
  try {
    const surveyResult = await SurveyResult.findOne({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    if (!surveyResult) {
      return res.json(null);
    }
    
    res.json(surveyResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

