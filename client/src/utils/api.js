import axios from 'axios';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');
const configuredApiBase = import.meta.env.VITE_API_URL?.trim();
const defaultApiBase = import.meta.env.DEV ? 'http://localhost:5002' : '';
const API_BASE = trimTrailingSlash(configuredApiBase || defaultApiBase);

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sharmapackaging_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sharmapackaging_token');
      localStorage.removeItem('sharmapackaging_user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const API_URL = API_BASE;

export const getMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
    return url;
  }
  const path = url.startsWith('/') ? url : `/${url}`;
  return API_BASE ? `${API_BASE}${path}` : path;
};

export const isYouTubeUrl = (url) => {
  if (!url) return false;
  return /youtu\.be|youtube\.com/.test(url);
};

export const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
  }
  return url;
};

export default api;
