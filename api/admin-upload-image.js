import { handleUpload } from '@vercel/blob/client';
import { COOKIE_NAME, parseCookie, verifyToken } from './_lib/session.js';

const isAdminRequest = (request) => {
  const token = parseCookie(request.headers.cookie || '', COOKIE_NAME);
  return verifyToken(token);
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'method_not_allowed' });
  }

  const body = request.body;

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
    return response.status(400).json({ error: error?.message || 'upload_failed' });
  }
}
