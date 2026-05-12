import { motion } from 'framer-motion';
import { QrCode, Award, Calendar, User, Shield, Download, ArrowUpRight } from 'lucide-react';

const memberData = {
  name: 'Ahmad Fauzi',
  email: 'ahmad@ipnu.org',
  role: 'Member',
  cardNumber: 'IPNU-2026-0001',
  joinDate: '15 Jan 2026',
  department: 'Teknologi & Informasi',
  validUntil: '15 Jan 2027',
};

const memberEvents = [
  { title: 'Workshop Digital Marketing', date: '20 Jun 2026', status: 'registered' },
  { title: 'Pelatihan Public Speaking', date: '25 Jun 2026', status: 'registered' },
  { title: 'LKKMTM', date: '5 Mei 2026', status: 'attended' },
  { title: 'Kajian Rutin', date: '10 Mei 2026', status: 'attended' },
];

const certificates = [
  { title: 'LKKMTM — Latihan Kader', date: '5 Mei 2026', code: 'CERT-001' },
  { title: 'Workshop Web Development', date: '20 Apr 2026', code: 'CERT-002' },
];

export default function MemberPortal() {
  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Member</span>
            <h1 className="heading-lg">Portal <span className="text-accent">Anggota</span></h1>
            <p className="section-desc">Akses profil, kartu anggota digital, dan riwayat kegiatan Anda.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {/* e-KTA Card */}
            <motion.div className="glass-card" style={{ padding: '32px', overflow: 'hidden', position: 'relative' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(31,107,82,0.2), transparent 60%)', borderRadius: '50%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Kartu Tanda Anggota Digital</div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem' }}>e-KTA</h2>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--color-emerald), var(--color-emerald-glow))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.65rem', color: 'white' }}>IP</div>
              </div>

              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '18px', background: 'linear-gradient(135deg, var(--color-emerald), var(--color-dark-forest-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>AF</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>{memberData.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', marginBottom: '2px' }}>{memberData.email}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-emerald-glow)' }}>{memberData.department}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginBottom: '2px' }}>No. Anggota</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem' }}>{memberData.cardNumber}</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginBottom: '2px' }}>Berlaku Sampai</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem' }}>{memberData.validUntil}</div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <QrCode size={36} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)' }}>QR Verify</span>
                </div>
              </div>
            </motion.div>

            {/* Profile & Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Quick Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { icon: Calendar, label: 'Event Diikuti', value: '12', color: '#34D399' },
                  { icon: Award, label: 'Sertifikat', value: '5', color: '#60A5FA' },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div key={stat.label} className="glass-card" style={{ padding: '20px', textAlign: 'center' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                      <Icon size={24} style={{ color: stat.color, marginBottom: '8px' }} />
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Event History */}
              <div className="glass-card" style={{ padding: '24px', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: '16px' }}>Riwayat Event</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {memberEvents.map((ev, i) => (
                    <motion.div key={ev.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)' }} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{ev.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{ev.date}</div>
                      </div>
                      <span style={{ padding: '3px 8px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 600, background: ev.status === 'attended' ? 'rgba(52,211,153,0.12)' : 'rgba(96,165,250,0.12)', color: ev.status === 'attended' ? '#34D399' : '#60A5FA' }}>
                        {ev.status === 'attended' ? 'Hadir' : 'Terdaftar'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>Sertifikat</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {certificates.map((cert, i) => (
                <motion.div key={cert.code} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(96,165,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', flexShrink: 0 }}>
                    <Award size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>{cert.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{cert.date} · {cert.code}</div>
                  </div>
                  <button className="btn btn-ghost" style={{ padding: '8px' }}><Download size={16} /></button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
