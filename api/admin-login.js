// POST /api/admin-login  { password }
// Valida contra ADMIN_PASSWORD (env, solo servidor) y emite cookie de sesión.
import { createToken, setSessionCookie, safeCompare } from './_lib/session.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!adminPassword || !sessionSecret) {
    // Sin variables → el admin queda bloqueado (no hay forma de entrar).
    return res.status(503).json({ ok: false, error: 'unconfigured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const password = body?.password || '';

  if (!safeCompare(password, adminPassword)) {
    return res.status(401).json({ ok: false });
  }

  setSessionCookie(req, res, createToken());
  return res.status(200).json({ ok: true });
}
