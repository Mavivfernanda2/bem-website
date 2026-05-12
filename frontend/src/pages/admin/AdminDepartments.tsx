import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, ArrowUpRight, MoreHorizontal, FolderTree, X, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDepartments, useCreateDepartment, useUpdateDepartment, useDeleteDepartment } from '../../hooks/useDepartments';
import type { Department, DepartmentInput } from '../../types/api';

export default function AdminDepartments() {
  const { data: departments = [], isLoading, refetch } = useDepartments();
  const createMutation = useCreateDepartment();
  const updateMutation = useUpdateDepartment();
  const deleteMutation = useDeleteDepartment();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<DepartmentInput>();

  const openCreate = () => {
    setEditingDept(null);
    reset({ name: '', slug: '', description: '', icon: '', order: 0 });
    setIsModalOpen(true);
  };

  const openEdit = (dept: Department) => {
    setEditingDept(dept);
    setValue('name', dept.name);
    setValue('slug', dept.slug);
    setValue('description', dept.description || '');
    setValue('icon', dept.icon || '');
    setValue('order', dept.order);
    setDropdownOpen(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: DepartmentInput) => {
    try {
      if (editingDept) {
        await updateMutation.mutateAsync({ id: editingDept.id, ...formData });
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

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Compute stats from live data
  const totalMembers = departments.reduce((a, b) => a + (b._count?.users || 0), 0);
  const totalPrograms = departments.reduce((a, b) => a + (b._count?.programs || 0), 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Departemen</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Kelola struktur departemen organisasi.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} /> Tambah Departemen
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--color-emerald-glow)' }}>{departments.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Total Departemen</div>
        </div>
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.6rem', color: '#60A5FA' }}>{totalMembers}</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Total Anggota</div>
        </div>
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.6rem', color: '#F59E0B' }}>{totalPrograms}</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Total Program</div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
          Memuat data departemen...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && departments.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
          <FolderTree size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p>Belum ada departemen. Klik "Tambah Departemen" untuk memulai.</p>
        </div>
      )}

      {/* Department Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {departments.map((dept, i) => (
          <motion.div key={dept.id} className="glass-card" style={{ padding: '24px', cursor: 'pointer', position: 'relative' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.02 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(31,107,82,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                {dept.icon || '📁'}
              </div>
              <button style={{ color: 'rgba(255,255,255,0.3)' }} onClick={() => setDropdownOpen(dropdownOpen === dept.id ? null : dept.id)}><MoreHorizontal size={16} /></button>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '12px' }}>{dept.name}</h3>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {dept._count?.users || 0} anggota</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FolderTree size={14} /> {dept._count?.programs || 0} program</span>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen === dept.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{ position: 'absolute', top: '56px', right: '12px', zIndex: 50, background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                >
                  <button onClick={() => openEdit(dept)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={() => { setDeleteConfirm(dept.id); setDropdownOpen(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#EF4444', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <Trash2 size={14} /> Hapus
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Create/Edit Modal - STYLE NYA SAMA PERSIS DENGAN ORGANIZATION */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '480px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }} onClick={e => e.stopPropagation()}>

              {/* HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>{editingDept ? 'Edit Departemen' : 'Tambah Departemen'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={18} />
                </button>
              </div>

              {/* FORM DEPARTEMEN */}
              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Nama Departemen</label>
                  <input className="glass-input" placeholder="Contoh: Departemen Kaderisasi" {...register('name', { required: true, onChange: (e) => { if (!editingDept) setValue('slug', generateSlug(e.target.value)); } })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Slug</label>
                  <input className="glass-input" placeholder="departemen-kaderisasi" {...register('slug', { required: true })} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Fokus Program</label>
                  <textarea className="glass-input" rows={3} placeholder="Penjelasan singkat fokus program kerja..." style={{ resize: 'none' }} {...register('description')} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Icon (emoji)</label>
                  <input className="glass-input" placeholder="💻" {...register('icon')} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) ? 'Menyimpan...' : (editingDept ? 'Simpan Perubahan' : 'Tambah Departemen')}
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
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>Hapus Departemen?</h3>
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