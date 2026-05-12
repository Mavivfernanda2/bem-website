import { motion } from 'framer-motion';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

const articles = [
  { title: 'Pelantikan Pengurus IPNU IPPNU Periode 2026', excerpt: 'Pengurus baru resmi dilantik dalam acara yang dihadiri oleh pimpinan daerah dan tokoh masyarakat.', date: '12 Mei 2026', author: 'Admin' },
  { title: 'Kerja Sama dengan Universitas untuk Program Digital', excerpt: 'IPNU IPPNU menjalin kerjasama strategis dengan beberapa universitas untuk program transformasi digital.', date: '10 Mei 2026', author: 'Editor' },
  { title: 'Hasil Musyawarah Kerja 2026', excerpt: 'Rangkuman keputusan dan program kerja yang disepakati dalam musyawarah kerja tahunan.', date: '8 Mei 2026', author: 'Admin' },
  { title: 'LKKMTM Sukses Digelar', excerpt: 'Latihan Kader Kepemimpinan Tingkat Menengah berhasil dilaksanakan dengan peserta dari seluruh wilayah.', date: '5 Mei 2026', author: 'Editor' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as any } }),
};

export default function Berita() {
  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Informasi</span>
            <h1 className="heading-lg">Berita <span className="text-accent">Terbaru</span></h1>
            <p className="section-desc">Update terbaru tentang kegiatan dan perkembangan organisasi.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {articles.map((art, i) => (
              <motion.div key={art.title} className="glass-card" style={{ padding: '32px 28px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ scale: 1.02 }}>
                <div style={{ height: '180px', borderRadius: '16px', background: `linear-gradient(135deg, rgba(31,107,82,${0.15 + i * 0.05}), rgba(15,29,23,0.8))`, marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'rgba(255,255,255,0.08)' }}>0{i + 1}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '10px', lineHeight: '1.3' }}>{art.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>{art.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {art.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={12} /> {art.author}</span>
                  </div>
                  <ArrowUpRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
