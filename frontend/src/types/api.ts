// ==========================================
// BEM WEBSITE - GLOBAL API TYPES
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// -- User --
export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  departmentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  role?: { name: string; displayName: string };
  department?: { name: string };
}
export type UserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role' | 'department'>>;

// -- Event --
export interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  maxAttendees?: number;
  status: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { registrations: number };
}
export type EventInput = Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt' | '_count'>>;

// -- Department --
export interface Department {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { users: number; programs: number };
}
export type DepartmentInput = Partial<Omit<Department, 'id' | 'createdAt' | 'updatedAt' | '_count'>>;

// -- News --
export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  status: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
export type NewsInput = Partial<Omit<News, 'id' | 'createdAt' | 'updatedAt'>>;

// -- Task --
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
export type TaskInput = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;

// -- Program --
export interface Program {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  departmentId?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}
export type ProgramInput = Partial<Omit<Program, 'id' | 'createdAt' | 'updatedAt'>>;

// -- Organization Structure --
export interface OrganizationMember {
  id: string;
  name: string;
  position: string;
  photo?: string;
  level: string;
  departmentId?: string;
  order: number;
  isActive: boolean;
  periodStart?: string;
  periodEnd?: string;
  createdAt: string;
  updatedAt: string;
}
export type OrganizationMemberInput = Partial<Omit<OrganizationMember, 'id' | 'createdAt' | 'updatedAt'>>;

// -- Note --
export interface Note {
  id: string;
  title: string;
  content?: string;
  isShared: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
export type NoteInput = Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>;

// -- Announcement --
export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}
export type AnnouncementInput = Partial<Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>>;

// -- Gallery --
export interface GalleryItem {
  id: string;
  title?: string;
  url: string;
  type: string;
  eventId?: string;
  order: number;
  createdAt: string;
}
export type GalleryItemInput = Partial<Omit<GalleryItem, 'id' | 'createdAt'>>;

// -- Settings --
export type SettingsData = Record<string, any>;
export type SettingsInput = Record<string, any>;