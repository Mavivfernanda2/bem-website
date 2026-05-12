import { motion } from 'framer-motion';
import { ArrowUpRight, Users, Code, Palette, BookOpen, Megaphone, Heart } from 'lucide-react';

const departments = [
  { icon: Code, name: 'Teknologi & Informasi', desc: 'Pengembangan platform digital dan sistem informasi organisasi.', members: 12, color: '#34D399' },
  { icon: BookOpen, name: 'Pendidikan & Pelatihan', desc: 'Program peningkatan kapasitas dan keilmuan anggota.', members: 15, color: '#60A5FA' },
  { icon: Megaphone, name: 'Humas & Komunikasi', desc: 'Hubungan masyarakat, media sosial, dan publikasi.', members: 10, color: '#F59E0B' },
  { icon: Palette, name: 'Seni & Budaya', desc: 'Pelestarian seni budaya dan kegiatan kreatif.', members: 8, color: '#A78BFA' },
  { icon: Heart, name: 'Sosial & Kemasyarakatan', desc: 'Program sosial, bakti masyarakat, dan pemberdayaan.', members: 14, color: '#F472B6' },
  { icon: Users, name: 'Kaderisasi', desc: 'Pembinaan kader dan pengembangan organisasi.', members: 11, color: '#34D399' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as any } }),
};

export default function Departemen() {
  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Struktur</span>
            <h1 className="heading-lg">Departemen <span className="text-accent">Organisasi</span></h1>
            <p className="section-desc">Setiap departemen memiliki fokus dan tanggung jawab masing-masing untuk memajukan organisasi.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {departments.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <motion.div key={dept.name} className="glass-card" style={{ padding: '32px 28px', cursor: 'pointer' }} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ scale: 1.02 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: `${dept.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: dept.color }}>
                      <Icon size={24} />
                    </div>
                    <ArrowUpRight size={18} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>{dept.name}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', marginBottom: '16px' }}>{dept.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
                    <Users size={14} /> {dept.members} Anggota
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
