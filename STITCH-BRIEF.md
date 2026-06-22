# STITCH Design Brief — Transporte Turístico Ovando

> Brief completo para [Google Stitch](https://stitch.withgoogle.com). Basado en el repo actual y datos oficiales del negocio.

---

## Instrucción principal para Stitch

```
Diseña un sistema de UI completo (mobile-first + desktop) para una landing page
de transporte turístico premium en República Dominicana. Marca: "Transporte
Turístico Ovando". Estilo: "Caribe líquido" — cinematográfico, inmersivo,
confiable, moderno, con sensación de agua, luz tropical y movimiento fluido.

Genera:
1) Homepage completa (scroll largo, 8 secciones)
2) Variante mobile (375px) y desktop (1440px) de cada sección clave
3) Componentes reutilizables (design system)
4) Modal de reserva
5) Panel admin (login + dashboard)
6) Estados: hover, active, loading, empty

Idioma: ESPAÑOL en todo el copy.
No uses estética genérica de template turístico. Debe sentirse boutique premium
como Blacklane + Airbnb Experiences + identidad caribeña auténtica.
```

---

## 1. Contexto del proyecto

| Campo | Valor |
|--------|--------|
| **Producto** | Landing de reservas para empresa de transporte turístico |
| **Mercado** | Turistas internacionales y locales en RD (Punta Cana, Bávaro, Saona, Cap Cana, SDQ, Samaná) |
| **Objetivo** | Convertir visitas en cotizaciones y reservas (WhatsApp, formulario, email) |
| **Plataforma** | Web responsive (320px → 1536px), SPA React |
| **Tono de marca** | Premium, cálido, confiable, bilingüe, 24/7, "Caribe Premium" |

### Datos oficiales del cliente

| Campo | Valor |
|--------|--------|
| WhatsApp (display) | +1 (809) 801-6460 |
| WhatsApp (wa.me) | `18098016460` |
| Instagram | https://www.instagram.com/transporteturisticoovando/ |
| Handle Instagram | `@transporteturisticoovando` |
| Google reseñas | https://share.google/1Wi1PVM1HQkL6OwtR |
| Email | reservas@ovando.com |
| Rating Google | 4.9 / 5 · 127+ reseñas |
| Tagline secundario | Caribe Premium |

---

## 2. Dirección creativa — "Caribe líquido"

**Concepto visual:** El usuario aterriza en RD. El hero es inmersivo (video/imagen de costa, aeropuerto, SUV). El agua conecta secciones con **olas SVG** y transiciones onduladas. Glassmorphism sobre media oscura. Acentos **amber** (sol/Caribe) sobre base **cyan/teal** (mar). Partículas sutiles tipo espuma en hero.

**Referencias de mood (no copiar):**

- Luxury airport transfer apps
- Resort boutique caribeño
- Apple product pages (claridad tipográfica)
- National Geographic travel (fotografía hero)

**Evitar:**

- Gradientes naranja/amber en texto largo (especialmente en "Nosotros te llevamos")
- Stock photos genéricas de autobuses escolares
- Layouts planos sin profundidad
- Widgets embebidos feos de Google/Instagram
- Demasiados colores saturados compitiendo

### Tratamiento tipográfico del headline (CRÍTICO)

```
Línea 1: "El Caribe te espera." → blanco sólido, Outfit Bold
Línea 2: "Nosotros te llevamos." → blanco + palabra "llevamos" en amber-300 SÓLIDO
         (NO gradiente) + subrayado ondulado SVG cyan (#22d3ee) debajo de "llevamos"
```

---

## 3. Sistema de diseño

### 3.1 Paleta de colores

| Token | Hex | Uso |
|--------|-----|-----|
| `ocean-950` | `#082f49` | Scrim hero, footer profundo |
| `ocean-900` | `#0c4a6e` | Hero gradient start, admin |
| `ocean-700` | `#0e7490` | Gradientes, modal header |
| `ocean-500` | `#06b6d4` | Acentos, links hover |
| `cyan-400` | `#22d3ee` | Subrayado hero, chips, focus rings |
| `amber-500` | `#f59e0b` | CTAs primarios, badges, estrellas |
| `amber-300` | `#fcd34d` | Acento palabra "llevamos", iconos trust |
| `emerald-500` | `#10b981` | WhatsApp FAB y pill |
| `slate-50` | `#f8fafc` | Fondo secciones claras |
| `slate-900` | `#0f172a` | Texto oscuro, footer base |
| `white/70` | glass | Cards glassmorphism |

**Gradientes clave:**

- Hero scrim: cyan radial arriba-derecha + amber radial abajo-izquierda sobre overlay `#082f49` 55% opacity
- Footer: gradiente oceánico animado `#082f49 → #0c4a6e → #0e7490 → #0891b2`
- Instagram CTA: `#f58529 → #dd2a7b → #8134af → #515bd4`

### 3.2 Tipografía

| Rol | Fuente | Pesos | Uso |
|-----|--------|-------|-----|
| **Display** | **Outfit** | 700–900 | H1, H2, precios grandes |
| **Body** | **Inter** | 400–600 | Párrafos, labels, nav |
| **Mono** | JetBrains Mono | 400–500 | Códigos aeropuerto (opcional) |

**Escala fluida (clamp):**

- H1 hero: `clamp(2.25rem, 5vw + 1rem, 4.5rem)` · line-height 1.05
- H2 sección: `clamp(1.875rem, 4vw + 1rem, 3rem)`
- Body: 16px mobile → 18px desktop
- Labels form: 12px uppercase tracking-widest
- Precio en card: 24–32px Outfit Bold

### 3.3 Espaciado y grid

- Contenedor max: **1280px** (`max-w-7xl`), padding horizontal **16px mobile / 24px desktop**
- Secciones: **py-16 mobile / py-24 desktop**
- Border radius: cards **24px**, botones **9999px (pill)**, inputs **12px**, modal **24px top mobile / all desktop**
- Grid servicios: **1 col mobile → 2 tablet → 3 desktop**, gap 24–32px
- Touch targets mínimo: **44×44px**

### 3.4 Sombras y efectos

- Card: `0 12px 40px -12px rgba(8,47,73,0.18)` + inset highlight
- Float (strip cards): sombra profunda azul
- Glow amber en botón primario: `0 0 40px rgba(245,158,11,0.35)`
- Glass: `backdrop-blur-md`, border `white/40`, bg `white/70`

### 3.5 Componentes base (design system)

Diseñar como componentes reutilizables:

1. **Button Primary** — amber-500, pill, icono derecha, shine hover diagonal
2. **Button Ghost** — white/80, border slate-200
3. **Button Dark** — slate-900 → cyan-600 hover (reservar en card)
4. **Chip Amenity** — cyan-50 bg, cyan-700 text, icon 12px
5. **Glass Card** — blur + border sutil
6. **Field Input** — icono izquierda, padding-left 44px, focus ring cyan
7. **Filter Pill** — inactive white / active slate-900 filled
8. **Badge Type** — amber-500 "TRASLADO" uppercase tiny
9. **Trust Pill** — white/15 glass en hero
10. **Review Card** — glass dark sobre fondo oceánico
11. **Instagram Tile** — square, hover scale + gradient overlay
12. **WhatsApp FAB** — emerald circle 56–64px, ping animation, tooltip "¿Hablamos?"
13. **Wave Divider** — SVG 3 capas animadas, transición hero→contenido
14. **Toast** — bottom center, dark glass, 4.5s

---

## 4. Arquitectura de página (orden de scroll)

```
┌─────────────────────────────────────┐
│  HEADER (fixed, transparent→glass)│
├─────────────────────────────────────┤
│  ① HERO (#inicio)                   │
│     video bg + quote widget         │
├─ wave divider ─────────────────────┤
│  ② EXPERIENCE STRIP (#experiencias) │
│     carousel horizontal rutas       │
├─────────────────────────────────────┤
│  ③ GOOGLE REVIEWS (#reseñas)        │
│     fondo oceánico animado          │
├─────────────────────────────────────┤
│  ④ SERVICES / FLOTA (#servicios)    │
│     filtros + grid cards            │
├─────────────────────────────────────┤
│  ⑤ INSTAGRAM (#instagram)           │
│     grid 2×3 + CTA gradiente        │
├─ wave divider ─────────────────────┤
│  ⑥ FOOTER (#contacto)               │
│     video mar tenue + 3 columnas    │
└─────────────────────────────────────┘
     [WhatsApp FAB fixed bottom-right]
     [Booking Modal overlay cuando activo]
```

**Nav header:** Inicio · Experiencias · Reseñas · Flota · Contacto · [icon Instagram] · Admin

---

## 5. Secciones — especificación detallada

### 5.1 Header (fixed)

**Estado A — sobre hero (top):**

- Fondo transparente
- Logo + texto blanco
- Links nav blanco/90

**Estado B — scrolled (>20px):**

- Barra glass white/80, blur, shadow, rounded-2xl compacta
- Logo 56–64px con fondo blanco
- Texto slate-900, links slate-700, hover cyan-600
- Instagram icon circle hover pink

**Mobile:** hamburger → drawer glass con links + Instagram + Admin cyan filled

**Logo:** imagen cuadrada redondeada `TransporteLogo.png`, tagline "Caribe Premium" 10px uppercase cyan

---

### 5.2 Hero — pantalla completa (100svh)

**Fondo (capas z-index):**

1. Video/imagen rotativa full-bleed (aeropuerto, playa, Saona, Cap Cana) con Ken Burns lento
2. Scrim oceánico legible
3. Partículas espuma sutiles (puntos blancos/cyan flotando)
4. Grain overlay 5% opacity

**Layout desktop:** grid 12 cols — contenido 7 cols izquierda, QuoteWidget 5 cols derecha  
**Layout mobile:** stack vertical, texto centrado, widget abajo

**Contenido izquierdo:**

- Badge pill: dot amber pulse + "#1 en traslados turísticos · Rep. Dominicana"
- H1 (ver sección tipografía arriba)
- Subtítulo cyan-50: "Traslados privados, excursiones premium y alquiler de vehículos con chofer bilingüe. Servicio puerta a puerta 24/7."
- CTAs: `[Ver flota →]` primary amber · `[📞 Hablar con un asesor]` ghost glass
- Trust row: Choferes certificados · 4.9/5 Google (link) · 24/7
- Social pills row: `[Google]` `[Instagram]` `[WhatsApp +1 (809) 801-6460]` emerald

**QuoteWidget (glass card derecha):**

- Título: "Cotiza tu traslado" + icono Sparkles en cuadrado cyan
- Badge verde: "Respuesta < 5 min"
- Campos 2×2 grid:
  - Origen: select aeropuertos (PUJ, SDQ, STI, POP, LRM)
  - Destino: input + sugerencias (Bávaro, Bayahíbe, Uvero Alto, Cap Cana, SD, Samaná, La Romana, Puerto Plata)
  - Fecha: date picker
  - Pasajeros: number 1–50
- Submit full-width amber pulse: "Ver opciones disponibles"
- Footer note: "Sin cargos por reserva. Pago al chofer."

**Base hero:** WaveDivider blanco hacia `#f8fafc`

---

### 5.3 Experience Strip (#experiencias)

**Fondo:** blanco

**Header sección:**

- Eyebrow cyan: "RUTAS Y EXPERIENCIAS"
- H2: "Del avión al **paraíso**" (paraíso en cyan)
- Sub: "Desliza para descubrir nuestros destinos más solicitados en el Caribe dominicano."
- Flechas nav circulares (desktop)

**Carousel horizontal scroll-snap** — 6 tarjetas:

| Tarjeta | Meta | Label |
|---------|------|-------|
| 1 | 25 min · Traslado privado | PUJ → Bávaro |
| 2 | Día completo · Catamarán | Isla Saona |
| 3 | Marina & golf · VIP | Cap Cana |
| 4 | Ballenas · Los Haitises | Samaná |
| 5 | 2 h 15 · Minivan familiar | SDQ → Uvero Alto |
| 6 | Zona Colonial · City tour | Santo Domingo |

**Card design:** aspect 4/5 mobile, 16/10 desktop, rounded-3xl, imagen cover, gradient bottom dark, meta tiny uppercase cyan, título Outfit 2xl blanco, play icon top-right on hover, arrow slide-in on hover

---

### 5.4 Google Reviews (#reseñas)

**Fondo:** banda oceánica animada (gradient pan) + overlay slate-950/30 — **contraste alto, texto blanco**

**Header centrado:**

- Eyebrow: logo Google G + "RESEÑAS VERIFICADAS DE GOOGLE"
- H2: "Lo que dicen nuestros viajeros"
- Score block glass: **4.9** grande + 5 estrellas amber + "Basado en 127+ reseñas"

**Carousel horizontal** — 6–8 review cards glass:

- Avatar circular (inicial o foto)
- Nombre + fecha relativa ("hace 2 semanas")
- Logo Google G pequeño
- 5 estrellas
- Texto 3–5 líneas clamp
- Card width: ~82vw mobile, 20–22rem desktop

**CTAs centrados:**

- Primary amber: "Ver todas las reseñas en Google"
- Ghost glass: "Déjanos tu reseña"

**Ejemplo copy reseñas:**

- "Excelente servicio desde PUJ hasta nuestro resort en Bávaro. Puntual, van impecable, chofer muy amable."
- "Best transfer in Punta Cana! Meet & greet was perfect."
- "Llevamos toda la familia con sillas para niños. Muy profesionales."

---

### 5.5 Services / Flota (#servicios)

**Fondo:** slate-50 + blob cyan blur decorativo centro-arriba

**Header centrado:**

- Eyebrow: "FLOTA PREMIUM"
- H2: "Servicios para cada **aventura**"
- Sub párrafo slate-600

**Filter pills:** Todos | Traslado | Excursión | Alquiler — morph animado pill activo slate-900

**Grid 3 servicios default (card template reutilizable):**

**Card anatomy:**

- Imagen top aspect 4/3 con hover zoom + tilt 3D sutil
- Overlay gradient bottom
- Icon glass top-left (Crown / Palmtree / Users)
- Badge amber top-right: "TRASLADO" / "EXCURSIÓN"
- Precio bottom-left: "Desde **$75**" Outfit 2xl
- Pax badge bottom-right: "hasta 5 pax"
- Body padding 24px:
  - Título H3
  - Descripción 3 líneas
  - Origen + Destino
  - Chips: WiFi, A/C, Agua, Bilingüe, Meet & Greet, etc.
  - Botón full: "Reservar ahora →" slate-900 → cyan hover

**Servicios:**

1. Traslado VIP Aeropuerto — $75 — PUJ → Bávaro — SUV premium
2. Excursión Isla Saona — $85 — Bayahíbe → Saona
3. Minivan Familiar — $60 — SDQ → Uvero Alto

**Empty state:** icon SearchX + "No hay servicios en esta categoría aún."

---

### 5.6 Instagram (#instagram)

**Fondo:** blanco + blobs pink/amber blur esquinas

**Header flex row:**

- Izquierda: eyebrow pink "SÍGUENOS EN INSTAGRAM" · H2 "El Caribe en **tiempo real**" · `@transporteturisticoovando` link
- Derecha: botón gradiente Instagram "Seguir @ovando"

**Grid:** 2 cols mobile → 3 tablet → 6 desktop  
6 tiles cuadrados: fotos turismo RD (playa, van, aeropuerto, Saona, atardecer, grupo)  
Hover: scale 110%, overlay gradient, icono Instagram centro

---

### 5.7 Footer (#contacto)

**Transición:** WaveDivider slate-900 desde sección clara

**Fondo:** slate-900 + video mar loop opacity 15% + gradiente oceánico animado + blobs cyan/amber

**Grid 3 columnas (stack mobile):**

**Col 1 — Marca:** logo 56px, "Transporte Ovando", "Caribe Premium", descripción corta

**Col 2 — Enlaces:** Inicio, Experiencias, Flota, Admin

**Col 3 — Contacto:**

- WhatsApp 24/7 (emerald icon)
- +1 (809) 801-6460
- reservas@ovando.com
- Instagram @transporteturisticoovando

**Bottom bar:** © 2026 · link "Acceso administrador" con lock icon

---

### 5.8 WhatsApp FAB (global)

Fixed bottom-right, safe-area aware  
Círculo emerald 56px, icon MessageCircle, ring white, ping animation  
Desktop hover: tooltip glass "¿Hablamos?"

---

### 5.9 Booking Modal (overlay)

**Mobile:** bottom sheet rounded-t-3xl, max-height 92vh  
**Desktop:** centered card max-w-lg rounded-3xl

**Header gradient cyan→slate:**

- Badge "RESERVA PREMIUM"
- Nombre servicio H3
- "Confirmación en menos de 5 minutos" ✓ emerald
- X close top-right

**Form (slate-50 bg):**

- Nombre completo *
- Teléfono / WhatsApp *
- Origen * | Destino * (grid 2 col)
- Fecha * | Pasajeros *
- Submit sticky bottom: "Confirmar reserva" amber full-width

**Backdrop:** blur + rgba(8,47,73,0.55)

---

### 5.10 Admin Panel (#admin — pantalla separada)

**Login:** fondo admin-gradient, card glass centrada, lock icon cyan, input password, btn primary, link volver

**Dashboard autenticado:**

- Header sticky dark cyan gradient: "Administración · Transporte Ovando"
- Split: formulario crear/editar servicio (izq) + lista cards servicios con edit/delete (der)
- Botón "Restaurar servicios por defecto"

*(Diseño funcional limpio, coherente con tokens pero menos cinematográfico)*

---

## 6. Fotografía y media

**Hero / Strip — temática obligatoria:**

- Aeropuerto Punta Cana / recepción VIP / maletas
- Carretera costera con palmeras y mar turquesa
- Catamarán / Isla Saona / aguas cristalinas
- SUV negro premium / van familiar
- Atardecer Caribe, Cap Cana marina
- Zona Colonial Santo Domingo (opcional)

**Estilo foto:** golden hour, saturación natural, personas diversas felices (stock premium), sin watermarks

**Tratamiento:** siempre scrim/gradient para legibilidad de texto blanco encima

---

## 7. Responsive — breakpoints a diseñar

| Breakpoint | Ancho | Prioridad |
|------------|-------|-----------|
| Mobile S | 320px | Hero h1 no overflow, quote widget full width |
| Mobile | 375px | **Frame principal mobile** |
| Tablet | 768px | 2 col servicios, nav visible |
| Desktop | 1024px | Hero 2 columnas |
| Wide | 1440px | **Frame principal desktop** |

**Reglas mobile:**

- Carousels: scroll horizontal snap, peek next card 12%
- Modal: bottom sheet
- Header: hamburger
- FAB no tapa CTAs (safe-area)
- Inputs min-height 48px

---

## 8. Micro-interacciones (prototipo)

- Hero text: stagger fade-up 120ms entre elementos
- Cards servicios: tilt 3D + parallax imagen on hover (desktop)
- Botones primary: shine diagonal on hover + lift -2px
- Filter pills: layout morph entre activo/inactivo
- Section reveals: fade-up on scroll into view
- Wave SVG: drift horizontal infinite 3 velocidades
- Reduced motion variant: static posters, no tilt, no ping

---

## 9. Copy completo (usar literalmente)

```
HEADER NAV: Inicio | Experiencias | Reseñas | Flota | Contacto | Admin

HERO BADGE: #1 en traslados turísticos · Rep. Dominicana
HERO H1 L1: El Caribe te espera.
HERO H1 L2: Nosotros te llevamos.
HERO SUB: Traslados privados, excursiones premium y alquiler de vehículos con chofer bilingüe. Servicio puerta a puerta 24/7.
CTA1: Ver flota
CTA2: Hablar con un asesor
TRUST: Choferes certificados | 4.9 / 5 en Google | Disponible 24/7

QUOTE: Cotiza tu traslado | Respuesta < 5 min | Ver opciones disponibles
QUOTE NOTE: Sin cargos por reserva. Pago al chofer.

EXPERIENCES: Rutas y experiencias | Del avión al paraíso

REVIEWS: Lo que dicen nuestros viajeros | Ver todas las reseñas en Google | Déjanos tu reseña

SERVICES: Flota premium | Servicios para cada aventura
FILTERS: Todos | Traslado | Excursión | Alquiler
BTN CARD: Reservar ahora

INSTAGRAM: El Caribe en tiempo real | Seguir @ovando

FOOTER: Las mejores experiencias de transporte en el Caribe dominicano. Viaja seguro, viaja con Ovando.
© 2026 Transporte Turístico Ovando. Todos los derechos reservados.

MODAL: Reserva premium | Confirmación en menos de 5 minutos | Confirmar reserva
WHATSAPP FAB: ¿Hablamos?
```

---

## 10. Entregables esperados de Stitch

1. **Homepage desktop 1440px** — scroll completo o frames por sección
2. **Homepage mobile 375px** — mismas secciones
3. **Design system page** — colores, tipografía, botones, inputs, chips, cards
4. **Component states** — header scrolled vs transparent, filter active, card hover
5. **Booking modal** — mobile bottom sheet + desktop centered
6. **Admin login + dashboard** — pantallas secundarias
7. **Dark section** (Google Reviews) + **Light sections** contraste claro
8. **Specs anotadas** — spacing, font sizes, hex colors en cada componente

---

## 11. Prompt corto (límite de caracteres en Stitch)

```
Premium Caribbean tourism landing "Transporte Turístico Ovando" (Dominican Republic airport transfers & excursions). Mobile-first + 1440px desktop. Style: "liquid Caribbean" — cinematic full-screen hero with video/water waves, glassmorphism, ocean cyan (#0c4a6e–#06b6d4) + amber CTAs (#f59e0b), Outfit display + Inter body. Sections: fixed glass header, immersive hero with quote widget, horizontal experience carousel (PUJ→Bávaro, Saona, Cap Cana), Google reviews band (4.9 stars, glass cards on animated ocean bg), service cards grid with filters (Transfer/Excursion/Rental), Instagram 6-tile grid with gradient follow button, deep footer with contact. WhatsApp +1 (809) 801-6460 FAB. Headline "El Caribe te espera. Nosotros te llevamos." — white text, "llevamos" in solid amber with cyan wave underline (NO orange gradient text). Spanish copy. Premium boutique feel, not generic template. Include booking modal and admin panel. Annotated design system.
```

---

## 12. Después de Stitch

1. Exporta frames PNG/SVG por sección desde Stitch.
2. Pásale los diseños a Claude Code con: *"Implementa fielmente estos frames de Stitch en el repo React existente"*.
3. Usa los tokens de color/tipo de este documento como fuente de verdad si hay diferencias menores.

---

## Referencia — implementación actual en repo

Este brief refleja la app en:

- `src/App.jsx` — orden de secciones
- `src/data/constants.js` — contacto, servicios, aeropuertos
- `src/data/media.js` — videos e imágenes hero/strip/footer
- `src/index.css` + `tailwind.config.js` — tokens visuales
- Componentes: `Hero`, `ExperienceStrip`, `GoogleReviews`, `ServicesList`, `InstagramSection`, `Footer`, `BookingModal`, `AdminPanel`
