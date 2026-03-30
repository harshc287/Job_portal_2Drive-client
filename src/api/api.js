import axios from 'axios';

// Base API instance
const API = axios.create({
  baseURL: 'http://localhost:3005/api', // Change if backend port differs
});

// Attach token to all requests automatically
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized error handler
const handleError = (error) =>
  error.response?.data?.message || error.message || 'Server Error';

// --- AUTH ---
export const authApi = {
  register: async (data) => {
    try {
      const res = await API.post('/auth/register', data);
      return res.data;
    } catch (err) {
      throw new Error(handleError(err));
    }
  },
  login: async (data) => {
    try {
      const res = await API.post('/auth/login', data);
      return res.data;
    } catch (err) {
      throw new Error(handleError(err));
    }
  },
};

// --- JOBS ---
export const jobsApi = {
  getJobs: async () => {
    try {
      const res = await API.get('/jobs');
      return res.data;
    } catch (err) {
      throw new Error(handleError(err));
    }
  },
  createJob: async (data) => {
    try {
      const res = await API.post('/jobs', data);
      return res.data;
    } catch (err) {
      throw new Error(handleError(err));
    }
  },
};

// --- APPLICATIONS ---
export const applicationsApi = {
  applyJob: async (jobId) => {
    try {
      const res = await API.post(`/applications/apply/${jobId}`);
      return res.data;
    } catch (err) {
      throw new Error(handleError(err));
    }
  },
  getApplicants: async (jobId) => {
    try {
      const res = await API.get(`/applications/applicants/${jobId}`);
      return res.data;
    } catch (err) {
      throw new Error(handleError(err));
    }
  },
};

export default API;