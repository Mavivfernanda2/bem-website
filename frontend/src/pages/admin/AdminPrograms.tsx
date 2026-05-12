import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, MoreHorizontal, CheckCircle, Clock, AlertCircle, X, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetPrograms, useCreateProgram, useUpdateProgram, useDeleteProgram } from '../../hooks/usePrograms';
import { useDepartments } from '../../hooks/useDepartments';
import type { Program, ProgramInput } from '../../types/api';

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  active: { label: 'Berjalan', color: '#34D399', icon: Clock },
  completed: { label: 'Selesai', color: '#60A5FA', icon: CheckCircle },
  draft: { label: 'Rencana', color: '#F59E0B', icon: AlertCircle },
};

export default function AdminPrograms() {
  const { data: programsData = [], isLoading, refetch } = useGetPrograms();
  const { data: departmentsData = [] } = useDepartments();
  const createMutation = useCreateProgram();
  const updateMutation = useUpdateProgram();
  const deleteMutation = useDeleteProgram();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<ProgramInput>();

  const openCreate = () => {
    setEditingProgram(null);
    reset({ title: '', slug: '', description: '', departmentId: '', status: 'draft', startDate: '', endDate: '' });
    setIsModalOpen(true);
  };

  const openEdit = (prog: Program) => {
    setEditingProgram(prog);
    setValue('title', prog.title);
    setValue('slug', prog.slug);
    setValue('description', prog.description || '');
    setValue('departmentId', prog.departmentId || '');
    setValue('status', prog.status);
    if (prog.startDate) setValue('startDate', prog.startDate.split('T')[0].slice(0, 7)); // YYYY-MM
    if (prog.endDate) setValue('endDate', prog.endDate.split('T')[0].slice(0, 7)); // YYYY-MM
    setDropdownOpen(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: ProgramInput) => {
    try {
      const payload = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate + '-01').toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate + '-01').toISOString() : undefined,
      };

      if (editingProgram) {
        await updateMutation.mutateAsync({ id: editingProgram.id, ...payload });
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

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const formatMonthYear = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
  };

  const getProgress = (status: string) => {
    if (status === 'completed') return 100;
    if (status === 'active') return 50;
    return 0;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Program Kerja</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Kelola program kerja dan kegiatan organisasi.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Tambah Program
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
          Memuat data program...
        </div>
      ) : programsData.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
          <AlertCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p>Belum ada program kerja. Klik "Tambah Program" untuk memulai.</p>
        </div>
      ) : (
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr><th>Program</th><th>Departemen</th><th>Status</th><th>Periode</th><th>Progress</th><th></th></tr>
            </thead>
            <tbody>
              {programsData.map((prog, i) => {
                const s = statusConfig[prog.status] || statusConfig.draft;
                const SIcon = s.icon;
                const progress = getProgress(prog.status);
                return (
                  <motion.tr key={prog.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} style={{ position: 'relative' }}>
                    <td style={{ fontWeight: 600, fontSize: '0.9rem' }}>{prog.title}</td>
                    <td style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{prog.department?.name || '-'}</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '99px', background: `${s.color}15`, color: s.color, fontSize: '0.75rem', fontWeight: 600 }}>
                        <SIcon size={11} /> {s.label}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {formatMonthYear(prog.startDate)} — {formatMonthYear(prog.endDate)}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', borderRadius: '99px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', minWidth: '60px' }}>
                          <motion.div
                            style={{ height: '100%', borderRadius: '99px', background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', minWidth: '32px' }}>{progress}%</span>
                      </div>
                    </td>
                    <td>
                      <button style={{ color: 'rgba(255,255,255,0.3)' }} onClick={() => setDropdownOpen(dropdownOpen === prog.id ? null : prog.id)}>
                        <MoreHorizontal size={16} />
                      </button>

                      <AnimatePresence>
                        {dropdownOpen === prog.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{ position: 'absolute', top: '50px', right: '12px', zIndex: 50, background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                          >
                            <button onClick={() => openEdit(prog)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => { setDeleteConfirm(prog.id); setDropdownOpen(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#EF4444', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <Trash2 size={14} /> Hapus
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL TAMBAH PROGRAM */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '480px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>{editingProgram ? 'Edit Program Kerja' : 'Tambah Program Kerja'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Judul Program</label>
                  <input type="text" className="glass-input" placeholder="Contoh: Webinar Literasi Digital" {...register('title', { required: true, onChange: (e) => { if (!editingProgram) setValue('slug', generateSlug(e.target.value)); } })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Slug</label>
                  <input type="text" className="glass-input" placeholder="webinar-literasi-digital" {...register('slug', { required: true })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Departemen Penanggung Jawab</label>
                  <select className="glass-input" {...register('departmentId')}>
                    <option value="" disabled style={{ background: '#1B2E26', color: '#fff' }}>Pilih Departemen...</option>
                    {departmentsData.map(dept => (
                      <option key={dept.id} value={dept.id} style={{ background: '#1B2E26', color: '#fff' }}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Bulan Mulai</label>
                    <input type="month" className="glass-input" style={{ colorScheme: 'dark' }} {...register('startDate')} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Bulan Selesai</label>
                    <input type="month" className="glass-input" style={{ colorScheme: 'dark' }} {...register('endDate')} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Status Saat Ini</label>
                  <select className="glass-input" {...register('status')}>
                    <option value="draft" style={{ background: '#1B2E26', color: '#fff' }}>Rencana (Draft)</option>
                    <option value="active" style={{ background: '#1B2E26', color: '#fff' }}>Berjalan (Active)</option>
                    <option value="completed" style={{ background: '#1B2E26', color: '#fff' }}>Selesai (Completed)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) ? 'Menyimpan...' : (editingProgram ? 'Simpan Perubahan' : 'Simpan Program')}
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
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>Hapus Program?</h3>
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