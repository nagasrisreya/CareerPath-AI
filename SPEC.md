# CareerPath AI - Career Guidance Application Specification

## 1. Project Overview

**Project Name:** CareerPath AI  
**Type:** Full-stack MERN Web Application  
**Core Functionality:** An AI-powered career guidance platform that helps users discover suitable career paths through comprehensive surveys and intelligent matching algorithms.  
**Target Users:** Students, job seekers, and professionals looking to explore or transition careers.

---

## 2. Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Routing:** React Router v6
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Styling:** Custom CSS with CSS Variables

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

### AI Integration
- Primary: Rule-based intelligent matching algorithm
- Extensible: OpenAI API integration ready (API key configuration)

---

## 3. UI/UX Specification

### Color Palette
```
css
--primary: #1a1a2e;        /* Deep Navy - Main background */
--secondary: #16213e;      /* Dark Blue - Cards/Sections */
--accent: #e94560;         /* Vibrant Red-Pink - CTAs */
--accent-hover: #ff6b6b;   /* Light Coral - Hover states */
--success: #00d9a5;        /* Mint Green - Success states */
--warning: #ffc107;        /* Amber - Warnings */
--text-primary: #ffffff;   /* White - Main text */
--text-secondary: #a0a0b9; /* Muted lavender - Secondary text */
--card-bg: #0f3460;        /* Ocean Blue - Card backgrounds */
--gradient-start: #1a1a2e;
--gradient-end: #16213e;
```

### Typography
- **Primary Font:** 'Outfit', sans-serif (Google Fonts)
- **Headings:** Outfit Bold, sizes: H1=3rem, H2=2.5rem, H3=1.75rem
- **Body:** Outfit Regular, size: 1rem (16px)
- **Small Text:** 0.875rem

### Layout Structure

#### Header (Fixed)
- Logo (left): "CareerPath AI" with brain icon
- Navigation (center): Home, Survey, Careers, Dashboard
- Auth buttons (right): Login, Sign Up (or User avatar when logged in)

#### Pages

**1. Home Page**
- Hero section with animated gradient background
- Headline: "Discover Your Perfect Career Path"
- Subheadline: "AI-powered career guidance tailored to your unique strengths"
- CTA buttons: "Start Free Assessment" (primary), "Learn More" (secondary)
- Features grid (3 cards): "Smart Analysis", "Comprehensive Survey", "Personalized Results"
- Testimonials section

**2. Authentication Pages**
- Login form: Email, Password, Remember me, Forgot password link
- Sign Up form: Name, Email, Password, Confirm Password
- Clean, centered card design with backdrop blur

**3. Survey Page**
- Progress bar at top (shows completion percentage)
- Question cards with smooth transitions
- Question types: Multiple choice, Rating scale, Sorting
- Navigation: Previous/Next buttons
- Categories:
  - Skills Assessment (10 questions)
  - Interests (10 questions)
  - Personality Traits (10 questions)
  - Work Environment Preferences (10 questions)
- Total: 40 questions

**4. Results Page**
- Top 3 career matches with match percentage (animated progress circles)
- Detailed breakdown of strengths
- Career detailed cards with:
  - Job description
  - Required skills
  - Salary range
  - Growth prospects
  - Education requirements
- Action buttons: Save Results, Retake Survey, Explore More

**5. Dashboard**
- User profile summary
- Saved careers list
- Assessment history with dates
- Progress tracking (survey completion status)
- Recommendations section

**6. Careers Library**
- Searchable list of careers
- Filter by category, salary, education level
- Career detail modal/page

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Animations
- Page transitions: Fade in (0.3s ease)
- Card hover: Scale 1.02, shadow increase
- Progress bars: Animated fill on load
- Buttons: Scale 0.98 on click, color transition
- Staggered reveals for lists (50ms delay per item)

---

## 4. Functionality Specification

### Authentication System
- User registration with email validation
- Login with JWT token generation
- Token stored in localStorage
- Protected routes for authenticated users
- Logout functionality

### Survey System
- 40-question comprehensive assessment
- Categories:
  1. **Skills (10 Q):** Technical, analytical, creative, communication, leadership
  2. **Interests (10 Q):** Technology, business, healthcare, arts, science, education
  3. **Personality (10 Q):** Introvert/Extrovert, structured/creative, team/independent
  4. **Work Environment (10 Q):** Office vs remote, fast-paced vs calm, large vs small company
- Real-time answer storage
- Progress auto-save to backend

### AI Career Matching Algorithm
```
Score Calculation:
1. Normalize all answers (0-100 scale)
2. For each career, calculate:
   - Skill match percentage
   - Interest alignment score
   - Personality compatibility
   - Work environment fit
3. Weighted average:
   - Skills: 30%
   - Interests: 25%
   - Personality: 25%
   - Work Environment: 20%
4. Return top 10 careers sorted by score
```

### Career Database
Pre-loaded careers with attributes:
- Name, Description, Category
- Required Skills (array)
- Interests Matched (array)
- Personality Types (array)
- Work Environments (array)
- Salary Range (min, max)
- Growth Rate
- Education Requirements

### Saved Results
- Save assessment results to user profile
- View saved results in dashboard
- Delete saved results

### Progress Tracking
- Track survey completion status
- Store assessment history with timestamps
- Display completion badges

---

## 5. API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Survey Routes
- `POST /api/survey/submit` - Submit survey answers
- `GET /api/survey/results/:id` - Get survey results
- `GET /api/survey/history` - Get user survey history

### Career Routes
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get career details
- `GET /api/careers/search` - Search careers

### User Routes
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/save-result` - Save career result
- `GET /api/user/saved-results` - Get saved results
- `DELETE /api/user/saved-results/:id` - Delete saved result

---

## 6. Database Schema

### User Model
```
javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  savedResults: [{ type: ObjectId, ref: 'SurveyResult' }],
  assessmentCount: Number
}
```

### SurveyResult Model
```
javascript
{
  user: ObjectId,
  answers: Object,
  results: [{
    career: ObjectId,
    matchScore: Number
  }],
  createdAt: Date
}
```

### Career Model
```
javascript
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

---

## 7. File Structure

```
ed_guide/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── SurveyResult.js
│   │   └── Career.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── survey.js
│   │   ├── careers.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── data/
│   │   └── careers.js
│   ├── server.js
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── CareerCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Survey.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Careers.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── SPEC.md
└── README.md
```

---

## 8. Acceptance Criteria

### Authentication
- [ ] Users can register with name, email, password
- [ ] Users can login with email and password
- [ ] JWT token is stored and used for authenticated requests
- [ ] Protected routes redirect to login if not authenticated

### Survey
- [ ] Survey displays 40 questions across 4 categories
- [ ] Progress bar shows completion percentage
- [ ] Users can navigate between questions
- [ ] Answers are saved and submitted successfully

### Results
- [ ] Top career matches are displayed with percentages
- [ ] Career details show full information
- [ ] Results can be saved to user profile

### Dashboard
- [ ] Shows user profile information
- [ ] Displays saved career results
- [ ] Shows assessment history
- [ ] Progress tracking is visible

### Careers Library
- [ ] All careers are listed
- [ ] Search functionality works
- [ ] Career details are viewable

### General
- [ ] Responsive design works on all devices
- [ ] Animations are smooth and performant
- [ ] No console errors in production
- [ ] API endpoints return proper status codes
</parameter>
</invoke>
</minimax:tool_call>
