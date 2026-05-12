import jwt from 'jsonwebtoken'
import type { Context, Next } from 'hono'

const JWT_SECRET = process.env.JWT_SECRET || 'ipnu-ippnu-secret-key-2026'

export interface JwtPayload {
  userId: string
  email: string
  role: string
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h',
  })
}

export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}

// ======================================================
// REAL AUTH MIDDLEWARE (No more bypass!)
// ======================================================

export async function authMiddleware(c: Context, next: Next) {
  try {
    const authHeader = c.req.header('Authorization')

    // 1. Cek apakah header Authorization ada
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, message: 'Unauthorized: Missing or invalid token' }, 401)
    }

    // 2. Ambil token aslinya (buang kata "Bearer ")
    const token = authHeader.split(' ')[1]

    // 3. Verifikasi token menggunakan JWT Secret
    const decoded = verifyToken(token)

    // 4. Pasang data user ASLI hasil verifikasi ke dalam context Hono
    c.set('user', decoded)

    await next()
  } catch (error) {
    // Kalau token expired atau palsu, langsung usir (401)
    return c.json({ success: false, message: 'Unauthorized: Invalid token' }, 401)
  }
}

// ======================================================
// ROLE GUARD
// ======================================================

export function roleGuard(...allowedRoles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user') as JwtPayload

    // Cek apakah role dari token (misal: 'super_admin') ada di dalam daftar role yang diizinkan
    if (!user || !allowedRoles.includes(user.role)) {
      return c.json({
        success: false,
        message: 'Forbidden: You do not have permission to access this resource'
      }, 403)
    }

    await next()
  }
}