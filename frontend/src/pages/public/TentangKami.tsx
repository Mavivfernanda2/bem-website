import { motion } from 'framer-motion';
import { Target, Eye, Heart, Shield, BookOpen, Users } from 'lucide-react';

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as any } }),
};

const values = [
  { icon: Heart, title: 'Keikhlasan', desc: 'Bekerja dan berkarya dengan penuh keikhlasan untuk umat.' },
  { icon: Shield, title: 'Amanah', desc: 'Menjaga kepercayaan dan tanggung jawab organisasi.' },
  { icon: BookOpen, title: 'Keilmuan', desc: 'Mengutamakan ilmu pengetahuan sebagai landasan bergerak.' },
  { icon: Users, title: 'Ukhuwah', desc: 'Mempererat persaudaraan antar anggota dan masyarakat.' },
];

export default function TentangKami() {
  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="section-tag">Tentang Kami</span>
            <h1 className="heading-lg">Mengenal <span className="text-accent">IPNU IPPNU</span></h1>
            <p className="section-desc">Organisasi kepemudaan yang bergerak dalam bidang keagamaan, pendidikan, dan sosial kemasyarakatan.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '80px' }}>
            <motion.div className="glass-card" style={{ padding: '36px 28px' }} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="feature-card__icon"><Eye size={24} /></div>
                <h3 className="heading-sm">Visi</h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: '1.7', fontSize: '0.92rem' }}>
                Menjadi organisasi kepemudaan yang unggul, inovatif, dan berdampak dalam membangun generasi yang berilmu, berakhlak, dan berdaya saing global.
              </p>
            </motion.div>

            <motion.div className="glass-card" style={{ padding: '36px 28px' }} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="feature-card__icon"><Target size={24} /></div>
                <h3 className="heading-sm">Misi</h3>
              </div>
              <ul style={{ color: 'rgba(255,255,255,0.55)', lineHeight: '1.8', fontSize: '0.92rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• Meningkatkan kualitas SDM melalui pendidikan dan pelatihan</li>
                <li>• Membangun ekosistem digital untuk organisasi modern</li>
                <li>• Memperkuat jaringan dan kerjasama antar lembaga</li>
                <li>• Mengembangkan program kerja yang inovatif dan berdampak</li>
              </ul>
            </motion.div>
          </div>

          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="section-tag">Nilai Kami</span>
            <h2 className="heading-lg">Pilar <span className="text-gradient">Organisasi</span></h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div key={val.title} className="glass-card" style={{ padding: '32px 24px', textAlign: 'center' }} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(31,107,82,0.2), rgba(52,211,153,0.1))', color: 'var(--color-emerald-glow)', marginBottom: '16px' }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>{val.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
