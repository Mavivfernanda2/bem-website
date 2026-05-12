import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, MapPin, Users, MoreHorizontal, X, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../../hooks/useEvents';
import type { Event, EventInput } from '../../types/api';

export default function AdminEvents() {
  const { data: eventsData = [], isLoading, refetch } = useGetEvents();

  const events = Array.isArray(eventsData) ? eventsData : [];
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();
  const deleteMutation = useDeleteEvent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<EventInput>();

  const openCreate = () => {
    setEditingEvent(null);
    reset({ title: '', slug: '', startDate: '', endDate: '', location: '', maxAttendees: 0, status: 'draft' });
    setIsModalOpen(true);
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    setValue('title', event.title);
    setValue('slug', event.slug);
    // Parse datetime for input date if needed, but since it's an API, keep it string ISO format or slice for input type='date'
    setValue('startDate', event.startDate.split('T')[0]);
    if (event.endDate) setValue('endDate', event.endDate.split('T')[0]);
    setValue('location', event.location || '');
    setValue('maxAttendees', event.maxAttendees || 0);
    setValue('status', event.status);
    setDropdownOpen(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: EventInput) => {
    try {
      // Ensure maxAttendees is a number
      const payload = {
        ...formData,
        maxAttendees: formData.maxAttendees ? Number(formData.maxAttendees) : undefined,
      };

      if (editingEvent) {
        await updateMutation.mutateAsync({ id: editingEvent.id, ...payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      await refetch();
      setIsModalOpen(false);
      reset();
    } catch { /* error handled in hook */ }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);

      // FORCE REFRESH DATA
      await refetch();

      // TUTUP MODAL
      setDeleteConfirm(null);
      setDropdownOpen(null);

    } catch (error) {
      console.error('Gagal menghapus event:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Events</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Kelola event dan kegiatan organisasi.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Tambah Event
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
          Memuat data event...
        </div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
          <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p>Belum ada event. Klik "Tambah Event" untuk memulai.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {events.map((ev, i) => (
            <motion.div key={ev.id} className="glass-card" style={{ padding: '24px', position: 'relative' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 600, background: ev.status === 'published' ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)', color: ev.status === 'published' ? '#34D399' : 'rgba(255,255,255,0.4)' }}>
                  {ev.status === 'published' ? 'Published' : 'Draft'}
                </span>
                <button style={{ color: 'rgba(255,255,255,0.3)' }} onClick={() => setDropdownOpen(dropdownOpen === ev.id ? null : ev.id)}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '12px' }}>{ev.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {new Date(ev.startDate).toLocaleDateString('id-ID')}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> {ev.location || 'Tidak ada lokasi'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={14} /> {ev._count?.registrations || 0} peserta terdaftar</span>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen === ev.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{ position: 'absolute', top: '50px', right: '12px', zIndex: 50, background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                  >
                    <button onClick={() => openEdit(ev)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => { setDeleteConfirm(ev.id); setDropdownOpen(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#EF4444', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <Trash2 size={14} /> Hapus
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL TAMBAH EVENT */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '480px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>{editingEvent ? 'Edit Event' : 'Tambah Event'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Nama Event</label>
                  <input type="text" className="glass-input" placeholder="Contoh: Musyawarah Besar" {...register('title', { required: true, onChange: (e) => { if (!editingEvent) setValue('slug', generateSlug(e.target.value)); } })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Slug</label>
                  <input type="text" className="glass-input" placeholder="musyawarah-besar" {...register('slug', { required: true })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Tanggal Mulai</label>
                    <input type="date" className="glass-input" style={{ colorScheme: 'dark' }} {...register('startDate', { required: true })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Target Peserta</label>
                    <input type="number" className="glass-input" placeholder="Contoh: 100" {...register('maxAttendees')} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Lokasi</label>
                  <input type="text" className="glass-input" placeholder="Contoh: Aula Utama" {...register('location')} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Status Publikasi</label>
                  <select className="glass-input" {...register('status')}>
                    <option value="draft" style={{ background: '#1B2E26', color: '#fff' }}>Draft (Belum Dipublikasi)</option>
                    <option value="published" style={{ background: '#1B2E26', color: '#fff' }}>Published (Publik)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) ? 'Menyimpan...' : (editingEvent ? 'Simpan Perubahan' : 'Tambah Event')}
                </button>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }} onClick={e => e.stopPropagation()}>
              <Trash2 size={32} style={{ color: '#EF4444', margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>Hapus Event?</h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Data yang dihapus tidak dapat dikembalikan.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Batal</button>
                <button className="btn btn-primary" style={{ background: '#EF4444' }} onClick={() => handleDelete(deleteConfirm)} disabled={deleteMutation.isPending}>
                  {deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}