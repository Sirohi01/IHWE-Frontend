import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const buyerApi = {
  login: (emailAddress, registrationId) => 
    api.post('/buyer-registration/login', { emailAddress, registrationId }),
  
  getProfile: (id) => 
    api.get(`/buyer-registration/${id}`),
  
  getStats: () => 
    api.get('/buyer-registration/stats'),

  getAll: () => 
    api.get('/buyer-registration'),
};

export default api;
