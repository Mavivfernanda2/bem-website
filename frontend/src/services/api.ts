const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  }

  async patch<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  }

  async delete<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  }
}

export const api = new ApiClient(API_URL);

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout', {}),
  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
};

// Users API
export const usersApi = {
  list: (page = 1, limit = 10, search = '') =>
    api.get(`/users?page=${page}&limit=${limit}&search=${search}`),
  getById: (id: string) => api.get(`/users/${id}`),
};

// Events API
export const eventsApi = {
  list: (page = 1, limit = 10) =>
    api.get(`/events?page=${page}&limit=${limit}`),
  getBySlug: (slug: string) => api.get(`/events/${slug}`),
};

// News API
export const newsApi = {
  list: (page = 1, limit = 10) =>
    api.get(`/news?page=${page}&limit=${limit}`),
  getBySlug: (slug: string) => api.get(`/news/${slug}`),
};

// Programs API
export const programsApi = {
  list: (status?: string) =>
    api.get(`/programs${status ? `?status=${status}` : ''}`),
  getBySlug: (slug: string) => api.get(`/programs/${slug}`),
};

// Tasks API
export const tasksApi = {
  list: (status?: string) =>
    api.get(`/tasks${status ? `?status=${status}` : ''}`),
  create: (data: { title: string; description?: string; priority?: string; assigneeId?: string }) =>
    api.post('/tasks', data),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

// Notes API
export const notesApi = {
  list: () => api.get('/notes'),
  create: (data: { title: string; content?: string; isShared?: boolean }) =>
    api.post('/notes', data),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/notes/${id}`, data),
  delete: (id: string) => api.delete(`/notes/${id}`),
};
