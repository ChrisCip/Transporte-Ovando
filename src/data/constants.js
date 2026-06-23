export const SERVICES_STORAGE_KEY = "transporte-ovando-services";

// ── Contacto y redes (fuente única de verdad) ───────────────────────────────
export const BRAND_NAME = "Transporte Turístico Ovando";
export const WHATSAPP_NUMBER = "18098016460";        // solo dígitos (wa.me)
export const WHATSAPP_DISPLAY = "+1 (809) 801-6460";  // formato para mostrar
export const PHONE_TEL = "+18098016460";              // href tel:
export const CONTACT_EMAIL = "reservas@ovando.com";

export const INSTAGRAM_URL = "https://www.instagram.com/transporteturisticoovando/";
export const INSTAGRAM_HANDLE = "@transporteturisticoovando";

// Reseñas Google.
// GOOGLE_REVIEWS_URL: link oficial del cliente (resuelve a la ficha en el navegador).
// GOOGLE_PLACE_ID: rellénalo para activar la API real (ver README). Vacío = solo fallback.
export const GOOGLE_REVIEWS_URL = "https://share.google/1Wi1PVM1HQkL6OwtR";
export const GOOGLE_PLACE_ID = "";
// Rating agregado de respaldo (se sobrescribe con el real cuando la API responde).
export const GOOGLE_RATING_FALLBACK = 4.9;
export const GOOGLE_REVIEWS_COUNT_FALLBACK = 127;

export const SERVICE_TYPES = {
  transfer: "Traslado",
  excursion: "Excursión",
  rental: "Alquiler"
};

export const AIRPORTS = [
  { code: "PUJ", label: "Aeropuerto Punta Cana (PUJ)" },
  { code: "SDQ", label: "Aeropuerto Las Américas (SDQ)" },
  { code: "STI", label: "Aeropuerto Cibao (STI)" },
  { code: "POP", label: "Aeropuerto Puerto Plata (POP)" },
  { code: "LRM", label: "Aeropuerto La Romana (LRM)" }
];

export const POPULAR_DESTINATIONS = [
  "Bávaro / Punta Cana",
  "Bayahíbe",
  "Uvero Alto / Macao",
  "Cap Cana",
  "Santo Domingo",
  "Samaná",
  "La Romana",
  "Puerto Plata"
];

export const AMENITY_CATALOG = {
  wifi: { label: "WiFi", icon: "Wifi" },
  ac: { label: "A/C", icon: "Snowflake" },
  water: { label: "Agua fría", icon: "GlassWater" },
  bilingual: { label: "Bilingüe", icon: "Languages" },
  childSeat: { label: "Silla bebé", icon: "Baby" },
  luggage: { label: "Equipaje XL", icon: "Luggage" },
  meetGreet: { label: "Meet & Greet", icon: "Hand" }
};

export const ICON_OPTIONS = [
  ["Car", "Coche"],
  ["Bus", "Bus"],
  ["Palmtree", "Palmera"],
  ["Crown", "VIP"],
  ["Users", "Grupo"],
  ["Map", "Mapa"],
  ["Plane", "Aeropuerto"],
  ["ShipWheel", "Tour"]
];

export const MOCK_IMAGE_OPTIONS = [
  { label: "Aeropuerto VIP", url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80" },
  { label: "Playa Caribe", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
  { label: "Vehículo familiar", url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80" },
  { label: "Tour privado", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" }
];

export const EMPTY_SERVICE = {
  name: "",
  type: "transfer",
  location: "",
  destination: "",
  description: "",
  price: "",
  paxLimit: "",
  icon: "Car",
  imageUrl: MOCK_IMAGE_OPTIONS[0].url,
  amenities: ["wifi", "ac"]
};

export const DEFAULT_SERVICES = [
  {
    id: "vip-airport-transfer",
    name: "Traslado VIP Aeropuerto",
    type: "transfer",
    location: "Aeropuerto Punta Cana (PUJ)",
    destination: "Hoteles Bávaro / Punta Cana",
    description: "Traslado privado en SUV premium con WiFi a bordo, agua fría y asistencia desde la terminal hasta tu hotel.",
    price: 75,
    paxLimit: 5,
    icon: "Crown",
    imageUrl: MOCK_IMAGE_OPTIONS[0].url,
    amenities: ["wifi", "ac", "water", "meetGreet", "bilingual"]
  },
  {
    id: "isla-saona-excursion",
    name: "Excursión Isla Saona",
    type: "excursion",
    location: "Bayahíbe",
    destination: "Isla Saona",
    description: "Día completo en catamarán y lancha rápida, con almuerzo buffet, bebidas y paradas en aguas cristalinas.",
    price: 85,
    paxLimit: 25,
    icon: "Palmtree",
    imageUrl: MOCK_IMAGE_OPTIONS[1].url,
    amenities: ["bilingual", "water"]
  },
  {
    id: "family-minivan",
    name: "Minivan Familiar",
    type: "transfer",
    location: "Aeropuerto Las Américas (SDQ)",
    destination: "Uvero Alto / Macao",
    description: "Vehículo amplio para equipaje y grupos familiares, con opción de silla para bebé bajo solicitud.",
    price: 60,
    paxLimit: 8,
    icon: "Users",
    imageUrl: MOCK_IMAGE_OPTIONS[2].url,
    amenities: ["wifi", "ac", "childSeat", "luggage"]
  }
];
