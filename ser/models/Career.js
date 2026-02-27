const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Business', 'Healthcare', 'Arts', 'Science', 'Education', 'Engineering', 'Finance', 'Marketing', 'Social Services']
  },
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  personality: [{
    type: String,
    trim: true
  }],
  workEnvironment: [{
    type: String,
    trim: true
  }],
  salaryMin: {
    type: Number,
    required: true
  },
  salaryMax: {
    type: Number,
    required: true
  },
  growthRate: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  }
});

// Index for searching
careerSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Career', careerSchema);

