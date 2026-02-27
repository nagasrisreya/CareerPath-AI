
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { careersAPI } from '../services/api';
import CareerCard from '../components/CareerCard';

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCareers();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchCareers();
    }
  }, [selectedCategory]);

  const fetchCareers = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (selectedCategory) params.category = selectedCategory;
      
      const response = await careersAPI.getAll(params);
      setCareers(response.data);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await careersAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCareers();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  return (
    <div className="careers-page">
      <div className="careers-container">
        <div className="careers-header">
          <h2>Explore Career Options</h2>
          <p>Browse our database of {careers.length || 50}+ careers and find your perfect match.</p>
        </div>

        <div className="careers-filters">
          <form onSubmit={handleSearch} className="careers-search">
            <input
              type="text"
              className="form-input"
              placeholder="Search careers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button
            className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setSelectedCategory('')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading careers...</p>
          </div>
        ) : (
          <>
            {careers.length > 0 ? (
              <div className="careers-grid">
                {careers.map((career) => (
                  <CareerCard key={career._id} career={career} />
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                <h3>No careers found</h3>
                <p>Try adjusting your search or filters.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {setSearch(''); setSelectedCategory(''); fetchCareers();}}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <h3>Ready to find your perfect career?</h3>
          <p>Take our comprehensive assessment and get personalized recommendations.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;


