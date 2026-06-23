import { get, put } from '@vercel/blob';
import crypto from 'crypto';
import { DEFAULT_SERVICES, SERVICE_TYPES } from '../src/data/constants.js';
import { COOKIE_NAME, parseCookie, verifyToken } from './_lib/session.js';

const SERVICES_BLOB_PATH = 'data/services.json';
const VALID_SERVICE_TYPES = new Set(Object.keys(SERVICE_TYPES));

const json = (response, status, payload) => response.status(status).json(payload);

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

const streamToText = async (stream) => {
  if (!stream) return '';
  return new Response(stream).text();
};

const sanitizeText = (value, fallback = '') => String(value ?? fallback).trim();

const sanitizeNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const sanitizeService = (service) => ({
  id: sanitizeText(service.id) || crypto.randomUUID(),
  name: sanitizeText(service.name, 'Servicio'),
  type: VALID_SERVICE_TYPES.has(service.type) ? service.type : 'transfer',
  location: sanitizeText(service.location),
  destination: sanitizeText(service.destination),
  description: sanitizeText(service.description),
  price: Math.max(0, sanitizeNumber(service.price)),
  paxLimit: Math.max(1, sanitizeNumber(service.paxLimit, 1)),
  icon: sanitizeText(service.icon, 'Car'),
  imageUrl: sanitizeText(service.imageUrl, '/TransporteLogo.png'),
  amenities: Array.isArray(service.amenities)
    ? service.amenities.map((amenity) => sanitizeText(amenity)).filter(Boolean)
    : [],
});

const sanitizeServices = (services) => {
  if (!Array.isArray(services) || services.length > 100) return null;
  return services.map(sanitizeService);
};

const isAdminRequest = (request) => {
  const token = parseCookie(request.headers.cookie || '', COOKIE_NAME);
  return verifyToken(token);
};

const readServices = async () => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { services: DEFAULT_SERVICES, source: 'defaults' };
  }

  const result = await get(SERVICES_BLOB_PATH, { access: 'private', useCache: false });
  if (!result?.stream) {
    return { services: DEFAULT_SERVICES, source: 'defaults' };
  }

  const text = await streamToText(result.stream);
  const payload = JSON.parse(text);
  const services = sanitizeServices(payload.services);

  return {
    services: services || DEFAULT_SERVICES,
    source: services ? 'blob' : 'defaults',
    updatedAt: payload.updatedAt || null,
  };
};

const writeServices = async (services) => {
  const payload = {
    updatedAt: new Date().toISOString(),
    services,
  };

  await put(SERVICES_BLOB_PATH, JSON.stringify(payload, null, 2), {
    access: 'private',
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });

  return payload;
};

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method === 'GET') {
    try {
      return json(response, 200, await readServices());
    } catch (error) {
      console.error('services_read_failed', error);
      return json(response, 200, { services: DEFAULT_SERVICES, source: 'defaults' });
    }
  }

  if (request.method === 'PUT') {
    if (!isAdminRequest(request)) {
      return json(response, 401, { error: 'unauthorized' });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return json(response, 503, {
        error: 'blob_not_configured',
        message: 'Falta BLOB_READ_WRITE_TOKEN en Vercel.',
      });
    }

    const body = parseBody(request.body);
    const services = sanitizeServices(body.services);
    if (!services) {
      return json(response, 400, { error: 'invalid_services' });
    }

    try {
      const payload = await writeServices(services);
      return json(response, 200, { ...payload, source: 'blob' });
    } catch (error) {
      console.error('services_write_failed', error);
      return json(response, 500, { error: 'save_failed' });
    }
  }

  response.setHeader('Allow', 'GET, PUT');
  return json(response, 405, { error: 'method_not_allowed' });
}
