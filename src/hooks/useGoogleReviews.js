import { useEffect, useState } from 'react';
import { FALLBACK_REVIEWS } from '../data/googleReviews';
import { GOOGLE_RATING_FALLBACK, GOOGLE_REVIEWS_COUNT_FALLBACK } from '../data/constants';

const FALLBACK = {
  reviews: FALLBACK_REVIEWS,
  rating: GOOGLE_RATING_FALLBACK,
  total: GOOGLE_REVIEWS_COUNT_FALLBACK,
  source: 'fallback',
  loading: false,
};

// Obtiene reseñas reales de /api/google-reviews (serverless con Places API).
// Si la ruta no existe (dev sin backend), falla o llega vacía → usa el fallback
// estático automáticamente. La UI nunca queda rota ni vacía.
export const useGoogleReviews = () => {
  const [state, setState] = useState({ ...FALLBACK, loading: true });

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    (async () => {
      try {
        const res = await fetch('/api/google-reviews', { signal: controller.signal });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        const reviews = Array.isArray(data.reviews) ? data.reviews.filter((r) => r && r.text) : [];
        if (!alive) return;
        if (reviews.length === 0) {
          setState({ ...FALLBACK }); // mantiene rating/total del fallback
          return;
        }
        setState({
          reviews,
          rating: Number(data.rating) || GOOGLE_RATING_FALLBACK,
          total: Number(data.total) || reviews.length,
          source: 'api',
          loading: false,
        });
      } catch {
        if (alive) setState({ ...FALLBACK });
      } finally {
        clearTimeout(timeout);
      }
    })();

    return () => { alive = false; controller.abort(); clearTimeout(timeout); };
  }, []);

  return state;
};
