// GET /api/admin-session → { authenticated: boolean }
// Verifica la cookie de sesión firmada. No expone el secreto ni la contraseña.
import { verifyToken, parseCookie, COOKIE_NAME } from './_lib/session.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const token = parseCookie(req.headers.cookie, COOKIE_NAME);
  return res.status(200).json({ authenticated: verifyToken(token) });
}
