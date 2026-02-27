import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              AI-Powered Career Guidance
            </div>
            <h1>Discover Your Perfect <span className="text-accent">Career Path</span></h1>
            <p>
              Take our comprehensive assessment and let our AI-powered system analyze your 
              skills, interests, personality, and work preferences to find the career that 
              matches who you truly are.
            </p>
            <div className="hero-buttons">
              {isAuthenticated ? (
                <Link to="/survey" className="btn btn-primary btn-lg">
                  Start Assessment
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Get Started Free
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                  <Link to="/careers" className="btn btn-secondary btn-lg">
                    Explore Careers
                  </Link>
                </>
              )}
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">50+</div>
                <div className="hero-stat-label">Career Options</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">40+</div>
                <div className="hero-stat-label">Assessment Questions</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">AI</div>
                <div className="hero-stat-label">Smart Matching</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Our AI-powered system guides you through a comprehensive assessment to find your ideal career match.</p>
          </div>
          <div className="features-grid">
            <div className="card feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <h3>Comprehensive Survey</h3>
              <p>Answer 40+ questions covering your skills, interests, personality traits, and work preferences.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a9 9 0 0 1 9 9c0 3.5-2 6.5-5 8l-1 1v2h-6v-2l-1-1c-3-1.5-5-4.5-5-8a9 9 0 0 1 9-9z"/>
                  <path d="M9 10h.01M15 10h.01"/>
                </svg>
              </div>
              <h3>AI Analysis</h3>
              <p>Our intelligent algorithm analyzes your responses and matches you with careers that align with your profile.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Personalized Results</h3>
              <p>Get detailed career recommendations with match percentages, salary info, and growth prospects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Ready to Discover Your Career Path?</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
            Take the first step towards finding a career that truly matches your skills, interests, and aspirations.
          </p>
          {isAuthenticated ? (
            <Link to="/survey" className="btn btn-primary btn-lg">
              Start Your Assessment
            </Link>
          ) : (
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

