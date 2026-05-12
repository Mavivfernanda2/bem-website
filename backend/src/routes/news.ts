import { Hono } from 'hono'

export const newsRoutes = new Hono()

// ======================================================
// TEMP DATABASE
// ======================================================

let news = [
  {
    id: '1',
    title: 'MAKESTA',
    slug: 'makesta',
    content: 'Isi berita',
    status: 'published',
  },
]

// ======================================================
// GET ALL NEWS
// ======================================================

newsRoutes.get('/', async (c) => {
  try {
    return c.json({
      success: true,
      data: news,
    })
  } catch (error) {
    console.log(
      'GET NEWS ERROR:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed fetch news',
      },
      500
    )
  }
})

// ======================================================
// CREATE NEWS
// ======================================================

newsRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json()

    console.log(
      'CREATE NEWS BODY:',
      body
    )

    const newNews = {
      id: Date.now().toString(),
      title: body.title,
      slug: body.slug,
      content:
        body.content ||
        body.summary ||
        '',
      status:
        body.status || 'draft',
    }

    news.push(newNews)

    return c.json({
      success: true,
      message:
        'Berita berhasil dibuat',
      data: newNews,
    })
  } catch (error) {
    console.log(
      'CREATE NEWS ERROR:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed create news',
      },
      500
    )
  }
})

// ======================================================
// UPDATE NEWS
// ======================================================

newsRoutes.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const body = await c.req.json()

    news = news.map((item) =>
      item.id === id
        ? {
          ...item,
          ...body,
        }
        : item
    )

    return c.json({
      success: true,
      message:
        'Berita berhasil diupdate',
    })
  } catch (error) {
    console.log(
      'UPDATE NEWS ERROR:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed update news',
      },
      500
    )
  }
})

// ======================================================
// DELETE NEWS
// ======================================================

newsRoutes.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')

    news = news.filter(
      (item) => item.id !== id
    )

    return c.json({
      success: true,
      message:
        'Berita berhasil dihapus',
    })
  } catch (error) {
    console.log(
      'DELETE NEWS ERROR:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed delete news',
      },
      500
    )
  }
})