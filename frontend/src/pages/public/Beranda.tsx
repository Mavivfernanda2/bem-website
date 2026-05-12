import { motion } from 'framer-motion';
import { ArrowUpRight, Users, Calendar, BookOpen, Award, ChevronRight, Sparkles, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Beranda.css';

const stats = [
  { icon: Users, value: '2,500+', label: 'Anggota Aktif', color: '#34D399' },
  { icon: Calendar, value: '150+', label: 'Event Tahunan', color: '#60A5FA' },
  { icon: BookOpen, value: '50+', label: 'Program Kerja', color: '#F59E0B' },
  { icon: Award, value: '12', label: 'Departemen', color: '#A78BFA' },
];

const features = [
  {
    icon: Globe,
    title: 'Digital Ecosystem',
    desc: 'Platform terintegrasi untuk seluruh kegiatan organisasi secara digital.',
  },
  {
    icon: Zap,
    title: 'Real-time Collaboration',
    desc: 'Kolaborasi antar departemen secara langsung dan efisien.',
  },
  {
    icon: Sparkles,
    title: 'Smart Management',
    desc: 'Manajemen event, tugas, dan dokumentasi yang cerdas dan otomatis.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as any },
  }),
};

export default function Beranda() {
  return (
    <div className="beranda">
      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__gradient-1" />
          <div className="hero__gradient-2" />
          <div className="hero__gradient-3" />
          <div className="hero__grid-pattern" />
          <div className="hero__noise" />
        </div>

        <div className="container hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" as any }}
          >
            <Sparkles size={14} />
            <span>Platform Digital Organisasi Modern</span>
          </motion.div>

          <motion.h1
            className="heading-xl hero__title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" as any }}
          >
            Bangun Generasi
            <br />
            <span className="text-gradient">Digital</span>{' '}
            <span className="text-accent">Berdampak</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as any }}
          >
            IPNU IPPNU Digital Platform — ekosistem digital modern untuk
            mengelola organisasi, event, dan kolaborasi antar anggota
            dengan pengalaman premium dan futuristik.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" as any }}
          >
            <Link to="/tentang" className="btn btn-primary btn-lg">
              Jelajahi Platform <ArrowUpRight size={18} />
            </Link>
            <Link to="/event" className="btn btn-secondary btn-lg">
              Lihat Event <ChevronRight size={18} />
            </Link>
          </motion.div>

          {/* Floating Glass Cards */}
          <div className="hero__floating-cards">
            <motion.div
              className="hero__float-card hero__float-card--1 glass-card"
              initial={{ opacity: 0, y: 40, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Calendar size={20} className="hero__float-icon" />
              <div>
                <div className="hero__float-value">24</div>
                <div className="hero__float-label">Event Bulan Ini</div>
              </div>
            </motion.div>

            <motion.div
              className="hero__float-card hero__float-card--2 glass-card"
              initial={{ opacity: 0, y: 40, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              <Users size={20} className="hero__float-icon" />
              <div>
                <div className="hero__float-value">1,200+</div>
                <div className="hero__float-label">Anggota Online</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="glass-card stat-card"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp}
                >
                  <div className="stat-card__icon" style={{ color: stat.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="stat-card__value">{stat.value}</div>
                  <div className="stat-card__label">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="section features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-tag">Fitur Unggulan</span>
            <h2 className="heading-lg">
              Ekosistem Digital <span className="text-accent">Modern</span>
            </h2>
            <p className="section-desc">
              Dibangun dengan teknologi terkini untuk pengalaman organisasi yang tak tertandingi.
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="glass-card feature-card"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="feature-card__icon">
                    <Icon size={28} />
                  </div>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__desc">{feature.desc}</p>
                  <div className="feature-card__link">
                    Pelajari <ArrowUpRight size={14} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="section cta-section">
        <div className="container">
          <motion.div
            className="cta-card glass-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="cta-card__glow" />
            <h2 className="heading-lg cta-card__title">
              Siap Bergabung dengan <span className="text-gradient">Ekosistem Digital?</span>
            </h2>
            <p className="cta-card__desc">
              Jadilah bagian dari organisasi yang bergerak menuju era digital. 
              Bersama kita membangun, berkarya, dan berdampak.
            </p>
            <div className="cta-card__actions">
              <Link to="/kontak" className="btn btn-primary btn-lg">
                Bergabung Sekarang <ArrowUpRight size={18} />
              </Link>
              <Link to="/tentang" className="btn btn-ghost btn-lg">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
