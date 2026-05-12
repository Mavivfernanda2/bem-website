import { Hono } from 'hono';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import type { JwtPayload } from '../middleware/auth.js'; // <-- Import tipe JWT

// 1. Definisikan tipe Variables (Standar Wajib kita sekarang)
type Variables = {
  user: JwtPayload;
};

// 2. Terapkan ke instance Hono
export const dashboardRoutes = new Hono<{ Variables: Variables }>();

// Semua route di file ini wajib login
dashboardRoutes.use('*', authMiddleware);

dashboardRoutes.get('/stats', async (c) => {
  try {
    // Jalankan semua query perhitungan secara paralel biar halamannya loading secepat kilat! ⚡
    const [users, events, news, programs, tasks, departments] = await Promise.all([
      prisma.user.count(),
      prisma.event.count(),
      prisma.news.count(),
      prisma.program.count(),
      prisma.task.count(),
      prisma.department.count(),
    ]);

    return c.json({
      success: true,
      data: { users, events, news, programs, tasks, departments }
    });
  } catch (error: any) {
    // 3. Pasang sabuk pengaman try-catch biar kalau error, servernya nggak mati
    return c.json({
      success: false,
      message: error.message || 'Failed to fetch dashboard stats'
    }, 500);
  }
});