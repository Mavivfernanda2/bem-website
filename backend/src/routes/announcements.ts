import { Hono } from 'hono';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, roleGuard } from '../middleware/auth.js';
import type { JwtPayload } from '../middleware/auth.js';

// 1. Definisikan tipe Variables untuk mengenalkan 'user' ke dalam Context Hono
type Variables = {
  user: JwtPayload;
};

// 2. Terapkan tipe Variables tersebut ke instance Hono agar TypeScript tidak error (never)
export const announcementRoutes = new Hono<{ Variables: Variables }>();

announcementRoutes.get('/', async (c) => {
  try {
    const announcements = await prisma.announcement.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return c.json({ success: true, data: announcements });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to fetch announcements' }, 500);
  }
});

announcementRoutes.post('/', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    // 3. Karena Variables sudah diset di atas, c.get('user') otomatis dikenali, tidak perlu "as JwtPayload" lagi!
    const user = c.get('user');
    const body = await c.req.json();

    if (!body.title || !body.content) {
      return c.json({ success: false, message: 'Title and content are required' }, 400);
    }

    const announcement = await prisma.announcement.create({
      data: {
        title: body.title,
        content: body.content,
        priority: body.priority || 'normal',
        isActive: body.isActive !== undefined ? body.isActive : true,
        authorId: user.userId,
      },
      include: { author: { select: { name: true } } }
    });

    return c.json({ success: true, data: announcement }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to create announcement' }, 500);
  }
});

announcementRoutes.patch('/:id', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    const body = await c.req.json();
    const announcement = await prisma.announcement.update({
      where: { id: c.req.param('id') },
      data: body,
      include: { author: { select: { name: true } } }
    });
    return c.json({ success: true, data: announcement });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to update announcement' }, 500);
  }
});

announcementRoutes.delete('/:id', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    await prisma.announcement.delete({ where: { id: c.req.param('id') } });
    return c.json({ success: true, message: 'Announcement deleted' });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to delete announcement' }, 500);
  }
});