import { Hono } from 'hono';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, roleGuard } from '../middleware/auth.js';

export const galleryRoutes = new Hono();

galleryRoutes.get('/', async (c) => {
  const galleries = await prisma.galleryItem.findMany({
    include: { event: { select: { title: true } } },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
  return c.json({ success: true, data: galleries });
});

galleryRoutes.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    if (!body.title || !body.imageUrl) {
      return c.json({ success: false, message: 'Title and imageUrl are required' }, 400);
    }
    const gallery = await prisma.galleryItem.create({
      data: {
        title: body.title,
        url: body.imageUrl,
        eventId: body.eventId || null,
        order: body.order || 0,
      },
      include: { event: { select: { title: true } } }
    });
    return c.json({ success: true, data: gallery }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to create gallery' }, 500);
  }
});

galleryRoutes.patch('/:id', authMiddleware, async (c) => {
  try {
    const gallery = await prisma.galleryItem.update({
      where: { id: c.req.param('id') },
      data: await c.req.json(),
      include: { event: { select: { title: true } } }
    });
    return c.json({ success: true, data: gallery });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to update gallery' }, 500);
  }
});

galleryRoutes.delete('/:id', authMiddleware, async (c) => {
  try {
    await prisma.galleryItem.delete({ where: { id: c.req.param('id') } });
    return c.json({ success: true, message: 'Gallery deleted' });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to delete gallery' }, 500);
  }
});
