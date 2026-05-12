import 'hono';
import type { JwtPayload } from './middleware/auth.js';

declare module 'hono' {
  interface ContextVariableMap {
    user: JwtPayload;
  }
}
