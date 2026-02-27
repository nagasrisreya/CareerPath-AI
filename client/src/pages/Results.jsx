import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
    } else {
      fetchLatestResults();
    }
  }, [location.state]);

  const fetchLatestResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/survey/latest-results', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.results) {
        setResults(data.results);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  if (!results || results.length === 0) {
    return (
      <div className="results-page">
        <div className="results-container">
          <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>No Results Yet</h2>
            <p>Take the assessment to see your career matches.</p>
            <Link to="/survey" className="btn btn-primary">
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-header">
          <h2>Your Career Matches</h2>
          <p>Based on your assessment, here are the careers that best match your profile.</p>
        </div>

        <div className="results-grid">
          {results.slice(0, 5).map((result, index) => (
            <div key={index} className="card result-card">
              <div className="result-rank">{index + 1}</div>
              <div className="result-info">
                <span className="result-category">{result.category}</span>
                <h3>{result.careerName}</h3>
                <p>{result.description}</p>
                
                <div className="result-match">
                  <div className="result-match-bar">
                    <div 
                      className="result-match-fill" 
                      style={{ width: `${result.matchScore}%` }}
                    ></div>
                  </div>
                  <span className="result-match-percent">{result.matchScore}%</span>
                </div>

                <div className="result-details">
                  <div className="result-detail">
                    <span className="result-detail-label">Salary Range</span>
                    <span className="result-detail-value">{result.salaryRange}</span>
                  </div>
                  <div className="result-detail">
                    <span className="result-detail-label">Growth Rate</span>
                    <span className="result-detail-value">{result.growthRate}</span>
                  </div>
                  <div className="result-detail">
                    <span className="result-detail-label">Education</span>
                    <span className="result-detail-value">{result.education}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="result-actions">
          <Link to="/survey" className="btn btn-secondary">
            Retake Assessment
          </Link>
          <Link to="/dashboard" className="btn btn-primary">
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;

