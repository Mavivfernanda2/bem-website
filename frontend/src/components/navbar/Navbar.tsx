import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

// 1. Tambahkan Interface untuk TypeScript
interface NavLink {
  label: string;
  path: string;
}

// 2. Terapkan tipe data ke array
const navLinks: NavLink[] = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang', path: '/tentang' },
  { label: 'Departemen', path: '/departemen' },
  { label: 'Program', path: '/program' },
  { label: 'Event', path: '/event' },
  { label: 'Berita', path: '/berita' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'Kontak', path: '/kontak' },
];

export default function Navbar() {
  // 3. Definisikan tipe state sebagai boolean
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup menu saat rute/path berubah
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        // KUNCI: x: "-50%" memastikan navbar terkunci tepat di tengah layar
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">
              <span>IP</span>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-primary">IPNU IPPNU</span>
              <span className="navbar__logo-secondary">Digital Platform</span>
            </div>
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div className="navbar__link-indicator" layoutId="navIndicator" />
                )}
              </Link>
            ))}
          </div>

          <div className="navbar__actions">
            <Link to="/login" className="navbar__btn">
              Masuk <ArrowUpRight size={16} />
            </Link>
          </div>

          <button className="navbar__menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu__inner">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-menu__link ${location.pathname === link.path ? 'mobile-menu__link--active' : ''}`}
                  >
                    {link.label}
                    <ArrowUpRight size={18} />
                  </Link>
                </motion.div>
              ))}
              <Link to="/login" className="navbar__btn mobile-btn" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
                Masuk <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}