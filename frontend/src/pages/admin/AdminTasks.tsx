import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GripVertical, CheckCircle2, Circle, Clock, AlertTriangle, X, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../../hooks/useTasks';
import { useGetUsers } from '../../hooks/useUsers';
import type { Task, TaskInput } from '../../types/api';

const columnDefs: Record<string, { title: string; color: string }> = {
  todo: { title: 'To Do', color: '#60A5FA' },
  in_progress: { title: 'In Progress', color: '#F59E0B' }, // Changed to in_progress to match prisma schema standard
  review: { title: 'Review', color: '#A78BFA' },
  done: { title: 'Done', color: '#34D399' },
};

const priorityMap: Record<string, { label: string; color: string; icon: typeof Circle }> = {
  low: { label: 'Low', color: '#60A5FA', icon: Circle },
  medium: { label: 'Medium', color: '#F59E0B', icon: Clock },
  high: { label: 'High', color: '#F97316', icon: AlertTriangle },
  urgent: { label: 'Urgent', color: '#EF4444', icon: AlertTriangle },
};

export default function AdminTasks() {
  const { data: tasksData = [], isLoading, refetch } = useGetTasks();
  const { data: usersData = [] } = useGetUsers();
  
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<TaskInput>();

  const openCreate = (statusDefault = 'todo') => {
    setEditingTask(null);
    reset({ title: '', description: '', priority: 'medium', status: statusDefault, assigneeId: '' });
    setIsModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setValue('title', task.title);
    setValue('description', task.description || '');
    setValue('priority', task.priority);
    setValue('status', task.status);
    setValue('assigneeId', task.assigneeId || '');
    setDropdownOpen(null);
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: TaskInput) => {
    try {
      if (editingTask) {
        await updateMutation.mutateAsync({ id: editingTask.id, ...formData });
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

  // Group tasks by status
  const columns = useMemo(() => {
    const cols: Record<string, { title: string; color: string; tasks: Task[] }> = {};
    for (const key of Object.keys(columnDefs)) {
      cols[key] = { ...columnDefs[key], tasks: [] };
    }
    for (const task of tasksData) {
      const statusKey = task.status === 'progress' ? 'in_progress' : task.status; // compat
      if (cols[statusKey]) {
        cols[statusKey].tasks.push(task);
      } else {
        cols.todo.tasks.push(task); // fallback
      }
    }
    return cols;
  }, [tasksData]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Tasks</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Kanban board untuk manajemen tugas organisasi.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openCreate('todo')}>
          <Plus size={16} /> Tambah Task
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
          Memuat tasks...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', overflowX: 'auto', minHeight: '60vh' }}>
          {Object.entries(columns).map(([key, col]) => (
            <div key={key} style={{ minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', padding: '0 4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem' }}>{col.title}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>{col.tasks.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.tasks.map((task, i) => {
                  const p = priorityMap[task.priority] || priorityMap.medium;
                  const PIcon = p.icon;
                  return (
                    <motion.div key={task.id} className="glass-card" style={{ padding: '16px', borderRadius: 'var(--radius-md)', position: 'relative' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.02 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                            {key === 'done' ? <CheckCircle2 size={14} style={{ color: '#34D399' }} /> : <Circle size={14} style={{ color: 'rgba(255,255,255,0.2)' }} />}
                            <span style={{ fontSize: '0.88rem', fontWeight: 500, textDecoration: key === 'done' ? 'line-through' : 'none', opacity: key === 'done' ? 0.5 : 1 }}>{task.title}</span>
                            <button style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)', border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setDropdownOpen(dropdownOpen === task.id ? null : task.id)}>
                              <MoreHorizontal size={14} />
                            </button>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '99px', background: `${p.color}15`, color: p.color, fontSize: '0.7rem', fontWeight: 600 }}>
                              <PIcon size={10} /> {p.label}
                            </span>
                            {task.assignee && (
                              <div style={{ width: '24px', height: '24px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--color-emerald), var(--color-emerald-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700, color: 'white' }} title={task.assignee.name}>
                                {task.assignee.name[0].toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {dropdownOpen === task.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            style={{ position: 'absolute', top: '35px', right: '12px', zIndex: 50, background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                          >
                            <button onClick={() => openEdit(task)} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => { setDeleteConfirm(task.id); setDropdownOpen(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#EF4444', transition: 'background 0.2s', border: 'none', background: 'transparent', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <Trash2 size={14} /> Hapus
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                <button
                  onClick={() => openCreate(key)}
                  style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px dashed rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.25)', transition: 'all 0.2s', background: 'transparent', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}
                >
                  <Plus size={14} /> Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL TAMBAH TASK */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} style={{ background: '#1B2E26', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '0', width: '100%', maxWidth: '480px', boxShadow: '0 24px 48px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>{editingTask ? 'Edit Task' : 'Tambah Task Baru'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Judul Task</label>
                  <input type="text" className="glass-input" placeholder="Contoh: Desain poster event..." {...register('title', { required: true })} />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Deskripsi</label>
                  <textarea className="glass-input" rows={3} placeholder="Detail tugas..." style={{ resize: 'none' }} {...register('description')} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Penanggung Jawab (Assignee)</label>
                  <select className="glass-input" {...register('assigneeId')}>
                    <option value="" style={{ background: '#1B2E26', color: '#fff' }}>Pilih Anggota (Opsional)</option>
                    {usersData.map(u => (
                      <option key={u.id} value={u.id} style={{ background: '#1B2E26', color: '#fff' }}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Prioritas</label>
                    <select className="glass-input" {...register('priority')}>
                      <option value="low" style={{ background: '#1B2E26', color: '#fff' }}>Low</option>
                      <option value="medium" style={{ background: '#1B2E26', color: '#fff' }}>Medium</option>
                      <option value="high" style={{ background: '#1B2E26', color: '#fff' }}>High</option>
                      <option value="urgent" style={{ background: '#1B2E26', color: '#fff' }}>Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Status Kolom</label>
                    <select className="glass-input" {...register('status')}>
                      <option value="todo" style={{ background: '#1B2E26', color: '#fff' }}>To Do</option>
                      <option value="in_progress" style={{ background: '#1B2E26', color: '#fff' }}>In Progress</option>
                      <option value="review" style={{ background: '#1B2E26', color: '#fff' }}>Review</option>
                      <option value="done" style={{ background: '#1B2E26', color: '#fff' }}>Done</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) ? 'Menyimpan...' : (editingTask ? 'Simpan Perubahan' : 'Simpan Task')}
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
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>Hapus Task?</h3>
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