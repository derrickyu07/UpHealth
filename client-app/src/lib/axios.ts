// src/lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5190/api',
  // Remove httpsAgent - browsers handle HTTPS differently
});

const token = localStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
