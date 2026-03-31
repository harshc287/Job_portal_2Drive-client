import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3005/api', 
});

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

const handleError = (error) =>
  error.response?.data?.message || error.message || 'Server Error';

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

export const jobsApi = {
  getJobs: async (page = 1, limit = 3, search = '') => {
    try {
      const res = await API.get(`/jobs?page=${page}&limit=${limit}&search=${search}`);
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