import { Hono } from 'hono';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

export const programRoutes = new Hono();

// List programs
programRoutes.get('/', async (c) => {
  const status = c.req.query('status');
  const where = status ? { status } : {};

  const programs = await prisma.program.findMany({
    where,
    include: { department: { select: { id: true, name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return c.json({ success: true, data: programs });
});

// Get program by slug
programRoutes.get('/:slug', async (c) => {
  const program = await prisma.program.findUnique({
    where: { slug: c.req.param('slug') },
    include: { department: true },
  });
  if (!program) return c.json({ success: false, message: 'Program not found' }, 404);
  return c.json({ success: true, data: program });
});

// Create
programRoutes.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    if (!body.title || !body.slug) {
      return c.json({ success: false, message: 'Title and slug are required' }, 400);
    }

    const exists = await prisma.program.findUnique({ where: { slug: body.slug } });
    if (exists) return c.json({ success: false, message: 'Slug already exists' }, 409);

    const program = await prisma.program.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description || null,
        status: body.status || 'draft',
        departmentId: body.departmentId || null,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
      include: { department: { select: { id: true, name: true, slug: true } } }
    });

    return c.json({ success: true, data: program }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to create program' }, 500);
  }
});

// Update
programRoutes.patch('/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();

    const existing = await prisma.program.findUnique({ where: { id } });
    if (!existing) return c.json({ success: false, message: 'Program not found' }, 404);

    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.program.findUnique({ where: { slug: body.slug } });
      if (slugExists) return c.json({ success: false, message: 'Slug already exists' }, 409);
    }

    const program = await prisma.program.update({
      where: { id },
      data: {
        ...body,
        startDate: body.startDate ? new Date(body.startDate) : existing.startDate,
        endDate: body.endDate ? new Date(body.endDate) : existing.endDate,
      },
      include: { department: { select: { id: true, name: true, slug: true } } }
    });

    return c.json({ success: true, data: program });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to update program' }, 500);
  }
});

// Delete
programRoutes.delete('/:id', authMiddleware, async (c) => {
  try {
    await prisma.program.delete({ where: { id: c.req.param('id') } });
    return c.json({ success: true, message: 'Program deleted' });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to delete program' }, 500);
  }
});
