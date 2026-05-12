import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../lib/axios'; // Pastikan path ini sesuai dengan letak file axios.ts kamu

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Menembak API asli ke backend Hono
      const response = await api.post('/auth/login', { email, password });

      if (response.data.success) {
        const { token, user } = response.data.data;

        // Simpan token dan data ASLI dari database ke localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success('Berhasil masuk!');
        navigate('/admin');
      }
    } catch (error: any) {
      // Menangkap pesan error dari backend (misal: email salah, password salah)
      const errorMessage = error.response?.data?.message || 'Gagal login. Periksa koneksi backend.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '60%', background: 'radial-gradient(ellipse, rgba(31,107,82,0.2), transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '45%', height: '55%', background: 'radial-gradient(ellipse, rgba(52,211,153,0.1), transparent 65%)' }} />
      </div>

      <motion.div
        className="glass-card"
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px', padding: '48px 36px' }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--color-emerald), var(--color-emerald-glow))', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Sparkles size={24} color="white" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '8px' }}>Selamat Datang</h1>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)' }}>Masuk ke IPNU IPPNU Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input className="glass-input" type="email" placeholder="admin@ipnu.org" value={email} onChange={(e) => setEmail(e.target.value)} style={{ paddingLeft: '42px' }} required />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input className="glass-input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ paddingLeft: '42px', paddingRight: '42px' }} required />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '14px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Memproses...' : 'Masuk'} <ArrowUpRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>← Kembali ke Beranda</Link>
        </div>
      </motion.div>
    </div>
  );
}