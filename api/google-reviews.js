// Vercel Serverless Function — proxy a Google Places API (New).
// La API key vive SOLO en el servidor (nunca en el bundle del cliente).
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   GOOGLE_PLACES_API_KEY   (obligatoria para datos reales)
//   GOOGLE_PLACE_ID         (obligatoria para datos reales)
//
// Sin variables → responde { reviews: [] } y el frontend usa el fallback estático.

export default async function handler(req, res) {
  // Cache en CDN de Vercel: 1h fresco + 1h stale-while-revalidate (no quema cuota).
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600');

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(200).json({ reviews: [], rating: null, total: null, source: 'unconfigured' });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
    const resp = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
        // Idioma preferente de las reseñas devueltas por Google
        'Accept-Language': 'es',
      },
    });

    if (!resp.ok) {
      return res.status(200).json({ reviews: [], rating: null, total: null, source: 'error' });
    }

    const data = await resp.json();
    const reviews = (data.reviews || []).map((r, i) => ({
      id: r.name || `g-${i}`,
      author: r.authorAttribution?.displayName || 'Cliente de Google',
      rating: r.rating || 5,
      text: r.text?.text || r.originalText?.text || '',
      relativeDate: r.relativePublishTimeDescription || '',
      photoUrl: r.authorAttribution?.photoUri || null,
    }));

    return res.status(200).json({
      reviews,
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      source: 'api',
    });
  } catch {
    return res.status(200).json({ reviews: [], rating: null, total: null, source: 'error' });
  }
}
