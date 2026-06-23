// POST /api/admin-logout → borra la cookie de sesión.
import { clearSessionCookie } from './_lib/session.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  clearSessionCookie(req, res);
  return res.status(200).json({ ok: true });
}
