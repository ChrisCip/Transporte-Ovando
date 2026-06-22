// Vercel Serverless Function — feed de Instagram (Graph API).
// El token vive SOLO en el servidor (NO usar prefijo VITE_, que lo expondría
// en el bundle del cliente).
//
// Variable de entorno:
//   INSTAGRAM_ACCESS_TOKEN   token long-lived de una cuenta Business/Creator
//
// Sin token → responde { posts: [] } y el frontend usa el fallback estático.

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return res.status(200).json({ posts: [], source: 'unconfigured' });
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink';
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${token}`;
    const resp = await fetch(url);
    if (!resp.ok) return res.status(200).json({ posts: [], source: 'error' });

    const data = await resp.json();
    const posts = (data.data || [])
      .filter((m) => m.media_type !== 'VIDEO' || m.thumbnail_url)
      .map((m) => ({
        id: m.id,
        image: m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url,
        alt: (m.caption || 'Publicación de Instagram').slice(0, 120),
        permalink: m.permalink,
      }));

    return res.status(200).json({ posts, source: 'api' });
  } catch {
    return res.status(200).json({ posts: [], source: 'error' });
  }
}
