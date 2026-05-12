import { Hono } from 'hono';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { generateToken, generateRefreshToken, authMiddleware, verifyToken } from '../middleware/auth.js';
import type { JwtPayload } from '../middleware/auth.js'; // <-- WAJIB IMPORT INI

// 1. Definisikan tipe Variables agar TypeScript mengenali c.get('user')
type Variables = {
  user: JwtPayload;
};

// 2. Terapkan ke instance Hono
export const authRoutes = new Hono<{ Variables: Variables }>();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
});

// Login
authRoutes.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const data = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      return c.json({ success: false, message: 'Invalid credentials' }, 401);
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      return c.json({ success: false, message: 'Invalid credentials' }, 401);
    }

    const payload = { userId: user.id, email: user.email, role: user.role.name };
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), refreshToken },
    });

    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        ipAddress: c.req.header('x-forwarded-for') || 'unknown',
        userAgent: c.req.header('user-agent') || 'unknown',
      },
    });

    return c.json({
      success: true,
      data: {
        token,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role.name,
          roleName: user.role.displayName,
        },
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ success: false, message: 'Validation error', errors: error.errors }, 400);
    }
    // Ganti throw error menjadi return 500 agar server tidak crash
    return c.json({ success: false, message: error.message || 'Internal server error' }, 500);
  }
});

// Register (member)
authRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json();
    const data = registerSchema.parse(body);

    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) {
      return c.json({ success: false, message: 'Email already registered' }, 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    let memberRole = await prisma.role.findUnique({ where: { name: 'member' } });
    if (!memberRole) {
      memberRole = await prisma.role.create({
        data: { name: 'member', displayName: 'Member' },
      });
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        roleId: memberRole.id,
      },
      include: { role: true },
    });

    const payload = { userId: user.id, email: user.email, role: user.role.name };
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return c.json({
      success: true,
      data: {
        token,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        },
      },
    }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ success: false, message: 'Validation error', errors: error.errors }, 400);
    }
    return c.json({ success: false, message: error.message || 'Internal server error' }, 500);
  }
});

// Refresh token
authRoutes.post('/refresh', async (c) => {
  try {
    const { refreshToken } = await c.req.json();
    if (!refreshToken) {
      return c.json({ success: false, message: 'Refresh token required' }, 400);
    }

    const payload = verifyToken(refreshToken) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { role: true },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return c.json({ success: false, message: 'Invalid refresh token' }, 401);
    }

    const newPayload = { userId: user.id, email: user.email, role: user.role.name };
    const newToken = generateToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return c.json({
      success: true,
      data: { token: newToken, refreshToken: newRefreshToken },
    });
  } catch (error: any) {
    return c.json({ success: false, message: 'Invalid refresh token' }, 401);
  }
});

// Get current user
authRoutes.get('/me', authMiddleware, async (c) => {
  try {
    // Karena Variables sudah ada, c.get('user') tidak akan error merah lagi
    const { userId } = c.get('user');
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true, department: true },
    });

    if (!user) return c.json({ success: false, message: 'User not found' }, 404);

    return c.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        role: user.role.name,
        roleName: user.role.displayName,
        department: user.department?.name || null,
      },
    });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Internal server error' }, 500);
  }
});

// Logout
authRoutes.post('/logout', authMiddleware, async (c) => {
  try {
    const { userId } = c.get('user');
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return c.json({ success: true, message: 'Logged out' });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Internal server error' }, 500);
  }
});