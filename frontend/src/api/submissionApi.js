import axios from 'axios';

const API = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export const submissionApi = {
  submitSolution: async (submissionData) => {
    const res = await API.post('/submissions/submit', submissionData);
    return res.data;
  },
  getHistory: async () => {
    const res = await API.get('/submissions/history');
    return res.data;
  },
};