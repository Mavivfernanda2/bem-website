import { Hono } from 'hono';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import type { JwtPayload } from '../middleware/auth.js';

export const noteRoutes = new Hono();
noteRoutes.use('*', authMiddleware);

noteRoutes.get('/', async (c) => {
  const user = c.get('user') as JwtPayload;
  const notes = await prisma.note.findMany({
    where: { OR: [{ authorId: user.userId }, { isShared: true }] },
    include: { author: { select: { name: true, avatar: true } } },
    orderBy: { updatedAt: 'desc' },
  });
  return c.json({ success: true, data: notes });
});

noteRoutes.post('/', async (c) => {
  const user = c.get('user') as JwtPayload;
  const body = await c.req.json();
  const note = await prisma.note.create({
    data: { title: body.title, content: body.content, isShared: body.isShared || false, authorId: user.userId },
  });
  return c.json({ success: true, data: note }, 201);
});

noteRoutes.patch('/:id', async (c) => {
  const note = await prisma.note.update({ where: { id: c.req.param('id') }, data: await c.req.json() });
  return c.json({ success: true, data: note });
});

noteRoutes.delete('/:id', async (c) => {
  await prisma.note.delete({ where: { id: c.req.param('id') } });
  return c.json({ success: true, message: 'Note deleted' });
});
