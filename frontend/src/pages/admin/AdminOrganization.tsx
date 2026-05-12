import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, MoreHorizontal, Building2, X, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetOrganization, useCreateOrganizationMember, useUpdateOrganizationMember, useDeleteOrganizationMember } from '../../hooks/useOrganization';
import type { OrganizationMember, OrganizationMemberInput } from '../../types/api';

const levelColors: Record<string, string> = {
  top: '#34D399',
  mid: '#60A5FA',
  dept: '#F59E0B',
};

const levelLabels: Record<string, string> = {
  top: 'Pimpinan',
  mid: 'Pengurus Inti',
  dept: 'Kepala Departemen',
};

export default function AdminOrganization() {
  const { data: orgStructure = [], isLoading, refetch } = useGetOrganization();
  const createMutation = useCreateOrganizationMember();
  const updateMutation = useUpdateOrganizationMember();
  const deleteMutation = useDeleteOrganizationMember();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<OrganizationMember | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<OrganizationMemberInput>();

  const openCreate = () => {
    setEditingMember(null);
    reset({ name: '', position: '', level: 'dept', order: 0 });
    setModalOpen(true);
  };

  const openEdit = (member: OrganizationMember) => {
    setEditingMember(member);
    setValue('name', member.name);
    setValue('position', member.position);
    setValue('level', member.level);
    setValue('order', member.order);
    setValue('periodStart', member.periodStart || '');
    setValue('periodEnd', member.periodEnd || '');
    setDropdownOpen(null);
    setModalOpen(true);
  };

  const onSubmit = async (formData: OrganizationMemberInput) => {
    if (editingMember) {
      await updateMutation.mutateAsync({ id: editingMember.id, ...formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    await refetch();
    setModalOpen(false);
    reset();
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    await refetch();
    setDeleteConfirm(null);
    setDropdownOpen(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Struktur Organisasi</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Kelola struktur dan susunan pengurus organisasi.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Tambah Pengurus</button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
          Memuat data...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && orgStructure.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
          <Building2 size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p>Belum ada data struktur organisasi.</p>
        </div>
      )}

      {/* Organization Chart */}
      {(['top', 'mid', 'dept'] as const).map((level) => {
        const members = orgStructure.filter(m => m.level === level);
        if (members.length === 0) return null;
        return (
          <div key={level} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: levelColors[level] }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>{levelLabels[level]}</h3>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>({members.length})</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${level === 'top' ? '280px' : '240px'}, 1fr))`, gap: '12px' }}>
              {members.map((member, i) => (
                <motion.div key={member.id} className="glass-card" style={{ padding: level === 'top' ? '28px' : '20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.02 }}>
                  <div style={{ width: level === 'top' ? '52px' : '42px', height: level === 'top' ? '52px' : '42px', borderRadius: level === 'top' ? '16px' : '12px', background: `linear-gradient(135deg, ${levelColors[level]}30, ${levelColors[level]}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: levelColors[level], flexShrink: 0, fontSize: level === 'top' ? '0.85rem' : '0.75rem', fontWeight: 700 }}>
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: level === 'top' ? '0.95rem' : '0.88rem', marginBottom: '2px' }}>{member.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.position}</div>
                  </div>
                  <button style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} onClick={() => setDropdownOpen(dropdownOpen === member.id ? null : member.id)}><MoreHorizontal size={16} /></button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen === member.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{ position: 'absolute', top: '100%', right: '12px', zIndex: 50, background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                      >
                        <button onClick={() => openEdit(member)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Edit size={14} /> Edit
                        </button>
                        <button onClick={() => { setDeleteConfirm(member.id); setDropdownOpen(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#EF4444', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <Trash2 size={14} /> Hapus
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '480px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>{editingMember ? 'Edit Pengurus' : 'Tambah Pengurus'}</h2>
                <button onClick={() => setModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Nama</label>
                  <input className="glass-input" placeholder="Nama lengkap" {...register('name', { required: true })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Jabatan</label>
                  <input className="glass-input" placeholder="Contoh: Ketua Umum" {...register('position', { required: true })} />
                </div>

                {/* INI BAGIAN DROPDOWN LEVEL YANG SUDAH DI-DARK MODE-KAN */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Level</label>
                  <select className="glass-input" {...register('level')}>
                    <option value="top" style={{ background: '#1B2E26', color: '#fff' }}>Pimpinan</option>
                    <option value="mid" style={{ background: '#1B2E26', color: '#fff' }}>Pengurus Inti</option>
                    <option value="dept" style={{ background: '#1B2E26', color: '#fff' }}>Kepala Departemen</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Periode Mulai</label>
                    <input className="glass-input" placeholder="2026" {...register('periodStart')} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Periode Akhir</label>
                    <input className="glass-input" placeholder="2028" {...register('periodEnd')} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Urutan</label>
                  <input className="glass-input" type="number" {...register('order', { valueAsNumber: true })} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) ? 'Menyimpan...' : (editingMember ? 'Simpan Perubahan' : 'Tambah Pengurus')}
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
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>Hapus Pengurus?</h3>
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