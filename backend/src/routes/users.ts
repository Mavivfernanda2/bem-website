import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, roleGuard } from '../middleware/auth.js';

export const userRoutes = new Hono();

userRoutes.get('/', authMiddleware, async (c) => {
  const users = await prisma.user.findMany({
    include: { role: true, department: true },
    orderBy: { createdAt: 'desc' },
  });
  return c.json({ success: true, data: users });
});

userRoutes.get('/roles', authMiddleware, async (c) => {
  const roles = await prisma.role.findMany();
  return c.json({ success: true, data: roles });
});

userRoutes.post('/', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    const body = await c.req.json();
    if (!body.name || !body.email || !body.password) {
      return c.json({ success: false, message: 'Name, email, password are required' }, 400);
    }
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) return c.json({ success: false, message: 'Email already exists' }, 409);

    const role = await prisma.role.findUnique({ where: { id: body.roleId } });
    if (!role) return c.json({ success: false, message: 'Role not found' }, 404);

    const hashed = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashed,
        roleId: role.id,
        departmentId: body.departmentId || null,
        phone: body.phone || null,
        address: body.address || null,
      },
      include: { role: true, department: true },
    });
    return c.json({ success: true, data: user }, 201);
  } catch (err: any) {
    return c.json({ success: false, message: err.message || 'Failed to create user' }, 500);
  }
});

userRoutes.patch('/:id', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return c.json({ success: false, message: 'User not found' }, 404);

    if (body.email && body.email !== existing.email) {
      const emailExists = await prisma.user.findUnique({ where: { email: body.email } });
      if (emailExists) return c.json({ success: false, message: 'Email already exists' }, 409);
    }

    const data: any = { ...body };
    if (body.password) {
      data.password = await bcrypt.hash(body.password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      include: { role: true, department: true },
    });
    return c.json({ success: true, data: user });
  } catch (err: any) {
    return c.json({ success: false, message: err.message || 'Failed to update user' }, 500);
  }
});

userRoutes.delete('/:id', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    await prisma.user.delete({ where: { id: c.req.param('id') } });
    return c.json({ success: true, message: 'User deleted' });
  } catch (err: any) {
    return c.json({ success: false, message: err.message || 'Failed to delete user' }, 500);
  }
});