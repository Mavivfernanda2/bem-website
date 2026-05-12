import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Bell, AlertTriangle, Info, Eye, EyeOff, MoreHorizontal, X, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetAnnouncements, useCreateAnnouncement, useUpdateAnnouncement, useDeleteAnnouncement } from '../../hooks/useAnnouncements';
import type { Announcement, AnnouncementInput } from '../../types/api';

const priorityConfig: Record<string, { label: string; color: string; icon: typeof Info }> = {
  high: { label: 'Penting', color: '#EF4444', icon: AlertTriangle },
  normal: { label: 'Normal', color: '#60A5FA', icon: Info },
  low: { label: 'Rendah', color: '#9CA3AF', icon: Bell },
};

export default function AdminAnnouncements() {
  const { data: announcementsData = [], isLoading, refetch } = useGetAnnouncements();
  const createMutation = useCreateAnnouncement();
  const updateMutation = useUpdateAnnouncement();
  const deleteMutation = useDeleteAnnouncement();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<AnnouncementInput>();

  const openCreate = () => {
    setEditingItem(null);
    reset({ title: '', content: '', priority: 'normal', isActive: true });
    setIsModalOpen(true);
  };

  const openEdit = (item: Announcement) => {
    setEditingItem(item);
    setValue('title', item.title);
    setValue('content', item.content);
    setValue('priority', item.priority);
    setValue('isActive', item.isActive);
    setDropdownOpen(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: AnnouncementInput) => {
    try {
      const payload = {
        ...formData,
        isActive: String(formData.isActive) === 'true',
      };

      if (editingItem) {
        await updateMutation.mutateAsync({ id: editingItem.id, ...payload });
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
      await refetch();
      setDeleteConfirm(null);
      setDropdownOpen(null);
    } catch { /* error handled in hook */ }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Pengumuman</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Kelola pengumuman untuk seluruh anggota.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Buat Pengumuman
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>Memuat pengumuman...</div>
      ) : announcementsData.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>Belum ada pengumuman.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {announcementsData.map((ann, i) => {
            const p = priorityConfig[ann.priority] || priorityConfig.normal;
            const PIcon = p.icon;
            return (
              <motion.div key={ann.id} className="glass-card" style={{ padding: '24px', opacity: ann.isActive ? 1 : 0.5, position: 'relative' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: ann.isActive ? 1 : 0.5, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '99px', background: `${p.color}15`, color: p.color, fontSize: '0.72rem', fontWeight: 600 }}>
                        <PIcon size={11} /> {p.label}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '99px', background: ann.isActive ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)', color: ann.isActive ? '#34D399' : 'rgba(255,255,255,0.3)', fontSize: '0.72rem', fontWeight: 600 }}>
                        {ann.isActive ? <><Eye size={10} /> Aktif</> : <><EyeOff size={10} /> Nonaktif</>}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>{new Date(ann.createdAt).toLocaleDateString('id-ID')}</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>Oleh: {ann.author?.name || 'Admin'}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>{ann.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{ann.content}</p>
                  </div>
                  <button style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0, background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setDropdownOpen(dropdownOpen === ann.id ? null : ann.id)}>
                    <MoreHorizontal size={18} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen === ann.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        style={{ position: 'absolute', top: '56px', right: '28px', zIndex: 50, background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                      >
                        <button onClick={() => openEdit(ann)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Edit size={14} /> Edit
                        </button>
                        <button onClick={() => { setDeleteConfirm(ann.id); setDropdownOpen(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#EF4444', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Trash2 size={14} /> Hapus
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* MODAL BUAT PENGUMUMAN */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '520px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>{editingItem ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Judul Pengumuman</label>
                  <input type="text" className="glass-input" placeholder="Contoh: Pendaftaran Musyawarah Dibuka" {...register('title', { required: true })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Isi Pengumuman</label>
                  <textarea className="glass-input" rows={4} placeholder="Tuliskan detail pengumuman secara lengkap..." style={{ resize: 'none' }} {...register('content', { required: true })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Prioritas</label>
                    <select className="glass-input" {...register('priority')}>
                      <option value="high" style={{ background: '#1B2E26', color: '#EF4444' }}>Penting (High)</option>
                      <option value="normal" style={{ background: '#1B2E26', color: '#60A5FA' }}>Normal</option>
                      <option value="low" style={{ background: '#1B2E26', color: '#9CA3AF' }}>Rendah (Low)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Status Publikasi</label>
                    <select className="glass-input" {...register('isActive')}>
                      <option value="true" style={{ background: '#1B2E26', color: '#34D399' }}>Aktif (Tampilkan)</option>
                      <option value="false" style={{ background: '#1B2E26', color: '#fff' }}>Nonaktif (Sembunyikan)</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) ? 'Menyimpan...' : (editingItem ? 'Simpan Perubahan' : 'Terbitkan Pengumuman')}
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
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>Hapus Pengumuman?</h3>
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