// Shared type definitions between frontend and backend

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: string;
  roleName: string;
  department?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    roleName: string;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ path: string[]; message: string }>;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  status: string;
  registrationCount?: number;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  authorName?: string;
  status: string;
  publishedAt?: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  childCount?: number;
  userCount?: number;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  departmentName?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: { id: string; name: string; avatar?: string };
  creator: { id: string; name: string; avatar?: string };
  dueDate?: string;
}

export interface Note {
  id: string;
  title: string;
  content?: string;
  isShared: boolean;
  author: { name: string; avatar?: string };
  updatedAt: string;
}
