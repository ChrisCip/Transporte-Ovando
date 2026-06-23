import { handleUpload } from '@vercel/blob/client';
import { COOKIE_NAME, parseCookie, verifyToken } from './_lib/session.js';

const parseBody = (body) => {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
};

const isAdminRequest = (request) => {
  const token = parseCookie(request.headers.cookie || '', COOKIE_NAME);
  return verifyToken(token);
};

const getErrorStatus = (error) => {
  const message = String(error?.message || '');
  if (message.includes('No autorizado')) return 401;
  if (message.includes('BLOB_READ_WRITE_TOKEN') || message.includes('No token')) return 503;
  return 400;
};

const getErrorMessage = (error) => {
  const message = String(error?.message || '');
  if (message.includes('No autorizado')) {
    return 'Tu sesion admin vencio. Ingresa de nuevo y vuelve a subir la imagen.';
  }
  if (message.includes('BLOB_READ_WRITE_TOKEN') || message.includes('No token')) {
    return 'Falta BLOB_READ_WRITE_TOKEN en las variables de entorno de Vercel.';
  }
  return message || 'No se pudo preparar la subida a Vercel Blob.';
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'method_not_allowed' });
  }

  const body = parseBody(request.body);

  if (body?.type === 'blob.generate-client-token' && !isAdminRequest(request)) {
    return response.status(401).json({
      error: 'unauthorized',
      message: 'Tu sesion admin vencio. Ingresa de nuevo y vuelve a subir la imagen.',
    });
  }

  if (body?.type === 'blob.generate-client-token' && !process.env.BLOB_READ_WRITE_TOKEN) {
    return response.status(503).json({
      error: 'blob_not_configured',
      message: 'Falta BLOB_READ_WRITE_TOKEN en las variables de entorno de Vercel.',
    });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!isAdminRequest(request)) {
          throw new Error('No autorizado');
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 8 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            pathname,
            source: 'admin-service-image',
          }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('admin image upload completed', blob.url);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    console.error('admin_blob_upload_token_failed', error);
    return response.status(getErrorStatus(error)).json({
      error: error?.message || 'upload_failed',
      message: getErrorMessage(error),
    });
  }
}
