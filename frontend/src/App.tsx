import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Toaster as SonnerToaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { queryClient } from './lib/queryClient';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Beranda from './pages/public/Beranda';
import TentangKami from './pages/public/TentangKami';
import Departemen from './pages/public/Departemen';
import ProgramKerja from './pages/public/ProgramKerja';
import EventPage from './pages/public/EventPage';
import Berita from './pages/public/Berita';
import Galeri from './pages/public/Galeri';
import Kontak from './pages/public/Kontak';

// Member
import MemberPortal from './pages/member/MemberPortal';
import Login from './pages/auth/Login';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEvents from './pages/admin/AdminEvents';
import AdminNews from './pages/admin/AdminNews';
import AdminTasks from './pages/admin/AdminTasks';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminPrograms from './pages/admin/AdminPrograms';
import AdminGallery from './pages/admin/AdminGallery';
import AdminNotes from './pages/admin/AdminNotes';
import AdminCalendar from './pages/admin/AdminCalendar';
import AdminOrganization from './pages/admin/AdminOrganization';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminSettings from './pages/admin/AdminSettings';

import './index.css';


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Beranda />} />
              <Route path="/tentang" element={<TentangKami />} />
              <Route path="/departemen" element={<Departemen />} />
              <Route path="/program" element={<ProgramKerja />} />
              <Route path="/event" element={<EventPage />} />
              <Route path="/berita" element={<Berita />} />
              <Route path="/galeri" element={<Galeri />} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="/member" element={<MemberPortal />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="organization" element={<AdminOrganization />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="programs" element={<AdminPrograms />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="notes" element={<AdminNotes />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="calendar" element={<AdminCalendar />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1B2E26',
            color: '#F5F6F0',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
      <SonnerToaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#1B2E26',
            color: '#F5F6F0',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
