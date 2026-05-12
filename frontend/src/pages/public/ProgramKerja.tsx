import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const programs = [
  { title: 'Pelatihan Kepemimpinan', desc: 'Program pengembangan leadership untuk kader muda.', status: 'active', date: 'Jan - Mar 2026' },
  { title: 'Webinar Literasi Digital', desc: 'Seri webinar tentang pemanfaatan teknologi digital.', status: 'active', date: 'Feb - Apr 2026' },
  { title: 'Bakti Sosial Ramadhan', desc: 'Kegiatan sosial masyarakat selama bulan Ramadhan.', status: 'completed', date: 'Mar 2026' },
  { title: 'Musyawarah Kerja', desc: 'Forum perencanaan program kerja tahunan.', status: 'active', date: 'Apr 2026' },
  { title: 'Festival Seni & Budaya', desc: 'Perayaan keberagaman seni dan budaya nusantara.', status: 'draft', date: 'Jun 2026' },
  { title: 'Kaderisasi Nasional', desc: 'Program kaderisasi tingkat nasional untuk seluruh wilayah.', status: 'draft', date: 'Jul 2026' },
];

const statusMap: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  active: { label: 'Berjalan', color: '#34D399', icon: Clock },
  completed: { label: 'Selesai', color: '#60A5FA', icon: CheckCircle },
  draft: { label: 'Rencana', color: '#F59E0B', icon: AlertCircle },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as any } }),
};

export default function ProgramKerja() {
  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Program</span>
            <h1 className="heading-lg">Program <span className="text-accent">Kerja</span></h1>
            <p className="section-desc">Rencana dan pelaksanaan program kerja organisasi untuk periode berjalan.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {programs.map((prog, i) => {
              const s = statusMap[prog.status];
              const Icon = s.icon;
              return (
                <motion.div key={prog.title} className="glass-card" style={{ padding: '32px 28px', cursor: 'pointer' }} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ scale: 1.02 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: `${s.color}18`, color: s.color, fontSize: '0.75rem', fontWeight: 600 }}>
                      <Icon size={12} /> {s.label}
                    </span>
                    <ArrowUpRight size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>{prog.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', marginBottom: '14px' }}>{prog.desc}</p>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{prog.date}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
