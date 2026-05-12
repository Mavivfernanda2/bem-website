import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,

  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: false,
});

// ======================================
// REQUEST INTERCEPTOR
// ======================================

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem('token');

    console.log('TOKEN:', token);

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ======================================
// RESPONSE INTERCEPTOR
// ======================================

api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      console.error(
        '401 Unauthorized'
      );

      // JANGAN AUTO LOGOUT DULU
      // BIAR GAK BALIK LOGIN TERUS

      /*
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.href = '/login';
      */
    }

    return Promise.reject(error);
  }
);