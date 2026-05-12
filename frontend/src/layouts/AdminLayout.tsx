import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, Newspaper, ListTodo,
  ChevronLeft, ChevronRight, LogOut, Settings, Bell,
  Search, Moon, Menu, Building2, FolderTree, Image,
  FileText, Megaphone, CalendarDays,
} from 'lucide-react';
import './AdminLayout.css';

const sidebarGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    ],
  },
  {
    label: 'Organisasi',
    items: [
      { label: 'Struktur', icon: Building2, path: '/admin/organization' },
      { label: 'Departemen', icon: FolderTree, path: '/admin/departments' },
      { label: 'Users', icon: Users, path: '/admin/users' },
    ],
  },
  {
    label: 'Konten',
    items: [
      { label: 'Events', icon: Calendar, path: '/admin/events' },
      { label: 'Berita', icon: Newspaper, path: '/admin/news' },
      { label: 'Program', icon: FolderTree, path: '/admin/programs' },
      { label: 'Galeri', icon: Image, path: '/admin/gallery' },
    ],
  },
  {
    label: 'Produktivitas',
    items: [
      { label: 'Tasks', icon: ListTodo, path: '/admin/tasks' },
      { label: 'Notes', icon: FileText, path: '/admin/notes' },
      { label: 'Kalender', icon: CalendarDays, path: '/admin/calendar' },
    ],
  },
  {
    label: 'Sistem',
    items: [
      { label: 'Pengumuman', icon: Megaphone, path: '/admin/announcements' },
      { label: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>
        <div className="sidebar__header">
          {!collapsed && (
            <Link to="/" className="sidebar__logo">
              <div className="sidebar__logo-icon"><span>IP</span></div>
              <div className="sidebar__logo-text">
                <span className="sidebar__logo-name">IPNU IPPNU</span>
                <span className="sidebar__logo-tag">Admin Panel</span>
              </div>
            </Link>
          )}
          <button className="sidebar__toggle" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="sidebar__nav">
          {sidebarGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: '8px' }}>
              {!collapsed && (
                <div style={{ padding: '8px 14px 4px', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.2)' }}>
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={18} />
                    {!collapsed && <span>{item.label}</span>}
                    {isActive && <motion.div className="sidebar__active-glow" layoutId="sidebarGlow" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__item sidebar__item--logout" onClick={handleLogout}>
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__left">
            <button className="admin-topbar__menu-btn" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="admin-topbar__search">
              <Search size={16} />
              <input type="text" placeholder="Search anything..." className="admin-topbar__search-input" />
            </div>
          </div>
          <div className="admin-topbar__right">
            <button className="admin-topbar__icon-btn"><Moon size={18} /></button>
            <button className="admin-topbar__icon-btn">
              <Bell size={18} />
              <span className="admin-topbar__badge">3</span>
            </button>
            <div className="admin-topbar__avatar">
              <span>SA</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
