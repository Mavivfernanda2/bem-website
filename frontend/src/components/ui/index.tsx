import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
  delay?: number;
}

export function StatCard({ icon: Icon, label, value, trend, color = '#34D399', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      className="glass-card"
      style={{ padding: '24px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          <Icon size={20} />
        </div>
        {trend && (
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color, display: 'flex', alignItems: 'center', gap: '2px' }}>
            {trend}
          </span>
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem', marginBottom: '2px' }}>{value}</div>
      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>{label}</div>
    </motion.div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  padding?: string;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  delay?: number;
}

export function GlassCard({ children, padding = '24px', className = '', hover = true, onClick, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card ${className}`}
      style={{ padding, cursor: onClick ? 'pointer' : 'default' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { scale: 1.02 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface BadgeProps {
  label: string;
  color: string;
  icon?: LucideIcon;
}

export function Badge({ label, color, icon: Icon }: BadgeProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '99px', background: `${color}15`, color, fontSize: '0.75rem', fontWeight: 600 }}>
      {Icon && <Icon size={11} />}
      {label}
    </span>
  );
}

interface SectionHeaderProps {
  tag: string;
  title: ReactNode;
  description?: string;
}

export function SectionHeader({ tag, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <span className="section-tag">{tag}</span>
      <h2 className="heading-lg">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </motion.div>
  );
}
