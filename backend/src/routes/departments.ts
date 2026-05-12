import { Hono } from 'hono'
import { prisma } from '../lib/prisma.js'
import { authMiddleware, roleGuard } from '../middleware/auth.js'
import type { JwtPayload } from '../middleware/auth.js'

// 1. Standarisasi Tipe Variables Hono
type Variables = {
  user: JwtPayload;
};

// 2. Terapkan ke instance Hono
export const departmentRoutes = new Hono<{ Variables: Variables }>()

// ======================================================
// GET ALL DEPARTMENTS (Bisa diakses publik/pengunjung web)
// ======================================================
departmentRoutes.get('/', async (c) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        children: true,
        _count: {
          select: {
            users: true,
            programs: true,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    })

    return c.json({ success: true, data: departments })
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to fetch departments' }, 500)
  }
})

// ======================================================
// GET SINGLE DEPARTMENT (Bisa diakses publik)
// ======================================================
departmentRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const department = await prisma.department.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        children: true,
        programs: true,
        _count: {
          select: {
            users: true,
            programs: true,
          },
        },
      },
    })

    if (!department) {
      return c.json({ success: false, message: 'Department not found' }, 404)
    }

    return c.json({ success: true, data: department })
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to fetch department' }, 500)
  }
})

// ======================================================
// CREATE DEPARTMENT (Dilindungi: Wajib Login & Wajib Admin)
// ======================================================
departmentRoutes.post('/', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    const body = await c.req.json()

    if (!body.name || !body.slug) {
      return c.json({ success: false, message: 'Name and slug are required' }, 400)
    }

    const existing = await prisma.department.findUnique({
      where: { slug: body.slug },
    })

    if (existing) {
      return c.json({ success: false, message: 'Slug already exists' }, 409)
    }

    const department = await prisma.department.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        icon: body.icon || null,
        logo: body.logo || null,
        parentId: body.parentId || null,
        order: body.order ?? 0,
        isActive: body.isActive ?? true,
      },
    })

    return c.json({ success: true, data: department }, 201)
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to create department' }, 500)
  }
})

// ======================================================
// UPDATE DEPARTMENT (Dilindungi: Wajib Login & Wajib Admin)
// ======================================================
departmentRoutes.patch('/:id', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()

    const existing = await prisma.department.findUnique({
      where: { id },
    })

    if (!existing) {
      return c.json({ success: false, message: 'Department not found' }, 404)
    }

    const department = await prisma.department.update({
      where: { id },
      data: body,
    })

    return c.json({ success: true, data: department })
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to update department' }, 500)
  }
})

// ======================================================
// DELETE DEPARTMENT (Dilindungi: Wajib Login & Wajib Admin)
// ======================================================
departmentRoutes.delete('/:id', authMiddleware, roleGuard('super_admin', 'admin_ipnu', 'admin_ippnu'), async (c) => {
  try {
    const id = c.req.param('id')

    await prisma.department.delete({
      where: { id },
    })

    return c.json({ success: true, message: 'Department deleted' })
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Failed to delete department' }, 500)
  }
})