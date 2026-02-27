const mongoose = require('mongoose');

const surveyResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: {
    skills: { type: Object, default: {} },
    interests: { type: Object, default: {} },
    personality: { type: Object, default: {} },
    workEnvironment: { type: Object, default: {} }
  },
  results: [{
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career'
    },
    careerName: String,
    matchScore: Number,
    description: String,
    salaryRange: String,
    education: String,
    growthRate: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SurveyResult', surveyResultSchema);

