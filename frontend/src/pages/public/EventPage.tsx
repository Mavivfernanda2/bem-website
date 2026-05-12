import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowUpRight } from 'lucide-react';

const events = [
  { title: 'Musyawarah Besar IPNU IPPNU', date: '15 Jun 2026', location: 'Aula Utama', attendees: 250, status: 'upcoming' },
  { title: 'Workshop Digital Marketing', date: '20 Jun 2026', location: 'Lab Komputer', attendees: 50, status: 'upcoming' },
  { title: 'Pelatihan Public Speaking', date: '25 Jun 2026', location: 'Auditorium', attendees: 80, status: 'upcoming' },
  { title: 'Kajian Rutin Mingguan', date: '10 Mei 2026', location: 'Masjid Al-Hikmah', attendees: 120, status: 'past' },
  { title: 'LKKMTM — Latihan Kader', date: '5 Mei 2026', location: 'Campus Hall', attendees: 200, status: 'past' },
  { title: 'UEC — Unusida E-Sport', date: '14 Apr 2026', location: 'Online', attendees: 300, status: 'past' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as any } }),
};

export default function EventPage() {
  return (
    <div style={{ paddingTop: '120px' }}>
      <section className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">Kegiatan</span>
            <h1 className="heading-lg">Event <span className="text-accent">Organisasi</span></h1>
            <p className="section-desc">Ikuti berbagai kegiatan dan acara organisasi IPNU IPPNU.</p>
          </motion.div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {events.map((ev, i) => (
              <motion.div key={ev.title} className="glass-card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', cursor: 'pointer' }} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ scale: 1.01 }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 600, background: ev.status === 'upcoming' ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.06)', color: ev.status === 'upcoming' ? '#34D399' : 'rgba(255,255,255,0.4)' }}>
                      {ev.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>{ev.title}</h3>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {ev.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {ev.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {ev.attendees} peserta</span>
                  </div>
                </div>
                <ArrowUpRight size={20} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
