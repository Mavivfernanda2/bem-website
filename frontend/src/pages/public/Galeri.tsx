import { motion } from 'framer-motion';

const images = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `Kegiatan ${i + 1}`,
  hue: 120 + i * 15,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.06, duration: 0.6, ease: "easeOut" as any } }),
};

export default function Galeri() {
  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Dokumentasi</span>
            <h1 className="heading-lg">Galeri <span className="text-accent">Kegiatan</span></h1>
            <p className="section-desc">Dokumentasi foto dan video dari berbagai kegiatan organisasi.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {images.map((img, i) => (
              <motion.div key={img.id} className="glass-card" style={{ overflow: 'hidden', cursor: 'pointer', padding: 0 }} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ scale: 1.03 }}>
                <div style={{ height: i % 3 === 0 ? '300px' : '220px', background: `linear-gradient(135deg, hsl(${img.hue}, 40%, 25%), hsl(${img.hue + 30}, 30%, 15%))`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'rgba(255,255,255,0.06)' }}>{String(img.id).padStart(2, '0')}</span>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem' }}>{img.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
