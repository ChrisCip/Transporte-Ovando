// Sesión de admin firmada con HMAC-SHA256. Sin dependencias externas.
// El token va en una cookie HttpOnly (no accesible por JS del cliente).
// Carpeta _lib → Vercel la ignora como ruta, pero se incluye en el bundle.
import crypto from 'crypto';

export const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 8; // 8 horas (segundos)

const secret = () => process.env.ADMIN_SESSION_SECRET || '';

// Compara dos strings en tiempo constante (evita timing attacks).
export function safeCompare(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function createToken() {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = Buffer.from(JSON.stringify({ exp })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyToken(token) {
  if (!token || !secret()) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof exp === 'number' && Date.now() < exp;
  } catch {
    return false;
  }
}

export function parseCookie(header, name) {
  if (!header) return null;
  const found = header.split(';').map((s) => s.trim()).find((s) => s.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : null;
}

// En Vercel (HTTPS) el proxy añade x-forwarded-proto=https → cookie Secure.
// En localhost (http) se omite Secure para que vercel dev funcione.
const isSecure = (req) => String(req.headers['x-forwarded-proto'] || '').includes('https');

export function setSessionCookie(req, res, token) {
  const parts = [`${COOKIE_NAME}=${token}`, 'HttpOnly', 'Path=/', 'SameSite=Strict', `Max-Age=${MAX_AGE}`];
  if (isSecure(req)) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function clearSessionCookie(req, res) {
  const parts = [`${COOKIE_NAME}=`, 'HttpOnly', 'Path=/', 'SameSite=Strict', 'Max-Age=0'];
  if (isSecure(req)) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}
