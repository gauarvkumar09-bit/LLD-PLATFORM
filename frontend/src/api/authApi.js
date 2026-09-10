import axios from 'axios';

const API = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export const authApi = {
  register: async (userData) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
  },
  login: async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    return res.data;
  },
  getMe: async () => {
    const res = await API.get('/auth/me');
    return res.data;
  },
  logout: async () => {
    const res = await API.post('/auth/logout');
    return res.data;
  },
};