import { get } from '@vercel/blob';

const ALLOWED_PREFIX = 'servicios/';

const streamToBuffer = async (stream) => {
  const arrayBuffer = await new Response(stream).arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    return response.status(405).end();
  }

  const pathname = String(request.query?.pathname || '');

  if (!pathname.startsWith(ALLOWED_PREFIX)) {
    return response.status(400).json({ error: 'invalid_pathname' });
  }

  try {
    const result = await get(pathname, { access: 'private', useCache: true });
    if (!result?.stream) {
      return response.status(404).end();
    }

    response.setHeader('Content-Type', result.blob.contentType || 'application/octet-stream');
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    if (result.blob.etag) response.setHeader('ETag', result.blob.etag);

    if (request.method === 'HEAD') {
      return response.status(200).end();
    }

    const buffer = await streamToBuffer(result.stream);
    return response.status(200).send(buffer);
  } catch (error) {
    console.error('blob_image_read_failed', error);
    return response.status(404).end();
  }
}
