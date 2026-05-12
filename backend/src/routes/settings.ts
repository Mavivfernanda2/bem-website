import { Hono } from 'hono';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, roleGuard } from '../middleware/auth.js';

export const settingsRoutes = new Hono();

settingsRoutes.get('/', async (c) => {
  const settings = await prisma.setting.findMany();
  const settingsMap = settings.reduce((acc: Record<string, string>, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
  return c.json({ success: true, data: settingsMap });
});

settingsRoutes.post('/', authMiddleware, roleGuard('super_admin'), async (c) => {
  try {
    const body = await c.req.json();
    const keys = Object.keys(body);
    
    // UPSERT all settings
    for (const key of keys) {
      const value = String(body[key]);
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    const settings = await prisma.setting.findMany();
    const settingsMap = settings.reduce((acc: Record<string, string>, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {});

    return c.json({ success: true, data: settingsMap });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to update settings' }, 500);
  }
});
