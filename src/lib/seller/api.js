import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sellerApi = {
  login: (emailAddress, registrationId) =>
    api.post('/seller-registration/login', { emailAddress, registrationId }),

  getProfile: (id) =>
    api.get(`/seller-registration/${id}`),

  getStats: () =>
    api.get('/seller-registration/stats'),

  getAll: () =>
    api.get('/seller-registration'),
};

export default api;
