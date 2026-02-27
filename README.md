# CareerPath AI - Career Guidance Application

A comprehensive AI-powered career guidance platform that helps users discover their perfect career path through intelligent surveys and personalized recommendations.

## 🚀 Features

### Core Functionality
- **AI-Powered Career Matching**: Intelligent algorithm analyzes user responses to recommend suitable careers
- **Comprehensive Survey**: 40-question assessment covering skills, interests, personality, and work preferences
- **Personalized Results**: Detailed career recommendations with match percentages and salary information
- **User Dashboard**: Track progress, save results, and manage assessments

### User Features
- **User Registration & Authentication**: Secure JWT-based authentication
- **Progress Tracking**: Real-time survey completion tracking
- **Career Library**: Browse and explore 50+ career options
- **Results Management**: Save, view, and compare career assessment results
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **Custom CSS** - Styling with CSS variables

## 📁 Project Structure

```
ed_guide/
├── server/                          # Backend API
│   ├── config/
│   │   └── db.js                    # Database connection
│   ├── models/
│   │   ├── User.js                  # User model
│   │   ├── SurveyResult.js          # Survey results model
│   │   └── Career.js                # Career model
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── survey.js                # Survey and results routes
│   │   ├── careers.js               # Career management routes
│   │   └── user.js                  # User management routes
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── data/
│   │   └── careers.js               # Career data seed
│   ├── server.js                    # Main server file
│   └── package.json                 # Backend dependencies
├── client/                          # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation component
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── ProtectedRoute.jsx   # Route protection
│   │   │   └── CareerCard.jsx       # Career display card
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   ├── Survey.jsx           # Survey interface
│   │   │   ├── Results.jsx          # Results display
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   └── Careers.jsx          # Career library
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── services/
│   │   │   └── api.js               # API service functions
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Global styles
│   │   └── main.jsx                 # App entry point
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   └── package.json                 # Frontend dependencies
├── SPEC.md                          # Detailed specification
└── README.md                        # This file
```

## 🗄 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  savedResults: [ObjectId],
  assessmentCount: Number,
  createdAt: Date
}
```

### SurveyResult Model
```javascript
{
  user: ObjectId,
  answers: {
    skills: Object,
    interests: Object,
    personality: Object,
    workEnvironment: Object
  },
  results: [{
    career: ObjectId,
    matchScore: Number,
    careerName: String,
    description: String,
    salaryRange: String,
    education: String,
    growthRate: String
  }],
  createdAt: Date
}
```

### Career Model
```javascript
{
  name: String,
  description: String,
  category: String,
  skills: [String],
  interests: [String],
  personality: [String],
  workEnvironment: [String],
  salaryMin: Number,
  salaryMax: Number,
  growthRate: String,
  education: String
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   
```bash
   git clone <repository-url>
   cd ed_guide
   
```

2. **Backend Setup**
   
```bash
   cd server
   npm install
   # Create .env file with MongoDB URI and JWT secret
   npm start
   
```

3. **Frontend Setup** (in a new terminal)
   
```bash
   cd client
   npm install
   npm run dev
   
```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Variables

Create a `.env` file in the server directory:

```env
MONGODB_URI=mongodb://localhost:27017/careerpath-ai
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

## 🎯 Survey Categories

The career assessment covers 4 main areas:

1. **Skills Assessment** (10 questions)
   - Technical, analytical, creative, communication, leadership skills

2. **Interests** (10 questions)
   - Technology, business, healthcare, arts, science, education preferences

3. **Personality Traits** (10 questions)
   - Introvert/extrovert, structured/creative, team/independent preferences

4. **Work Environment** (10 questions)
   - Office vs remote, fast-paced vs calm, large vs small company preferences

## 🤖 AI Matching Algorithm

The system uses a weighted scoring algorithm:

- **Skills**: 30% weight
- **Interests**: 25% weight
- **Personality**: 25% weight
- **Work Environment**: 20% weight

Each career receives a match score from 0-99%, and the top 10 matches are returned.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes and API endpoints
- Input validation and sanitization

## 🎨 Design System

- **Primary Color**: #1a1a2e (Deep Navy)
- **Accent Color**: #e94560 (Vibrant Red-Pink)
- **Success Color**: #00d9a5 (Mint Green)
- **Typography**: Outfit font family
- **Animations**: Smooth transitions and hover effects

## 📈 Future Enhancements

- [ ] OpenAI API integration for enhanced recommendations
- [ ] Career comparison feature
- [ ] Social sharing of results
- [ ] Admin panel for career management
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for career exploration and personal growth**
