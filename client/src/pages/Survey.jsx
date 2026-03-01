import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { surveyAPI } from '../services/api';

const surveyQuestions = {
  skills: [
    { id: 'programming', question: 'How comfortable are you with programming and coding?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'analytical', question: 'How would you rate your analytical and problem-solving skills?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'creative', question: 'How creative do you consider yourself to be?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'communication', question: 'How effective are your verbal and written communication skills?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'leadership', question: 'How comfortable are you in leadership and managerial roles?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'math', question: 'How strong are your mathematical and numerical abilities?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'technical', question: 'How comfortable are you with using technical tools and software?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'research', question: 'How skilled are you at conducting research and gathering information?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'detail', question: 'How much attention to detail do you have in your work?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'teamwork', question: 'How well do you work in team environments?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] }
  ],
  interests: [
    { id: 'technology', question: 'How interested are you in technology and computing?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'business', question: 'How interested are you in business and entrepreneurship?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'healthcare', question: 'How interested are you in healthcare and medicine?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'arts', question: 'How interested are you in arts, design, and creative fields?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'science', question: 'How interested are you in scientific research and discovery?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'education', question: 'How interested are you in teaching and education?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'finance', question: 'How interested are you in finance and investment?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'marketing', question: 'How interested are you in marketing and communications?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'social', question: 'How interested are you in social services and helping others?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'environment', question: 'How interested are you in environmental and sustainability issues?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] }
  ],
  personality: [
    { id: 'introvert_extrovert', question: 'Where do you fall on the introvert-extrovert spectrum?', options: ['Strongly Introvert', 'Somewhat Introvert', 'Balanced', 'Somewhat Extrovert', 'Strongly Extrovert'] },
    { id: 'structured_flexible', question: 'Do you prefer structured routines or flexible work styles?', options: ['Very Structured', 'Somewhat Structured', 'Balanced', 'Somewhat Flexible', 'Very Flexible'] },
    { id: 'team_independent', question: 'Do you prefer working in teams or independently?', options: ['Strongly Team', 'Somewhat Team', 'Balanced', 'Somewhat Independent', 'Strongly Independent'] },
    { id: 'risk', question: 'How comfortable are you with taking risks?', options: ['Very Risk Averse', 'Somewhat Cautious', 'Balanced', 'Somewhat Risk Taker', 'Very Risk Taker'] },
    { id: 'pressure', question: 'How well do you work under pressure?', options: ['Very Poorly', 'Somewhat Poorly', 'Moderately', 'Very Well', 'Extremely Well'] },
    { id: 'change', question: 'How adaptable are you to change and new situations?', options: ['Very Inflexible', 'Somewhat Rigid', 'Moderately Adaptable', 'Very Adaptable', 'Extremely Adaptable'] },
    { id: 'collaborative', question: 'How collaborative are you in achieving goals?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'competitive', question: 'How competitive are you?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'empathetic', question: 'How empathetic are you towards others?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] },
    { id: 'innovative', question: 'How innovative and creative do you consider yourself?', options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely'] }
  ],
  workEnvironment: [
    { id: 'remote', question: 'How interested are you in remote or work-from-home options?', options: ['Not Interested', 'Somewhat Interested', 'Moderately Interested', 'Very Interested', 'Only Remote'] },
    { id: 'company_size', question: 'What size company do you prefer working for?', options: ['Small (<50)', 'Medium (50-500)', 'Large (500-5000)', 'Very Large (>5000)', 'No Preference'] },
    { id: 'pace', question: 'What work pace do you prefer?', options: ['Very Slow', 'Slow', 'Moderate', 'Fast-paced', 'Very Fast-paced'] },
    { id: 'hierarchy', question: 'How important is a flat organizational hierarchy to you?', options: ['Not Important', 'Somewhat Important', 'Moderately Important', 'Very Important', 'Extremely Important'] },
    { id: 'travel', question: 'How much business travel are you willing to accept?', options: ['None', 'Minimal', 'Moderate', 'Frequent', 'Extensive'] },
    { id: 'location', question: 'Are you willing to relocate for a job?', options: ['Not Willing', 'Reluctantly', 'Neutral', 'Willing', 'Very Willing'] },
    { id: 'stability', question: 'How important is job stability to you?', options: ['Not Important', 'Somewhat Important', 'Moderately Important', 'Very Important', 'Critical'] },
    { id: 'growth', question: 'How important are growth and advancement opportunities?', options: ['Not Important', 'Somewhat Important', 'Moderately Important', 'Very Important', 'Critical'] },
    { id: 'balance', question: 'How important is work-life balance to you?', options: ['Not Important', 'Somewhat Important', 'Moderately Important', 'Very Important', 'Critical'] },
    { id: 'culture', question: 'How important is company culture to you?', options: ['Not Important', 'Somewhat Important', 'Moderately Important', 'Very Important', 'Extremely Important'] }
  ]
};

const categoryLabels = {
  skills: 'Skills Assessment',
  interests: 'Interests',
  personality: 'Personality Traits',
  workEnvironment: 'Work Environment'
};

const Survey = () => {
  const [currentCategory, setCurrentCategory] = useState('skills');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    skills: {},
    interests: {},
    personality: {},
    workEnvironment: {}
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['skills', 'interests', 'personality', 'workEnvironment'];
  const questions = surveyQuestions[currentCategory];
  
  const totalQuestions = Object.values(surveyQuestions).flat().length;
  const currentOverallQuestion = categories.slice(0, categories.indexOf(currentCategory)).flatMap(c => surveyQuestions[c]).length + currentQuestion;
  const progress = ((currentOverallQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentCategory]: {
        ...answers[currentCategory],
        [questions[currentQuestion].id]: value
      }
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const currentIndex = categories.indexOf(currentCategory);
      if (currentIndex < categories.length - 1) {
        setCurrentCategory(categories[currentIndex + 1]);
        setCurrentQuestion(0);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      const currentIndex = categories.indexOf(currentCategory);
      if (currentIndex > 0) {
        setCurrentCategory(categories[currentIndex - 1]);
        setCurrentQuestion(surveyQuestions[categories[currentIndex - 1]].length - 1);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await surveyAPI.submit(answers);
      navigate('/results', { state: { results: response.data.results } });
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isLastQuestion = currentCategory === 'workEnvironment' && currentQuestion === questions.length - 1;
  const currentAnswer = answers[currentCategory][questions[currentQuestion]?.id];

  return (
    <div className="survey-page">
      <div className="survey-container">
        <div className="survey-progress">
          <div className="survey-progress-bar">
            <div className="survey-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="survey-progress-text">
            <span>{categoryLabels[currentCategory]}</span>
            <span>Question {currentOverallQuestion + 1} of {totalQuestions}</span>
          </div>
        </div>

        <div className="survey-card">
          <div className="survey-question">
            <label className="survey-question-label">
              <span className="survey-question-number">{currentQuestion + 1}</span>
              {questions[currentQuestion]?.question}
            </label>

            <div className="survey-options">
              {questions[currentQuestion]?.options.map((option, index) => (
                <label 
                  key={index} 
                  className={`survey-option ${currentAnswer === index + 1 ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${currentCategory}-${currentQuestion}`}
                    value={index + 1}
                    checked={currentAnswer === index + 1}
                    onChange={() => handleAnswer(index + 1)}
                  />
                  <span className="survey-option-check"></span>
                  <span className="survey-option-text">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="survey-nav">
            <button 
              className="btn btn-secondary" 
              onClick={handlePrev}
              disabled={currentOverallQuestion === 0}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Previous
            </button>

            {isLastQuestion ? (
              <button 
                className="btn btn-primary" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Assessment'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
