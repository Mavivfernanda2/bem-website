import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';

export default function Kontak() {
  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Hubungi</span>
            <h1 className="heading-lg">Kontak <span className="text-accent">Kami</span></h1>
            <p className="section-desc">Hubungi kami untuk informasi lebih lanjut tentang organisasi dan kegiatan.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', maxWidth: '960px', margin: '0 auto' }}>
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: Mail, label: 'Email', value: 'info@ipnu-ippnu.org' },
                  { icon: Phone, label: 'Telepon', value: '+62 812 3456 7890' },
                  { icon: MapPin, label: 'Alamat', value: 'Jl. Contoh No. 123, Surabaya, Indonesia' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(31,107,82,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-emerald-glow)', flexShrink: 0 }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>{item.label}</div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 500 }}>{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px' }}>Sosial Media</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['Instagram', 'Twitter', 'YouTube'].map((platform) => (
                    <a key={platform} href="#" className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.82rem' }}>
                      {platform} <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="glass-card" style={{ padding: '36px 28px' }} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '24px' }}>Kirim Pesan</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Nama</label>
                  <input className="glass-input" placeholder="Nama lengkap" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Email</label>
                  <input className="glass-input" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Pesan</label>
                  <textarea className="glass-input" rows={4} placeholder="Tulis pesan Anda..." style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} /> Kirim Pesan
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
