import { Link } from 'react-router-dom';

const CareerCard = ({ career }) => {
  return (
    <div className="card career-card">
      <div className="career-card-header">
        <div>
          <h4>{career.name}</h4>
          <span className="career-category">{career.category}</span>
        </div>
      </div>
      <p>{career.description}</p>
      <div className="career-meta">
        <span className="career-meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          {career.growthRate}
        </span>
        <span className="career-meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          ${(career.salaryMin / 1000).toFixed(0)}k - ${(career.salaryMax / 1000).toFixed(0)}k
        </span>
      </div>
    </div>
  );
};

export default CareerCard;

