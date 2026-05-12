# IPNU IPPNU Digital Platform — Documentation

## Architecture Overview

### Frontend (React + Vite + TypeScript)
- **Framework**: React 19 + Vite 8
- **Routing**: React Router v7
- **State**: Zustand (auth), React Query (server state)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Styling**: Vanilla CSS with custom design system

### Backend (Node.js + Hono.js)
- **Framework**: Hono.js (lightweight, edge-ready)
- **ORM**: Prisma with PostgreSQL
- **Auth**: JWT + Refresh Tokens
- **Validation**: Zod schemas
- **Encryption**: bcryptjs

### Database (PostgreSQL via Neon)
16+ models covering:
- Auth: users, roles, permissions, login_histories
- Organization: departments, organization_structures
- Content: news, events, programs, gallery_items
- Productivity: tasks, notes
- Member: certificates, member_cards
- System: announcements, settings

## Design System

### Colors
| Token | Value |
|---|---|
| Dark Forest (Deep) | `#0F1D17` |
| Dark Forest | `#1B2E26` |
| Emerald | `#1F6B52` |
| Emerald Glow | `#34D399` |
| Soft Cream | `#F5F6F0` |

### Glassmorphism
```css
background: rgba(255,255,255,0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255,255,255,0.12);
border-radius: 28px;
box-shadow: 0 8px 32px rgba(0,0,0,0.18);
```

### Typography
- Headings: Inter Tight (700-800)
- Body: Inter (400-600)
- Accent: Playfair Display Italic

## Getting Started

```bash
# Install dependencies
npm run install:all

# Start frontend (port 5173)
npm run dev:frontend

# Start backend (port 3001)
npm run dev:backend

# Start both
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/login` — Login
- `POST /api/auth/register` — Register
- `POST /api/auth/refresh` — Refresh token
- `GET /api/auth/me` — Current user
- `POST /api/auth/logout` — Logout

### Resources
- `GET /api/users` — List users
- `GET /api/departments` — List departments
- `GET /api/events` — List events
- `GET /api/news` — List news
- `GET /api/programs` — List programs
- `GET/POST/PATCH/DELETE /api/tasks` — CRUD tasks
- `GET/POST/PATCH/DELETE /api/notes` — CRUD notes
- `GET /api/dashboard/stats` — Dashboard statistics

## Deployment (Vercel)

1. Connect repo to Vercel
2. Set environment variables:
   - `DATABASE_URL` (Neon PostgreSQL)
   - `JWT_SECRET`
3. Build command: `cd frontend && npm run build`
4. Output directory: `frontend/dist`

## Roles & Permissions

| Role | Access |
|---|---|
| Super Admin | Full system access |
| Admin IPNU | IPNU management |
| Admin IPPNU | IPPNU management |
| Dept Admin | Department scope |
| Editor | Content management |
| Member | Basic access |
