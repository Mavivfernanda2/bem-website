import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetEvents, useCreateEvent } from '../../hooks/useEvents';
import type { EventInput } from '../../types/api';

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function AdminCalendar() {
  const { data: eventsData = [], isLoading, refetch } = useGetEvents();
  const createMutation = useCreateEvent();

  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<EventInput>();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const onSubmit = async (formData: EventInput) => {
    try {
      await createMutation.mutateAsync({ ...formData, status: 'published' });
      await refetch();
      setIsModalOpen(false);
      reset();
    } catch { /* error handled in hook */ }
  };

  // Group events by YYYY-MM-DD
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, { title: string; color: string }[]> = {};
    for (const ev of eventsData) {
      const dateStr = ev.startDate.split('T')[0];
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push({ title: ev.title, color: ev.status === 'published' ? '#34D399' : '#F59E0B' });
    }
    return grouped;
  }, [eventsData]);

  // Upcoming Events list (events that are strictly >= today or just first few)
  const upcomingEvents = useMemo(() => {
    const sorted = [...eventsData].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    return sorted.slice(0, 5); // Take first 5
  }, [eventsData]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Kalender</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Jadwal kegiatan dan event organisasi.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { reset({ title: '', slug: '', startDate: '', location: '', description: '' }); setIsModalOpen(true); }}>
          <Plus size={16} /> Tambah Event
        </button>
      </div>

      <div className="glass-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button onClick={prevMonth} className="btn btn-ghost" style={{ padding: '8px' }}><ChevronLeft size={20} /></button>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem' }}>
            {months[month]} {year}
          </h2>
          <button onClick={nextMonth} className="btn btn-ghost" style={{ padding: '8px' }}><ChevronRight size={20} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
          {days.map(d => (
            <div key={d} style={{ textAlign: 'center', padding: '8px', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {calendarDays.map((day, i) => {
            const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
            const dayEvents = dateStr ? eventsByDate[dateStr] || [] : [];
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

            return (
              <motion.div key={i}
                style={{ minHeight: '80px', padding: '8px', borderRadius: 'var(--radius-sm)', background: day ? (isToday ? 'rgba(31,107,82,0.15)' : 'rgba(255,255,255,0.02)') : 'transparent', border: isToday ? '1px solid rgba(31,107,82,0.3)' : '1px solid transparent', cursor: day ? 'pointer' : 'default', transition: 'all 0.2s' }}
                whileHover={day ? { background: 'rgba(255,255,255,0.05)' } : {}}
              >
                {day && (
                  <>
                    <div style={{ fontSize: '0.82rem', fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--color-emerald-glow)' : 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{day}</div>
                    {dayEvents.map((ev, j) => (
                      <div key={j} style={{ padding: '2px 6px', borderRadius: '4px', background: `${ev.color}20`, color: ev.color, fontSize: '0.65rem', fontWeight: 600, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={ev.title}>
                        {ev.title}
                      </div>
                    ))}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: '12px' }}>Event Mendatang</h3>
        {isLoading && <div style={{ color: 'rgba(255,255,255,0.4)', padding: '16px' }}>Memuat events...</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {upcomingEvents.map((ev, i) => (
            <motion.div key={ev.id} className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: ev.status === 'published' ? `rgba(52,211,153,0.15)` : 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ev.status === 'published' ? '#34D399' : '#F59E0B', flexShrink: 0 }}>
                <CalendarIcon size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{ev.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{new Date(ev.startDate).toLocaleDateString('id-ID')}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '480px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>Tambah Agenda Kalender</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Judul Agenda</label>
                  <input type="text" className="glass-input" placeholder="Contoh: Rapat Pleno I" {...register('title', { required: true, onChange: e => setValue('slug', generateSlug(e.target.value)) })} />
                </div>
                
                <input type="hidden" {...register('slug')} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Tanggal</label>
                    <input type="date" className="glass-input" style={{ colorScheme: 'dark' }} {...register('startDate', { required: true })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Lokasi</label>
                    <input type="text" className="glass-input" placeholder="Lokasi..." {...register('location')} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Keterangan Singkat</label>
                  <textarea className="glass-input" rows={3} placeholder="Tambahkan detail jika diperlukan..." style={{ resize: 'none' }} {...register('description')} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Menyimpan...' : 'Simpan Agenda'}
                </button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}