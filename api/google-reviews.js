// Vercel Serverless Function: proxy a Google Places API (New).
// La API key vive solo en servidor; nunca se expone en el bundle del cliente.

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const debug = req.query?.debug === "1";

  if (!apiKey || !placeId) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      reviews: [],
      rating: null,
      total: null,
      source: "unconfigured",
      ...(debug ? { configured: { apiKey: Boolean(apiKey), placeId: Boolean(placeId) } } : {}),
    });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`;
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
    });

    if (!response.ok) {
      res.setHeader("Cache-Control", "no-store");
      const details = await response.text().catch(() => "");
      return res.status(200).json({
        reviews: [],
        rating: null,
        total: null,
        source: "error",
        ...(debug ? { status: response.status, statusText: response.statusText, details: details.slice(0, 600) } : {}),
      });
    }

    const data = await response.json();
    const reviews = (data.reviews || []).map((review, index) => ({
      id: review.name || `g-${index}`,
      author: review.authorAttribution?.displayName || "Cliente de Google",
      rating: review.rating || 5,
      text: review.text?.text || review.originalText?.text || "",
      relativeDate: review.relativePublishTimeDescription || "",
      photoUrl: review.authorAttribution?.photoUri || null,
    }));

    // Cache solo respuestas reales de Google. No cacheamos errores para que
    // cambios de env vars o restricciones de API se reflejen de inmediato.
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=3600");
    return res.status(200).json({
      reviews,
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      source: "api",
      ...(debug ? {
        displayName: data.displayName?.text || null,
        rawReviewCount: Array.isArray(data.reviews) ? data.reviews.length : 0,
        reviewsWithText: reviews.filter((review) => review.text).length,
      } : {}),
    });
  } catch {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ reviews: [], rating: null, total: null, source: "error" });
  }
}
