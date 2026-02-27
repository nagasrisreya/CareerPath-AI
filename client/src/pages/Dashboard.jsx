import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI, surveyAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, historyRes] = await Promise.all([
        userAPI.getProfile(),
        surveyAPI.getHistory()
      ]);
      setProfile(profileRes.data);
      setHistory(historyRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Welcome back, {profile?.name || 'User'}!</h2>
          <p>Track your career assessment progress and saved results.</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{profile?.assessmentCount || 0}</h3>
              <p>Assessments Taken</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💾</div>
            <div className="stat-info">
              <h3>{history.length}</h3>
              <p>Results Saved</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>{history.length > 0 ? 'Active' : 'Not Started'}</h3>
              <p>Progress Status</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/survey" className="btn btn-primary btn-lg">
            {history.length > 0 ? 'Retake Assessment' : 'Start Assessment'}
          </Link>
          <Link to="/careers" className="btn btn-secondary btn-lg">
            Explore Careers
          </Link>
        </div>

        {history.length > 0 ? (
          <div className="dashboard-section">
            <h3>Your Assessment History</h3>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={item._id || index} className="history-card card">
                  <div className="history-date">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="history-results">
                    {item.results && item.results.slice(0, 3).map((result, idx) => (
                      <div key={idx} className="history-result">
                        <span className="result-name">{result.careerName}</span>
                        <span className="result-score">{result.matchScore}% Match</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="dashboard-section">
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No assessments yet</h3>
              <p>Take your first career assessment to get personalized recommendations.</p>
              <Link to="/survey" className="btn btn-primary">
                Start Assessment
              </Link>
            </div>
          </div>
        )}

        <div className="dashboard-section">
          <h3>Quick Tips</h3>
          <div className="tips-grid">
            <div className="tip-card card">
              <h4>🎯 Be Honest</h4>
              <p>Answer questions truthfully for the most accurate career matches.</p>
            </div>
            <div className="tip-card card">
              <h4>📚 Explore Options</h4>
              <p>Don&apos;t limit yourself - explore careers you might not have considered.</p>
            </div>
            <div className="tip-card card">
              <h4>🔄 Update Regularly</h4>
              <p>Retake the assessment as your interests and skills evolve over time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

