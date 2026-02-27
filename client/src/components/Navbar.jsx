import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a9 9 0 0 1 9 9c0 3.5-2 6.5-5 8l-1 1v2h-6v-2l-1-1c-3-1.5-5-4.5-5-8a9 9 0 0 1 9-9z"/>
            <path d="M9 10h.01M15 10h.01M9.5 15a2.5 2.5 0 0 0 5 0"/>
          </svg>
          CareerPath AI
        </Link>

        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/careers" 
              className={`navbar-link ${isActive('/careers') ? 'active' : ''}`}
            >
              Careers
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link 
                  to="/survey" 
                  className={`navbar-link ${isActive('/survey') ? 'active' : ''}`}
                >
                  Survey
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="navbar-user">
              <Link to="/dashboard" className="navbar-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

