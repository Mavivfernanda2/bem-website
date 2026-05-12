import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Roles
  const roles = await Promise.all([
    prisma.role.upsert({ where: { name: 'super_admin' }, update: {}, create: { name: 'super_admin', displayName: 'Super Admin', description: 'Full system access' } }),
    prisma.role.upsert({ where: { name: 'admin_ipnu' }, update: {}, create: { name: 'admin_ipnu', displayName: 'Admin IPNU', description: 'IPNU admin access' } }),
    prisma.role.upsert({ where: { name: 'admin_ippnu' }, update: {}, create: { name: 'admin_ippnu', displayName: 'Admin IPPNU', description: 'IPPNU admin access' } }),
    prisma.role.upsert({ where: { name: 'dept_admin' }, update: {}, create: { name: 'dept_admin', displayName: 'Department Admin', description: 'Department level access' } }),
    prisma.role.upsert({ where: { name: 'editor' }, update: {}, create: { name: 'editor', displayName: 'Editor', description: 'Content editor access' } }),
    prisma.role.upsert({ where: { name: 'member' }, update: {}, create: { name: 'member', displayName: 'Member', description: 'Basic member access' } }),
  ]);

  // Create Super Admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@ipnu-ippnu.org' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@ipnu-ippnu.org',
      password: hashedPassword,
      roleId: roles[0].id,
      isActive: true,
    },
  });

  // Create Departments
  const depts = [
    { name: 'Teknologi & Informasi', slug: 'teknologi-informasi', description: 'Pengembangan platform digital', icon: '💻', order: 1 },
    { name: 'Pendidikan & Pelatihan', slug: 'pendidikan-pelatihan', description: 'Program peningkatan kapasitas', icon: '📚', order: 2 },
    { name: 'Humas & Komunikasi', slug: 'humas-komunikasi', description: 'Hubungan masyarakat dan publikasi', icon: '📢', order: 3 },
    { name: 'Seni & Budaya', slug: 'seni-budaya', description: 'Pelestarian seni dan budaya', icon: '🎨', order: 4 },
    { name: 'Sosial & Kemasyarakatan', slug: 'sosial-kemasyarakatan', description: 'Program sosial masyarakat', icon: '❤️', order: 5 },
    { name: 'Kaderisasi', slug: 'kaderisasi', description: 'Pembinaan kader organisasi', icon: '🌱', order: 6 },
  ];

  for (const dept of depts) {
    await prisma.department.upsert({
      where: { slug: dept.slug },
      update: {},
      create: dept,
    });
  }

  // Create Settings
  const settings = [
    { key: 'org_name', value: 'IPNU IPPNU', group: 'general' },
    { key: 'org_description', value: 'Ikatan Pelajar Nahdlatul Ulama', group: 'general' },
    { key: 'contact_email', value: 'info@ipnu-ippnu.org', group: 'general' },
    { key: 'contact_phone', value: '+62 812 3456 7890', group: 'general' },
    { key: 'address', value: 'Jl. Contoh No. 123, Surabaya, Indonesia', group: 'general' },
    { key: 'public_registration', value: 'true', group: 'security' },
    { key: 'email_notification', value: 'true', group: 'notification' },
    { key: 'maintenance_mode', value: 'false', group: 'system' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  // Create Permissions
  const modules = ['users', 'departments', 'events', 'news', 'programs', 'gallery', 'tasks', 'notes', 'announcements', 'settings'];
  const actions = ['create', 'read', 'update', 'delete'];

  for (const module of modules) {
    for (const action of actions) {
      const name = `${module}.${action}`;
      await prisma.permission.upsert({
        where: { name },
        update: {},
        create: { name, module, description: `${action} ${module}` },
      });
    }
  }

  console.log('✅ Database seeded successfully!');
  console.log(`   - ${roles.length} roles created`);
  console.log(`   - 1 admin user created (admin@ipnu-ippnu.org / admin123)`);
  console.log(`   - ${depts.length} departments created`);
  console.log(`   - ${settings.length} settings created`);
  console.log(`   - ${modules.length * actions.length} permissions created`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
