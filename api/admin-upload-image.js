import { put } from '@vercel/blob';
import { COOKIE_NAME, parseCookie, verifyToken } from './_lib/session.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const isAdminRequest = (request) => {
  const token = parseCookie(request.headers.cookie || '', COOKIE_NAME);
  return verifyToken(token);
};

const sanitizeFileName = (name) => {
  const safeName = String(name || 'servicio.jpg')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return safeName || `servicio-${Date.now()}.jpg`;
};

const readRawBody = (request) => {
  if (Buffer.isBuffer(request.body)) return Promise.resolve(request.body);
  if (request.body instanceof Uint8Array) return Promise.resolve(Buffer.from(request.body));
  if (typeof request.body === 'string') return Promise.resolve(Buffer.from(request.body, 'binary'));

  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;

    request.on('data', (chunk) => {
      total += chunk.length;
      if (total > MAX_FILE_SIZE) {
        reject(new Error('file_too_large'));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on('end', () => resolve(Buffer.concat(chunks)));
    request.on('error', reject);
  });
};

const getRequestFileName = (request) => {
  const header = request.headers['x-upload-file-name'];
  const value = Array.isArray(header) ? header[0] : header;
  try {
    return decodeURIComponent(value || '');
  } catch {
    return value || '';
  }
};

const getContentType = (request) => {
  const header = request.headers['x-upload-content-type'] || request.headers['content-type'];
  const value = Array.isArray(header) ? header[0] : header;
  return String(value || '').split(';')[0].trim().toLowerCase();
};

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'method_not_allowed' });
  }

  if (!isAdminRequest(request)) {
    return response.status(401).json({
      error: 'unauthorized',
      message: 'Tu sesion admin vencio. Ingresa de nuevo y vuelve a subir la imagen.',
    });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return response.status(503).json({
      error: 'blob_not_configured',
      message: 'Falta BLOB_READ_WRITE_TOKEN en las variables de entorno de Vercel.',
    });
  }

  const contentType = getContentType(request);
  if (!ALLOWED_TYPES.has(contentType)) {
    return response.status(400).json({
      error: 'invalid_file_type',
      message: 'Usa una imagen JPG, PNG o WebP.',
    });
  }

  try {
    const fileBuffer = await readRawBody(request);

    if (!fileBuffer.length) {
      return response.status(400).json({
        error: 'empty_file',
        message: 'La imagen llego vacia. Intenta subirla de nuevo.',
      });
    }

    if (fileBuffer.length > MAX_FILE_SIZE) {
      return response.status(413).json({
        error: 'file_too_large',
        message: 'La imagen debe pesar menos de 4 MB.',
      });
    }

    const safeName = sanitizeFileName(getRequestFileName(request));
    const blob = await put(`servicios/${Date.now()}-${safeName}`, fileBuffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });

    return response.status(200).json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
    });
  } catch (error) {
    const status = error?.message === 'file_too_large' ? 413 : 500;
    const message = error?.message === 'file_too_large'
      ? 'La imagen debe pesar menos de 4 MB.'
      : error?.message || 'No se pudo subir la imagen a Vercel Blob.';

    console.error('admin_blob_upload_failed', error);
    return response.status(status).json({
      error: error?.message || 'upload_failed',
      message,
    });
  }
}
