# Transporte Ovando — Landing "Caribe líquido"

Landing cinematográfica de transporte turístico premium en el Caribe dominicano.
React 18 + Vite + Tailwind + lucide-react.

## Scripts
```bash
npm install
npm run dev      # desarrollo
npm run build    # producción → dist/
npm run preview  # previsualizar build
```

## Dependencias añadidas en este rediseño
| Paquete | Por qué |
|---|---|
| **framer-motion** | Transiciones, stagger del hero, reveals al scroll (`whileInView`), morph del filtro (`layoutId`), tilt/parallax de las cards, `AnimatePresence` en el modal/listas y `useReducedMotion` integrado. Máxima calidad con una sola dependencia y buena mantenibilidad. |

### Por qué NO se añadió 3D / otras libs
- **three / @react-three/fiber**: descartado por LCP y fiabilidad de build en Vercel. El "agua" se logra con **SVG animado por capas** (`WaveDivider`) + **partículas de espuma en canvas 2D** (`FoamParticles`) → mismo efecto inmersivo, sin riesgo WebGL y con fallback automático.
- **lenis / smooth-scroll**: descartado para no secuestrar el scroll por anclas (`#admin`, `#servicios`) existente. Se usa el `scroll-behavior: smooth` nativo.

## Dirección visual "Caribe líquido"
- **Hero a pantalla completa** (`HeroMedia`): rota 2–4 slides con **crossfade** + **Ken Burns**; reproduce el **vídeo** del slide encima cuando carga, con scrim oceánico legible, **partículas de espuma** y **olas SVG** en la base.
- **ExperienceStrip**: carrusel horizontal con `scroll-snap`, vídeo al hover y flechas. Rutas tipo "PUJ → Bávaro", "Isla Saona", "Cap Cana".
- **Cards de servicios**: tilt 3D + parallax de imagen al ratón, morph animado del filtro, `shine` en botones.
- **Footer**: profundidad con gradiente oceánico animado + mar tenue en bucle + transición ondulada.

## Vídeos — cómo activarlos
Todo el media está centralizado en [`src/data/media.js`](src/data/media.js) (`HERO_VIDEOS`, `STRIP_CLIPS`, `FOOTER_MEDIA`), cada uno con `src`, `poster` y `label`.

**Out of the box** la landing ya luce: muestra los *posters* (Unsplash, formato webp) con Ken Burns + crossfade, sin estado roto.

Para añadir vídeo real:
1. Suelta los `.mp4` en `public/videos/` con los nombres referenciados en `media.js`
   (`airport.mp4`, `coast.mp4`, `saona.mp4`, `capcana.mp4`, `puj-bavaro.mp4`, …).
2. (Opcional) sustituye los `poster` por imágenes propias de RD en `public/posters/`.

Los vídeos se reproducen `muted` + `playsInline` + `loop`; si un `.mp4` falta o falla, se queda el poster automáticamente.

## Reseñas de Google
Sección `#reseñas` ([`GoogleReviews.jsx`](src/components/GoogleReviews.jsx)) con rating agregado, carrusel de cards y CTA a Google. **Enfoque híbrido — siempre se ve bien:**

- **Manual (por defecto, sin configuración):** edita [`src/data/googleReviews.js`](src/data/googleReviews.js) (`FALLBACK_REVIEWS`). Copia nombre/estrellas/texto desde tu ficha de Google. El rating/total de respaldo está en [`constants.js`](src/data/constants.js) (`GOOGLE_RATING_FALLBACK`, `GOOGLE_REVIEWS_COUNT_FALLBACK`).
- **API real (opcional):** la función serverless [`api/google-reviews.js`](api/google-reviews.js) llama a **Google Places API (New)** con field mask `displayName,rating,userRatingCount,reviews` y cachea 1 h en el CDN de Vercel. Activa con `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (ver `.env.example`). La key **nunca** llega al cliente. El hook [`useGoogleReviews.js`](src/hooks/useGoogleReviews.js) usa la API si responde y, si falla o no hay env, cae al fallback sin romper la UI.

`GOOGLE_REVIEWS_URL` en `constants.js` es el link oficial del cliente (`share.google/…`) para "Ver todas las reseñas". **Pendiente del cliente:** rellenar `GOOGLE_PLACE_ID` (resuelve el link share en un navegador y copia el Place ID) para activar datos reales.

## Instagram
Sección `#instagram` ([`InstagramSection.jsx`](src/components/InstagramSection.jsx)): grid 2×2 móvil / 6 desktop + icono en Header (desktop y menú móvil) + fila de redes en el Hero + handle en el Footer.

- **Estático (por defecto):** fotos en [`src/data/instagramPosts.js`](src/data/instagramPosts.js) (placeholders de turismo RD). Sustitúyelas por fotos reales del cliente.
- **Feed automático (opcional):** [`api/instagram-feed.js`](api/instagram-feed.js) usa **Instagram Graph API** con `INSTAGRAM_ACCESS_TOKEN` (cuenta Business/Creator, token server-only — sin prefijo `VITE_`). El hook [`useInstagramFeed.js`](src/hooks/useInstagramFeed.js) cae al estático si no hay token.

## Contacto centralizado
Toda la info de contacto/redes vive en [`constants.js`](src/data/constants.js) (`WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`, `PHONE_TEL`, `CONTACT_EMAIL`, `INSTAGRAM_URL`, `INSTAGRAM_HANDLE`). Hero, Footer, WhatsAppFab y Header consumen las constantes (DRY).

## Checklist de prueba manual
- [ ] **Móvil (320/375/390):** sin scroll horizontal; Hero h1 no desborda; reseñas e Instagram en scroll/grid; FAB de WhatsApp no tapa CTAs (safe-area).
- [ ] **Tablet (768):** grids reflowean; flechas de carruseles ≥44px.
- [ ] **Desktop (1024/1280/1536):** reviews 3 visibles, Instagram 6 col, nav con icono IG alineado.
- [ ] **Sin API:** reseñas e Instagram muestran datos de respaldo (estado normal).
- [ ] **Con API simulada:** define las env y comprueba que `source: 'api'` (banner "Actualizado en tiempo real desde Google").
- [ ] **`prefers-reduced-motion`:** sin Ken Burns/partículas/tilt; animaciones reducidas.
- [ ] **CTA Google** abre la ficha real en pestaña nueva; badge "4.9 / 5" del Hero lleva a `#reseñas`.
- [ ] **Reserva** (BookingModal) sigue abriendo mailto; teclado virtual no oculta el botón enviar.

## Accesibilidad y rendimiento
- **Poster-first** → LCP estable; los vídeos son `preload` diferido y decorativos (`aria-hidden`).
- **`prefers-reduced-motion`**: sin Ken Burns, sin rotación de hero, sin partículas, sin tilt; animaciones reducidas vía guard global en `index.css`.
- Texto legible sobre media (`media-scrim`, `text-shadow-ocean`); controles con `aria-label` / `aria-pressed`.
- Las partículas canvas se pausan con la pestaña oculta.

## Intacto (lógica de negocio)
State de `App.jsx`, `AdminPanel`, `BookingModal`, `localStorage` de servicios, hash `#admin`,
reservas por `mailto`, `WhatsAppFab`, `constants.js` y `helpers.js` no se rompieron (solo se extendieron datos/UI).
