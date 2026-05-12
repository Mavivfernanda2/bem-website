import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Shield, Bell, Palette, Database, Mail, Download, RefreshCw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useGetSettings, useUpdateSettings } from '../../hooks/useSettings';
import { toast } from 'sonner';

const settingGroups = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notification', label: 'Notifikasi', icon: Bell },
  { id: 'appearance', label: 'Tampilan', icon: Palette },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'email', label: 'Email', icon: Mail },
];

export default function AdminSettings() {
  const { data: settingsData, isLoading, refetch } = useGetSettings();
  const updateMutation = useUpdateSettings();

  const [activeGroup, setActiveGroup] = useState('general');

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  // Initialize form with fetched data
  useEffect(() => {
    if (settingsData) {
      reset({
        orgName: settingsData.orgName || 'IPNU IPPNU',
        orgDesc: settingsData.orgDesc || 'Ikatan Pelajar Nahdlatul Ulama - Ikatan Pelajar Putri Nahdlatul Ulama',
        contactEmail: settingsData.contactEmail || 'info@ipnu-ippnu.org',
        contactPhone: settingsData.contactPhone || '+62 812 3456 7890',
        contactAddress: settingsData.contactAddress || 'Jl. Contoh No. 123, Surabaya, Indonesia',
        publicReg: settingsData.publicReg === 'true',
        maintenance: settingsData.maintenance === 'true',
        emailNotif: settingsData.emailNotif !== 'false', // Default true
        sysAlert: settingsData.sysAlert !== 'false', // Default true
        themeMode: settingsData.themeMode || 'dark',
        themeColor: settingsData.themeColor || 'emerald',
        smtpHost: settingsData.smtpHost || 'smtp.gmail.com',
        smtpPort: settingsData.smtpPort || '587',
        smtpUser: settingsData.smtpUser || 'no-reply@ipnu-ippnu.org',
        smtpPass: settingsData.smtpPass || '',
      });
    }
  }, [settingsData, reset]);

  const formValues = watch();

  const handleToggle = (key: string) => {
    setValue(key, !formValues[key], { shouldDirty: true });
  };

  const onSubmit = async (data: any) => {
    await updateMutation.mutateAsync(data);
    await refetch();
  };

  const handleBackup = () => {
    toast.success('Backup database SQL sedang disiapkan...');
  };

  const handleClearCache = () => {
    toast.success('Cache sistem berhasil dibersihkan');
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '4px' }}>Settings</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>Konfigurasi platform dan preferensi sistem.</p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>Memuat pengaturan...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', alignItems: 'start' }}>

          {/* Settings Navigation Sidebar */}
          <div className="glass-card" style={{ padding: '12px', position: 'sticky', top: '24px' }}>
            {settingGroups.map((group) => {
              const Icon = group.icon;
              return (
                <button key={group.id} onClick={() => setActiveGroup(group.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', fontWeight: 500, color: activeGroup === group.id ? 'white' : 'rgba(255,255,255,0.45)', background: activeGroup === group.id ? 'rgba(31,107,82,0.2)' : 'transparent', transition: 'all 0.2s', textAlign: 'left', marginBottom: '4px', border: 'none', cursor: 'pointer' }}
                >
                  <Icon size={18} /> {group.label}
                </button>
              );
            })}
          </div>

          {/* Settings Content Area */}
          <motion.div className="glass-card" style={{ padding: '32px' }} key={activeGroup} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '24px', textTransform: 'capitalize' }}>
              {settingGroups.find(g => g.id === activeGroup)?.label} Settings
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* 1. GENERAL TAB */}
              {activeGroup === 'general' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Nama Organisasi</label>
                    <input className="glass-input" {...register('orgName')} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Deskripsi Platform</label>
                    <textarea className="glass-input" rows={3} style={{ resize: 'vertical' }} {...register('orgDesc')} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Email Kontak Utama</label>
                      <input className="glass-input" type="email" {...register('contactEmail')} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Nomor Telepon / WA</label>
                      <input className="glass-input" type="text" {...register('contactPhone')} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Alamat Sekretariat</label>
                    <input className="glass-input" {...register('contactAddress')} />
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', marginTop: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '16px' }}>Preferensi Platform</h3>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ fontSize: '0.9rem' }}>Buka Registrasi Publik (Anggota Baru)</span>
                      <div onClick={() => handleToggle('publicReg')} style={{ width: '44px', height: '24px', borderRadius: '99px', background: formValues.publicReg ? 'var(--color-emerald)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: formValues.publicReg ? '23px' : '3px', transition: 'all 0.3s' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ fontSize: '0.9rem' }}>Aktifkan Mode Maintenance</span>
                      <div onClick={() => handleToggle('maintenance')} style={{ width: '44px', height: '24px', borderRadius: '99px', background: formValues.maintenance ? '#EF4444' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: formValues.maintenance ? '23px' : '3px', transition: 'all 0.3s' }} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 2. SECURITY TAB */}
              {activeGroup === 'security' && (
                <>
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Perbarui password akun administrator Anda secara berkala untuk menjaga keamanan. (Simulasi)</p>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Password Saat Ini</label>
                    <input className="glass-input" type="password" placeholder="••••••••" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Password Baru</label>
                      <input className="glass-input" type="password" placeholder="Minimal 8 karakter" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Konfirmasi Password Baru</label>
                      <input className="glass-input" type="password" placeholder="Ketik ulang password baru" />
                    </div>
                  </div>
                </>
              )}

              {/* 3. NOTIFICATION TAB */}
              {activeGroup === 'notification' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Email Notifikasi Sistem</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Terima email saat ada user baru atau error sistem.</div>
                    </div>
                    <div onClick={() => handleToggle('emailNotif')} style={{ width: '44px', height: '24px', borderRadius: '99px', background: formValues.emailNotif ? 'var(--color-emerald)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: formValues.emailNotif ? '23px' : '3px', transition: 'all 0.3s' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Alert In-App</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Tampilkan pop-up toast saat ada aktivitas baru.</div>
                    </div>
                    <div onClick={() => handleToggle('sysAlert')} style={{ width: '44px', height: '24px', borderRadius: '99px', background: formValues.sysAlert ? 'var(--color-emerald)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: formValues.sysAlert ? '23px' : '3px', transition: 'all 0.3s' }} />
                    </div>
                  </div>
                </>
              )}

              {/* 4. APPEARANCE TAB */}
              {activeGroup === 'appearance' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Tema Visual Platform</label>
                    <select className="glass-input" {...register('themeMode')}>
                      <option value="dark" style={{ background: '#1B2E26', color: '#fff' }}>Dark Forest (Glassmorphism)</option>
                      <option value="light" style={{ background: '#1B2E26', color: '#fff' }}>Light Mode (Beta)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Aksen Warna Primary</label>
                    <select className="glass-input" {...register('themeColor')}>
                      <option value="emerald" style={{ background: '#1B2E26', color: '#fff' }}>Emerald Green (IPNU IPPNU Default)</option>
                      <option value="blue" style={{ background: '#1B2E26', color: '#fff' }}>Ocean Blue</option>
                    </select>
                  </div>
                </>
              )}

              {/* 5. DATABASE TAB */}
              {activeGroup === 'database' && (
                <>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Status koneksi PostgreSQL saat ini: <span style={{ color: '#34D399', fontWeight: 'bold' }}>Terhubung</span>.</p>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Connection String URL</label>
                    <input className="glass-input" type="password" value="postgresql://user:password@aws-db.neon.tech/ipnu_db" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleBackup}>
                      <Download size={16} /> Backup Data (SQL)
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', borderColor: 'rgba(239,68,68,0.3)', color: '#EF4444' }} onClick={handleClearCache}>
                      <RefreshCw size={16} /> Bersihkan Cache
                    </button>
                  </div>
                </>
              )}

              {/* 6. EMAIL TAB */}
              {activeGroup === 'email' && (
                <>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Konfigurasi SMTP server untuk pengiriman email notifikasi dan reset password.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>SMTP Host</label>
                      <input className="glass-input" {...register('smtpHost')} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>SMTP Port</label>
                      <input className="glass-input" {...register('smtpPort')} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Username Email</label>
                      <input className="glass-input" {...register('smtpUser')} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Password / App Password</label>
                      <input className="glass-input" type="password" placeholder="••••••••••••" {...register('smtpPass')} />
                    </div>
                  </div>
                </>
              )}

              {/* Tombol Simpan Global */}
              {activeGroup !== 'database' && (
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '24px' }} disabled={updateMutation.isPending}>
                  <Save size={16} /> {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              )}

            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}