import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="navbar-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <path d="M12 2a9 9 0 0 1 9 9c0 3.5-2 6.5-5 8l-1 1v2h-6v-2l-1-1c-3-1.5-5-4.5-5-8a9 9 0 0 1 9-9z"/>
                <path d="M9 10h.01M15 10h.01M9.5 15a2.5 2.5 0 0 0 5 0"/>
              </svg>
              CareerPath AI
            </Link>
            <p>Discover your perfect career path with AI-powered guidance tailored to your unique strengths and preferences.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/survey">Take Survey</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/careers?category=Technology">Technology</Link></li>
              <li><Link to="/careers?category=Business">Business</Link></li>
              <li><Link to="/careers?category=Healthcare">Healthcare</Link></li>
              <li><Link to="/careers?category=Finance">Finance</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CareerPath AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

