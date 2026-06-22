import { useEffect, useState } from 'react';
import { FALLBACK_INSTAGRAM } from '../data/instagramPosts';

// Intenta traer los últimos posts desde /api/instagram-feed (serverless con
// Instagram Graph API). Sin token / sin backend / error → fallback estático.
export const useInstagramFeed = (limit = 6) => {
  const [posts, setPosts] = useState(FALLBACK_INSTAGRAM.slice(0, limit));
  const [source, setSource] = useState('fallback');

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    (async () => {
      try {
        const res = await fetch('/api/instagram-feed', { signal: controller.signal });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        const items = Array.isArray(data.posts) ? data.posts.filter((p) => p && p.image) : [];
        if (alive && items.length > 0) {
          setPosts(items.slice(0, limit));
          setSource('api');
        }
      } catch {
        /* se queda el fallback */
      } finally {
        clearTimeout(timeout);
      }
    })();

    return () => { alive = false; controller.abort(); clearTimeout(timeout); };
  }, [limit]);

  return { posts, source };
};
