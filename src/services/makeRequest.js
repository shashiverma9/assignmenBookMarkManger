import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const register = async (email, password) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getBookmarks = async (token) => {
  const response = await api.get('/bookmarks', {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export const addBookmark = async (token, url) => {
  const response = await api.post('/bookmarks', { url }, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export const deleteBookmark = async (token, id) => {
  const response = await api.delete(`/bookmarks/${id}`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};
