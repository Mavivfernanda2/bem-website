import { Hono } from 'hono'

export const taskRoutes = new Hono()

// ======================================================
// GET TASKS
// ======================================================

taskRoutes.get('/', async (c) => {
  try {
    const tasks = [
      {
        id: '1',
        title: 'LOMBA',
        description:
          'Persiapan lomba',
        priority: 'medium',
        status: 'todo',
      },
    ]

    return c.json({
      success: true,
      data: tasks,
    })
  } catch (error) {
    console.log(error)

    return c.json(
      {
        success: false,
      },
      500
    )
  }
})

// ======================================================
// CREATE TASK
// ======================================================

taskRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json()

    console.log(
      'CREATE TASK BODY:',
      body
    )

    const newTask = {
      id: Date.now().toString(),
      title: body.title,
      description:
        body.description || '',
      priority:
        body.priority || 'medium',
      status: body.status || 'todo',
    }

    return c.json({
      success: true,
      message:
        'Task berhasil dibuat',
      data: newTask,
    })
  } catch (error) {
    console.log(error)

    return c.json(
      {
        success: false,
        message:
          'Failed create task',
      },
      500
    )
  }
})

// ======================================================
// UPDATE TASK
// ======================================================

taskRoutes.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const body = await c.req.json()

    return c.json({
      success: true,
      data: {
        id,
        ...body,
      },
    })
  } catch (error) {
    console.log(error)

    return c.json(
      {
        success: false,
      },
      500
    )
  }
})

// ======================================================
// DELETE TASK
// ======================================================

taskRoutes.delete('/:id', async (c) => {
  try {
    return c.json({
      success: true,
    })
  } catch (error) {
    console.log(error)

    return c.json(
      {
        success: false,
      },
      500
    )
  }
})