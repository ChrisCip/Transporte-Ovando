// ─────────────────────────────────────────────────────────────────────────────
// MEDIA CENTRALIZADO · Transporte Ovando
// Cada slide/clip define: src (vídeo opcional), poster (imagen LCP) y label.
//
// Funcionamiento progresivo:
//  1. Sin ficheros de vídeo → se muestran los posters con efecto Ken Burns +
//     crossfade (ya se ve cinematográfico, sin estado roto).
//  2. El propietario suelta sus .mp4 en /public/videos y .webp en /public/posters;
//     `src` se reproduce encima del poster automáticamente.
//
// Los posters por defecto usan Unsplash (auto=format → sirve webp) para que la
// landing luzca de inmediato. Sustitúyelos por media propia de RD cuando esté.
// ─────────────────────────────────────────────────────────────────────────────

const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Vídeos del hero (rotación con crossfade). `src` puede ser "" hasta tener el mp4.
export const HERO_VIDEOS = [
  {
    id: 'airport',
    src: '/videos/airport.mp4',
    poster: unsplash('photo-1544620347-c4fd4a3d5957'),
    label: 'Traslado aeropuerto',
    caption: 'Recepción Meet & Greet en PUJ',
  },
  {
    id: 'coast',
    src: '/videos/coast.mp4',
    poster: unsplash('photo-1507525428034-b723cf961d3e'),
    label: 'Costa caribeña',
    caption: 'Ruta panorámica hacia Bávaro',
  },
  {
    id: 'saona',
    src: '/videos/saona.mp4',
    poster: unsplash('photo-1559827260-dc66d52bef19'),
    label: 'Isla Saona',
    caption: 'Excursión en catamarán',
  },
  {
    id: 'capcana',
    src: '/videos/capcana.mp4',
    poster: unsplash('photo-1505228395891-9a51e7e86bf6'),
    label: 'Cap Cana',
    caption: 'SUV premium puerta a puerta',
  },
];

// Tira horizontal de experiencias (scroll-snap). Vídeos cortos opcionales.
export const STRIP_CLIPS = [
  {
    id: 'puj-bavaro',
    src: '/videos/puj-bavaro.mp4',
    poster: unsplash('photo-1583244532610-2a234e7c3aff', 900),
    label: 'PUJ → Bávaro',
    meta: '25 min · Traslado privado',
  },
  {
    id: 'saona',
    src: '/videos/saona.mp4',
    poster: unsplash('photo-1559827260-dc66d52bef19', 900),
    label: 'Isla Saona',
    meta: 'Día completo · Catamarán',
  },
  {
    id: 'capcana',
    src: '/videos/capcana.mp4',
    poster: unsplash('photo-1505228395891-9a51e7e86bf6', 900),
    label: 'Cap Cana',
    meta: 'Marina & golf · VIP',
  },
  {
    id: 'samana',
    src: '/videos/samana.mp4',
    poster: unsplash('photo-1518105779142-d975f22f1b0a', 900),
    label: 'Samaná',
    meta: 'Ballenas · Los Haitises',
  },
  {
    id: 'sdq-uvero',
    src: '/videos/sdq-uvero.mp4',
    poster: unsplash('photo-1549317661-bd32c8ce0db2', 900),
    label: 'SDQ → Uvero Alto',
    meta: '2 h 15 · Minivan familiar',
  },
  {
    id: 'santo-domingo',
    src: '/videos/santo-domingo.mp4',
    poster: unsplash('photo-1518638150340-f706e86654de', 900),
    label: 'Santo Domingo',
    meta: 'Zona Colonial · City tour',
  },
];

// Fondo tenue del footer (mar en bucle). Cae a gradiente animado si no hay mp4.
export const FOOTER_MEDIA = {
  src: '/videos/coast.mp4',
  poster: unsplash('photo-1507525428034-b723cf961d3e'),
};
