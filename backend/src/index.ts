import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

// ROUTES
import { authRoutes } from './routes/auth.js'
import { userRoutes } from './routes/users.js'
import { departmentRoutes } from './routes/departments.js'
import { newsRoutes } from './routes/news.js'
import { eventRoutes } from './routes/events.js'
import { programRoutes } from './routes/programs.js'
import { taskRoutes } from './routes/tasks.js'
import { noteRoutes } from './routes/notes.js'
import { dashboardRoutes } from './routes/dashboard.js'
import { galleryRoutes } from './routes/gallery.js'
import { announcementRoutes } from './routes/announcements.js'
import { settingsRoutes } from './routes/settings.js'
import { organizationRoutes } from './routes/organization.js'

// APP
const app = new Hono().basePath('/api')

// ======================================================
// GLOBAL MIDDLEWARE
// ======================================================

app.use('*', logger())

app.use(
  '*',
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
    ],

    allowMethods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],

    credentials: true,
  })
)

// ======================================================
// HEALTH CHECK
// ======================================================

app.get('/health', (c) => {
  return c.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// ======================================================
// ROUTES
// ======================================================

app.route('/auth', authRoutes)

app.route('/users', userRoutes)

app.route(
  '/departments',
  departmentRoutes
)

app.route('/news', newsRoutes)

app.route('/events', eventRoutes)

app.route('/programs', programRoutes)

app.route('/tasks', taskRoutes)

app.route('/notes', noteRoutes)

app.route('/dashboard', dashboardRoutes)

app.route('/gallery', galleryRoutes)

app.route(
  '/announcements',
  announcementRoutes
)

app.route(
  '/organization',
  organizationRoutes
)

app.route('/settings', settingsRoutes)

// ======================================================
// ROOT
// ======================================================

app.get('/', (c) => {
  return c.json({
    success: true,
    message:
      'IPNU IPPNU API SERVER RUNNING',
  })
})

// ======================================================
// ERROR HANDLER
// ======================================================

app.onError((err, c) => {
  console.error(
    'GLOBAL ERROR:',
    err
  )

  return c.json(
    {
      success: false,
      message:
        err.message ||
        'Internal Server Error',
    },
    500
  )
})

// ======================================================
// NOT FOUND
// ======================================================

app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: 'Route not found',
      path: c.req.path,
    },
    404
  )
})

// ======================================================
// SERVER
// ======================================================

const port = Number(
  process.env.PORT || 3001
)

console.log(`
========================================
🚀 IPNU IPPNU API SERVER
========================================
🌐 URL : http://localhost:${port}
========================================
`)

serve({
  fetch: app.fetch,
  port,
})

export default app