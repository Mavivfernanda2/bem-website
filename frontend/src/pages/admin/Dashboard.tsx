import { motion } from 'framer-motion';
import { Users, Calendar, Newspaper, ListTodo, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';

const statsData = [
  { icon: Users, label: 'Total Anggota', value: '2,547', trend: '+12%', color: '#34D399' },
  { icon: Calendar, label: 'Event Aktif', value: '24', trend: '+3', color: '#60A5FA' },
  { icon: Newspaper, label: 'Berita Published', value: '156', trend: '+8', color: '#F59E0B' },
  { icon: ListTodo, label: 'Tasks Pending', value: '42', trend: '-5', color: '#A78BFA' },
];

const recentActivity = [
  { action: 'Event baru dibuat', detail: 'Workshop Digital Marketing', time: '5 menit lalu', color: '#34D399' },
  { action: 'Berita dipublikasikan', detail: 'Pelantikan Pengurus 2026', time: '1 jam lalu', color: '#60A5FA' },
  { action: 'User baru bergabung', detail: 'Ahmad Fauzi — Member', time: '2 jam lalu', color: '#F59E0B' },
  { action: 'Task diselesaikan', detail: 'Desain poster event', time: '3 jam lalu', color: '#A78BFA' },
  { action: 'Program diperbarui', detail: 'Pelatihan Kepemimpinan', time: '5 jam lalu', color: '#F472B6' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <motion.h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem', marginBottom: '6px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Dashboard
        </motion.h1>
        <motion.p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.92rem' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          Selamat datang kembali! Berikut ringkasan aktivitas platform.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {statsData.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} className="glass-card" style={{ padding: '24px' }} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  <Icon size={20} />
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: stat.color }}>
                  <TrendingUp size={12} /> {stat.trend}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem', marginBottom: '2px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Chart Placeholder */}
        <motion.div className="glass-card" style={{ padding: '28px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem' }}>Pertumbuhan Anggota</h3>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>Last 6 months</span>
          </div>
          <div style={{ height: '200px', background: 'linear-gradient(180deg, rgba(31,107,82,0.1), transparent)', borderRadius: '12px', display: 'flex', alignItems: 'flex-end', padding: '16px', gap: '8px' }}>
            {[40, 55, 35, 70, 60, 85, 75, 90, 80, 95, 88, 100].map((h, i) => (
              <motion.div key={i} style={{ flex: 1, background: `linear-gradient(180deg, var(--color-emerald-glow), var(--color-emerald))`, borderRadius: '6px 6px 0 0', opacity: 0.7 + (h / 400) }}
                initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div className="glass-card" style={{ padding: '28px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem' }}>Aktivitas Terbaru</h3>
            <Activity size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivity.map((act, i) => (
              <motion.div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', transition: 'background 0.2s', cursor: 'pointer' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: act.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{act.action}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{act.detail}</div>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{act.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        {['Tambah Event', 'Buat Berita', 'Tambah User', 'Buat Task'].map((action) => (
          <button key={action} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            {action} <ArrowUpRight size={14} />
          </button>
        ))}
      </motion.div>
    </div>
  );
}
