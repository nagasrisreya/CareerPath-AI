import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me')
};

// Survey API
export const surveyAPI = {
  submit: (answers) => api.post('/survey/submit', { answers }),
  getResults: (id) => api.get(`/survey/results/${id}`),
  getHistory: () => api.get('/survey/history'),
  getLatestResults: () => api.get('/survey/latest-results')
};

// Careers API
export const careersAPI = {
  getAll: (params) => api.get('/careers', { params }),
  getById: (id) => api.get(`/careers/${id}`),
  search: (query) => api.get('/careers/search', { params: { q: query } }),
  getCategories: () => api.get('/careers/categories')
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getDashboard: () => api.get('/user/dashboard'),
  getSavedResults: () => api.get('/user/saved-results'),
  saveResult: (resultId) => api.post('/user/save-result', { resultId }),
  deleteSavedResult: (id) => api.delete(`/user/saved-results/${id}`)
};

export default api;

