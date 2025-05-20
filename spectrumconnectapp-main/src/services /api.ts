import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Define the base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create and configure an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        localStorage.removeItem('accessToken'); 
        
      }
    } else if (error.request) {
      console.error('API Error: No response', error.request);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
