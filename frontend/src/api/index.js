const API_URL = 'http://localhost:5000/api';

const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const api = {
  auth: {
    login: (credentials) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    getMe: () => fetchAPI('/auth/me', { method: 'GET' }),
  },
  tasks: {
    getAll: () => fetchAPI('/tasks', { method: 'GET' }),
    create: (title) => fetchAPI('/tasks', { method: 'POST', body: JSON.stringify({ title }) }),
    update: (id, updates) => fetchAPI(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    delete: (id) => fetchAPI(`/tasks/${id}`, { method: 'DELETE' }),
  }
};
