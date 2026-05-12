import { Hono } from 'hono'
import { prisma } from '../lib/prisma.js'

export const organizationRoutes = new Hono()

// ======================================================
// GET ALL ORGANIZATION MEMBERS (PUBLIC)
// ======================================================

organizationRoutes.get('/', async (c) => {
  try {
    const members = await prisma.organizationStructure.findMany({
      where: {
        isActive: true,
      },

      orderBy: [
        {
          level: 'asc',
        },
        {
          order: 'asc',
        },
      ],
    })

    return c.json({
      success: true,
      message: 'Organization members fetched successfully',
      data: members,
    })
  } catch (error) {
    console.error('GET ORGANIZATION ERROR:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to fetch organization members',
      },
      500
    )
  }
})

// ======================================================
// GET SINGLE ORGANIZATION MEMBER
// ======================================================

organizationRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const member =
      await prisma.organizationStructure.findUnique({
        where: {
          id,
        },
      })

    if (!member) {
      return c.json(
        {
          success: false,
          message: 'Organization member not found',
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Organization member fetched successfully',
      data: member,
    })
  } catch (error) {
    console.error('GET MEMBER ERROR:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to fetch organization member',
      },
      500
    )
  }
})

// ======================================================
// CREATE ORGANIZATION MEMBER
// ======================================================

organizationRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json()

    if (!body.name || !body.position) {
      return c.json(
        {
          success: false,
          message: 'Name and position are required',
        },
        400
      )
    }

    const member =
      await prisma.organizationStructure.create({
        data: {
          name: body.name,
          position: body.position,

          photo: body.photo || null,

          level: body.level || 'department',

          departmentId:
            body.departmentId || null,

          order: body.order ?? 0,

          isActive:
            body.isActive !== undefined
              ? body.isActive
              : true,

          periodStart:
            body.periodStart || null,

          periodEnd:
            body.periodEnd || null,
        },
      })

    return c.json(
      {
        success: true,
        message:
          'Organization member created successfully',
        data: member,
      },
      201
    )
  } catch (error) {
    console.error('CREATE MEMBER ERROR:', error)

    return c.json(
      {
        success: false,
        message:
          'Failed to create organization member',
      },
      500
    )
  }
})

// ======================================================
// UPDATE ORGANIZATION MEMBER
// ======================================================

organizationRoutes.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const body = await c.req.json()

    const existingMember =
      await prisma.organizationStructure.findUnique({
        where: {
          id,
        },
      })

    if (!existingMember) {
      return c.json(
        {
          success: false,
          message: 'Organization member not found',
        },
        404
      )
    }

    const updatedMember =
      await prisma.organizationStructure.update({
        where: {
          id,
        },

        data: {
          ...body,
        },
      })

    return c.json({
      success: true,
      message:
        'Organization member updated successfully',
      data: updatedMember,
    })
  } catch (error) {
    console.error('UPDATE MEMBER ERROR:', error)

    return c.json(
      {
        success: false,
        message:
          'Failed to update organization member',
      },
      500
    )
  }
})

// ======================================================
// DELETE ORGANIZATION MEMBER
// ======================================================

organizationRoutes.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const existingMember =
      await prisma.organizationStructure.findUnique({
        where: {
          id,
        },
      })

    if (!existingMember) {
      return c.json(
        {
          success: false,
          message: 'Organization member not found',
        },
        404
      )
    }

    await prisma.organizationStructure.delete({
      where: {
        id,
      },
    })

    return c.json({
      success: true,
      message:
        'Organization member deleted successfully',
    })
  } catch (error) {
    console.error('DELETE MEMBER ERROR:', error)

    return c.json(
      {
        success: false,
        message:
          'Failed to delete organization member',
      },
      500
    )
  }
})