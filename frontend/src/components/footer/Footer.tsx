import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Phone, Heart } from 'lucide-react';
import './Footer.css';

const footerLinks = {
  platform: [
    { label: 'Beranda', path: '/' },
    { label: 'Tentang Kami', path: '/tentang' },
    { label: 'Departemen', path: '/departemen' },
    { label: 'Program Kerja', path: '/program' },
  ],
  resources: [
    { label: 'Event', path: '/event' },
    { label: 'Berita', path: '/berita' },
    { label: 'Galeri', path: '/galeri' },
    { label: 'Kontak', path: '/kontak' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon"><span>IP</span></div>
              <div>
                <h3 className="footer__logo-title">IPNU IPPNU</h3>
                <p className="footer__logo-sub">Digital Platform</p>
              </div>
            </div>
            <p className="footer__desc">
              Platform digital modern untuk organisasi IPNU IPPNU.
              Membangun generasi digital yang berdaya dan berdampak.
            </p>
            <div className="footer__contact-list">
              <div className="footer__contact-item">
                <MapPin size={14} />
                <span>Jl. Contoh No. 123, Indonesia</span>
              </div>
              <div className="footer__contact-item">
                <Mail size={14} />
                <span>info@ipnu-ippnu.org</span>
              </div>
              <div className="footer__contact-item">
                <Phone size={14} />
                <span>+62 812 3456 7890</span>
              </div>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Platform</h4>
            {footerLinks.platform.map((link) => (
              <Link key={link.path} to={link.path} className="footer__link">
                {link.label} <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Resources</h4>
            {footerLinks.resources.map((link) => (
              <Link key={link.path} to={link.path} className="footer__link">
                {link.label} <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Login Dashboard <ArrowUpRight size={16} />
            </Link>
            <p className="footer__note">
              Akses dashboard admin untuk mengelola platform organisasi.
            </p>
          </div>
        </div>

        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} IPNU IPPNU Digital Platform. All rights reserved.</p>
          <p className="footer__made">
            Made with <Heart size={12} fill="currentColor" /> in Indonesia
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
