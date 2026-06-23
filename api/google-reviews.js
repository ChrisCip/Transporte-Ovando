// Vercel Serverless Function: proxy a Google Places API (New).
// La API key vive solo en servidor; nunca se expone en el bundle del cliente.

export default async function handler(req, res) {
  // Cache CDN: 1h fresco + 1h stale-while-revalidate para cuidar cuota.
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=3600");

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(200).json({ reviews: [], rating: null, total: null, source: "unconfigured" });
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
      return res.status(200).json({ reviews: [], rating: null, total: null, source: "error" });
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

    return res.status(200).json({
      reviews,
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      source: "api",
    });
  } catch {
    return res.status(200).json({ reviews: [], rating: null, total: null, source: "error" });
  }
}
