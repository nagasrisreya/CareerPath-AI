
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Career = require('./models/Career');
const careersData = require('./data/careers');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/survey', require('./routes/survey'));
app.use('/api/user', require('./routes/user'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerPath AI API is running' });
});

// Seed careers on startup (optional - remove in production)
const seedCareers = async () => {
  try {
    const count = await Career.countDocuments();
    if (count === 0) {
      console.log('Seeding careers database...');
      await Career.insertMany(careersData);
      console.log('Careers seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding careers:', error.message);
  }
};

seedCareers();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

