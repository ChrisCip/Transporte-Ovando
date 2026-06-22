import { INSTAGRAM_URL } from './constants';

// Posts destacados de respaldo (placeholders de turismo RD).
// Sustituye `image` por fotos reales del cliente y `permalink` por el enlace
// directo al post cuando estén disponibles. Forma normalizada idéntica a la
// que devuelve el feed de Instagram Graph API.
const u = (id, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const FALLBACK_INSTAGRAM = [
  { id: 'ig1', image: u('photo-1559827260-dc66d52bef19'), alt: 'Excursión en catamarán a Isla Saona', permalink: INSTAGRAM_URL },
  { id: 'ig2', image: u('photo-1544620347-c4fd4a3d5957'), alt: 'Traslado VIP en SUV desde el aeropuerto', permalink: INSTAGRAM_URL },
  { id: 'ig3', image: u('photo-1507525428034-b723cf961d3e'), alt: 'Playa caribeña de aguas turquesas', permalink: INSTAGRAM_URL },
  { id: 'ig4', image: u('photo-1505228395891-9a51e7e86bf6'), alt: 'Atardecer en Cap Cana', permalink: INSTAGRAM_URL },
  { id: 'ig5', image: u('photo-1518105779142-d975f22f1b0a'), alt: 'Palmeras y costa de Punta Cana', permalink: INSTAGRAM_URL },
  { id: 'ig6', image: u('photo-1518638150340-f706e86654de'), alt: 'Tour por la Zona Colonial de Santo Domingo', permalink: INSTAGRAM_URL },
];
