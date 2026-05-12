import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, User, MoreHorizontal, Eye, X, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetNews, useCreateNews, useUpdateNews, useDeleteNews } from '../../hooks/useNews';
import type { News, NewsInput } from '../../types/api';

export default function AdminNews() {
  const { data: newsData = [], isLoading, refetch } = useGetNews();
  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews();
  const deleteMutation = useDeleteNews();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<NewsInput>();

  const openCreate = () => {
    setEditingNews(null);
    reset({ title: '', slug: '', excerpt: '', content: '', status: 'draft' });
    setIsModalOpen(true);
  };

  const openEdit = (news: News) => {
    setEditingNews(news);
    setValue('title', news.title);
    setValue('slug', news.slug);
    setValue('excerpt', news.excerpt || '');
    setValue('content', news.content || '');
    setValue('status', news.status);
    setDropdownOpen(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: NewsInput) => {
    try {
      if (editingNews) {
        await updateMutation.mutateAsync({ id: editingNews.id, ...formData });
      } else {
        await createMutation.mutateAsync(formData);
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

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>News</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Kelola berita dan artikel organisasi.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Tulis Berita
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
          Memuat data berita...
        </div>
      ) : (
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr><th>Judul</th><th>Status</th><th>Author</th><th>Views</th><th>Tanggal</th><th></th></tr>
            </thead>
            <tbody>
              {newsData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.4)' }}>
                    Belum ada berita. Klik "Tulis Berita" untuk memulai.
                  </td>
                </tr>
              ) : (
                newsData.map((n, i) => (
                  <motion.tr key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} style={{ position: 'relative' }}>
                    <td style={{ fontWeight: 600, fontSize: '0.9rem', maxWidth: '300px' }}>{n.title}</td>
                    <td>
                      <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, background: n.status === 'published' ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)', color: n.status === 'published' ? '#34D399' : 'rgba(255,255,255,0.4)' }}>
                        {n.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td><span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}><User size={12} /> {n.author?.name || 'Unknown'}</span></td>
                    <td><span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}><Eye size={12} /> 0</span></td>
                    <td style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}><Calendar size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />{new Date(n.createdAt).toLocaleDateString('id-ID')}</td>
                    <td>
                      <button style={{ color: 'rgba(255,255,255,0.3)' }} onClick={() => setDropdownOpen(dropdownOpen === n.id ? null : n.id)}>
                        <MoreHorizontal size={16} />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {dropdownOpen === n.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{ position: 'absolute', top: '100%', right: '12px', zIndex: 50, background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                          >
                            <button onClick={() => openEdit(n)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => { setDeleteConfirm(n.id); setDropdownOpen(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#EF4444', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <Trash2 size={14} /> Hapus
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL TULIS BERITA */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '520px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>{editingNews ? 'Edit Berita' : 'Tulis Berita'}</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Judul Berita</label>
                  <input type="text" className="glass-input" placeholder="Contoh: Pelantikan Pengurus Baru..." {...register('title', { required: true, onChange: (e) => { if (!editingNews) setValue('slug', generateSlug(e.target.value)); } })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Slug</label>
                  <input type="text" className="glass-input" placeholder="contoh-pelantikan-baru" {...register('slug', { required: true })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Ringkasan Konten</label>
                  <textarea className="glass-input" rows={4} placeholder="Tulis isi berita di sini..." style={{ resize: 'none' }} {...register('content')} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Status Publikasi</label>
                  <select className="glass-input" {...register('status')}>
                    <option value="draft" style={{ background: '#1B2E26', color: '#fff' }}>Draft (Simpan sementara)</option>
                    <option value="published" style={{ background: '#1B2E26', color: '#fff' }}>Published (Terbitkan)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) ? 'Menyimpan...' : (editingNews ? 'Simpan Perubahan' : 'Simpan Berita')}
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
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>Hapus Berita?</h3>
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