import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, Share2, Lock, MoreHorizontal, Search, X, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetNotes, useCreateNote, useUpdateNote, useDeleteNote } from '../../hooks/useNotes';
import type { Note, NoteInput } from '../../types/api';

export default function AdminNotes() {
  const { data: notesData = [], isLoading, refetch } = useGetNotes();
  const createMutation = useCreateNote();
  const updateMutation = useUpdateNote();
  const deleteMutation = useDeleteNote();

  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<NoteInput>();

  useEffect(() => {
    if (notesData.length > 0 && !activeNote) {
      setActiveNote(notesData[0]);
    }
  }, [notesData, activeNote]);

  const filtered = notesData.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => {
    setEditingNote(null);
    reset({ title: '', content: '', isShared: true });
    setIsModalOpen(true);
  };

  const openEdit = (note: Note) => {
    setEditingNote(note);
    setValue('title', note.title);
    setValue('content', note.content || '');
    setValue('isShared', note.isShared);
    setDropdownOpen(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: NoteInput) => {
    try {
      // transform string to boolean from select input
      const payload = {
        ...formData,
        isShared: String(formData.isShared) === 'true',
      };

      if (editingNote) {
        await updateMutation.mutateAsync({ id: editingNote.id, ...payload });
        setActiveNote({ ...editingNote, ...payload } as Note);
      } else {
        await createMutation.mutateAsync(payload);
      }
      await refetch();
      setIsModalOpen(false);
      reset();
    } catch { /* err handled */ }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      await refetch();
      if (activeNote?.id === id) setActiveNote(null);
      setDeleteConfirm(null);
      setDropdownOpen(null);
    } catch { /* err handled */ }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Notes</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Catatan dan dokumentasi organisasi.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Tulis Note
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '16px', minHeight: '500px' }}>
        {/* Note List */}
        <div className="glass-card" style={{ padding: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', marginBottom: '12px' }}>
            <Search size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <input type="text" placeholder="Cari notes..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, background: 'none', border: 'none', color: 'var(--color-soft-cream)', fontSize: '0.82rem', outline: 'none' }} />
          </div>
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {isLoading && <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px' }}>Memuat...</div>}
            {!isLoading && filtered.length === 0 && <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px' }}>Tidak ada notes.</div>}
            {filtered.map((note, i) => (
              <motion.button key={note.id} onClick={() => setActiveNote(note)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 12px', borderRadius: 'var(--radius-sm)', background: activeNote?.id === note.id ? 'rgba(31,107,82,0.15)' : 'transparent', transition: 'all 0.2s', border: activeNote?.id === note.id ? '1px solid rgba(31,107,82,0.25)' : '1px solid transparent', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <FileText size={13} style={{ color: activeNote?.id === note.id ? 'var(--color-emerald-glow)' : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#fff' }}>{note.title}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>
                  <span>{note.author?.name || 'Unknown'}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {note.isShared ? <Share2 size={9} /> : <Lock size={9} />}
                    {new Date(note.updatedAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Note Content */}
        {activeNote ? (
          <motion.div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', position: 'relative' }} key={activeNote.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '4px' }}>{activeNote.title}</h2>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', display: 'flex', gap: '12px' }}>
                  <span>{activeNote.author?.name || 'Unknown'}</span>
                  <span>{new Date(activeNote.updatedAt).toLocaleDateString('id-ID')}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: activeNote.isShared ? 'var(--color-emerald-glow)' : 'rgba(255,255,255,0.35)' }}>
                    {activeNote.isShared ? <><Share2 size={10} /> Shared</> : <><Lock size={10} /> Private</>}
                  </span>
                </div>
              </div>
              <button style={{ color: 'rgba(255,255,255,0.3)', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setDropdownOpen(dropdownOpen === activeNote.id ? null : activeNote.id)}>
                <MoreHorizontal size={18} />
              </button>

              <AnimatePresence>
                {dropdownOpen === activeNote.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    style={{ position: 'absolute', top: '56px', right: '28px', zIndex: 50, background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                  >
                    <button onClick={() => openEdit(activeNote)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => { setDeleteConfirm(activeNote.id); setDropdownOpen(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#EF4444', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <Trash2 size={14} /> Hapus
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div style={{ flex: 1, padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.04)', fontSize: '0.92rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.65)', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-body)', overflowY: 'auto' }}>
              {activeNote.content}
            </div>
          </motion.div>
        ) : (
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>
            Pilih atau buat catatan baru
          </div>
        )}
      </div>

      {/* MODAL TULIS NOTE */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '580px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>{editingNote ? 'Edit Note' : 'Tulis Note Baru'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Judul Note</label>
                  <input type="text" className="glass-input" placeholder="Contoh: Rapat Koordinasi..." {...register('title', { required: true })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Isi Catatan</label>
                  <textarea className="glass-input" rows={6} placeholder="Ketik catatan di sini..." style={{ resize: 'none' }} {...register('content')} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Privasi</label>
                  <select className="glass-input" {...register('isShared')}>
                    <option value="true" style={{ background: '#1B2E26', color: '#fff' }}>Shared (Bisa dilihat semua admin)</option>
                    <option value="false" style={{ background: '#1B2E26', color: '#fff' }}>Private (Hanya saya)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) ? 'Menyimpan...' : (editingNote ? 'Simpan Perubahan' : 'Simpan Note')}
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
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>Hapus Note?</h3>
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