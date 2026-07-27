import axios from 'axios';

import { API_URL } from '../api';


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
