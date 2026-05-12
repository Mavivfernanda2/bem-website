import { Hono } from 'hono'

export const eventRoutes = new Hono()

// ======================================================
// TEMP DATABASE
// ======================================================

let events = [
  {
    id: '1',
    title: 'MAKESTA',
    slug: 'makesta',
    location: 'PCNU',
    targetParticipants: 100,
    startDate: '2026-05-12',
    status: 'published',
  },
]

// ======================================================
// GET ALL EVENTS
// ======================================================

eventRoutes.get('/', async (c) => {
  try {
    return c.json({
      success: true,
      data: events,
    })
  } catch (error) {
    console.log('GET EVENTS ERROR:', error)

    return c.json(
      {
        success: false,
        message: 'Failed fetch events',
      },
      500
    )
  }
})

// ======================================================
// CREATE EVENT
// ======================================================

eventRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json()

    console.log(
      'CREATE EVENT BODY:',
      body
    )

    const newEvent = {
      id: Date.now().toString(),
      ...body,
    }

    events.push(newEvent)

    return c.json({
      success: true,
      message:
        'Event berhasil ditambahkan',
      data: newEvent,
    })
  } catch (error) {
    console.log(
      'CREATE EVENT ERROR:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed create event',
      },
      500
    )
  }
})

// ======================================================
// UPDATE EVENT
// ======================================================

eventRoutes.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const body = await c.req.json()

    console.log(
      'UPDATE EVENT:',
      id,
      body
    )

    events = events.map((event) =>
      event.id === id
        ? {
          ...event,
          ...body,
        }
        : event
    )

    return c.json({
      success: true,
      message:
        'Event berhasil diupdate',
    })
  } catch (error) {
    console.log(
      'UPDATE EVENT ERROR:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed update event',
      },
      500
    )
  }
})

// ======================================================
// DELETE EVENT
// ======================================================

eventRoutes.delete(
  '/:id',
  async (c) => {
    try {
      const id = c.req.param('id')

      console.log(
        'DELETE EVENT:',
        id
      )

      events = events.filter(
        (event) => event.id !== id
      )

      return c.json({
        success: true,
        message:
          'Event berhasil dihapus',
      })
    } catch (error) {
      console.log(
        'DELETE EVENT ERROR:',
        error
      )

      return c.json(
        {
          success: false,
          message:
            'Failed delete event',
        },
        500
      )
    }
  }
)