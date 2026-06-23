export const SERVICES_STORAGE_KEY = "transporte-ovando-services-v2";

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

export const VEHICLE_IMAGES = {
  tahoeChauffeur: "/vehiculos/tahoe-chauffeur.jpg",
  tahoeUrban: "/vehiculos/tahoe-urbano.jpg",
  tahoeLights: "/vehiculos/tahoe-luces.jpg",
  minivanPremium: "/vehiculos/minivan-premium.jpg",
  vanInterior: "/vehiculos/van-interior.jpg",
  executiveInterior: "/vehiculos/interior-ejecutivo.jpg"
};

export const DESTINATION_IMAGES = {
  samanaPalm: "/destinos/samana-palmera.jpg",
  playitaSamana: "/destinos/playita-samana.jpg",
  frontonCove: "/destinos/fronton-cala.jpg",
  coastAerial: "/destinos/costa-aerea.jpg",
  playaLancha: "/destinos/playa-lancha.jpg",
  playaPalmeras: "/destinos/playa-palmeras.jpg",
  playaRincon: "/destinos/playa-rincon-aerea.jpg",
  saonaBeach: "/destinos/saona-banistas.jpg",
  saonaDonaEstela: "/destinos/saona-dona-estela.jpg"
};

export const MOCK_IMAGE_OPTIONS = [
  { label: "Tahoe + chofer", url: VEHICLE_IMAGES.tahoeChauffeur },
  { label: "SUV ejecutivo", url: VEHICLE_IMAGES.tahoeUrban },
  { label: "Minivan premium", url: VEHICLE_IMAGES.minivanPremium },
  { label: "Interior van", url: VEHICLE_IMAGES.vanInterior },
  { label: "Isla Saona", url: DESTINATION_IMAGES.playaLancha },
  { label: "Samaná", url: DESTINATION_IMAGES.samanaPalm },
  { label: "Playa Rincón", url: DESTINATION_IMAGES.playaRincon },
  { label: "Costa aérea", url: DESTINATION_IMAGES.coastAerial }
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
  imageUrl: VEHICLE_IMAGES.tahoeChauffeur,
  amenities: ["wifi", "ac"]
};

export const DEFAULT_SERVICES = [
  {
    id: "airport-hotel-vip",
    name: "Aeropuerto → Hotel VIP",
    type: "transfer",
    location: "Aeropuerto Punta Cana (PUJ)",
    destination: "Hoteles Bávaro, Punta Cana y Cap Cana",
    description: "Recibimiento Meet & Greet y traslado privado en SUV premium tipo Tahoe o similar, con agua fría y asistencia desde la terminal.",
    price: 75,
    paxLimit: 5,
    icon: "Crown",
    imageUrl: VEHICLE_IMAGES.tahoeChauffeur,
    amenities: ["wifi", "ac", "water", "meetGreet", "bilingual"]
  },
  {
    id: "hotel-airport-private",
    name: "Hotel → Aeropuerto",
    type: "transfer",
    location: "Hoteles y villas",
    destination: "PUJ, SDQ, LRM, STI y POP",
    description: "Salida puntual hacia el aeropuerto con monitoreo de horario, vehículo climatizado y espacio cómodo para equipaje.",
    price: 75,
    paxLimit: 6,
    icon: "Plane",
    imageUrl: VEHICLE_IMAGES.tahoeLights,
    amenities: ["wifi", "ac", "water", "luggage"]
  },
  {
    id: "hotel-hotel-transfer",
    name: "Hotel → Hotel",
    type: "transfer",
    location: "Punta Cana, Bávaro, Cap Cana y Uvero Alto",
    destination: "Resorts, villas y zonas turísticas",
    description: "Traslados privados entre hoteles para familias, parejas y grupos que necesitan moverse con comodidad dentro de la zona.",
    price: 45,
    paxLimit: 8,
    icon: "Car",
    imageUrl: VEHICLE_IMAGES.minivanPremium,
    amenities: ["wifi", "ac", "water", "childSeat", "luggage"]
  },
  {
    id: "airport-airport-transfer",
    name: "Aeropuerto → Aeropuerto",
    type: "transfer",
    location: "PUJ, SDQ, STI, POP o LRM",
    destination: "Conexiones entre aeropuertos",
    description: "Conexión privada entre aeropuertos dominicanos para vuelos enlazados, ejecutivos y grupos con itinerarios especiales.",
    price: 160,
    paxLimit: 5,
    icon: "Map",
    imageUrl: VEHICLE_IMAGES.executiveInterior,
    amenities: ["wifi", "ac", "water", "meetGreet", "bilingual", "luggage"]
  },
  {
    id: "isla-saona-excursion",
    name: "Excursión Isla Saona",
    type: "excursion",
    location: "Bayahíbe",
    destination: "Isla Saona",
    description: "Día completo en lancha y catamarán con aguas cristalinas, playa caribeña, almuerzo y coordinación de transporte privado.",
    price: 85,
    paxLimit: 25,
    icon: "Palmtree",
    imageUrl: DESTINATION_IMAGES.playaLancha,
    amenities: ["bilingual", "water"]
  },
  {
    id: "private-tours-rd",
    name: "Tours privados RD",
    type: "excursion",
    location: "Punta Cana / Bávaro",
    destination: "Samaná, Santo Domingo, Altos de Chavón y más",
    description: "Rutas privadas a diferentes puntos del país, pensadas para grupos que quieren explorar sin depender de excursiones masivas.",
    price: 120,
    paxLimit: 12,
    icon: "ShipWheel",
    imageUrl: DESTINATION_IMAGES.samanaPalm,
    amenities: ["ac", "water", "bilingual"]
  },
  {
    id: "modern-vehicles-driver",
    name: "Vehículos modernos con chofer",
    type: "rental",
    location: "Servicio por horas o por día",
    destination: "Eventos, cenas, reuniones y recorridos",
    description: "SUVs y minivans modernas con chofer profesional para itinerarios flexibles, ejecutivos y ocasiones especiales.",
    price: 140,
    paxLimit: 8,
    icon: "Users",
    imageUrl: VEHICLE_IMAGES.vanInterior,
    amenities: ["wifi", "ac", "water", "bilingual", "luggage"]
  },
  {
    id: "premium-rent-a-car",
    name: "Rent a Car premium",
    type: "rental",
    location: "Punta Cana y Santo Domingo",
    destination: "Entrega coordinada según disponibilidad",
    description: "Opciones premium para renta de vehículos modernos. Ideal para clientes que buscan movilidad independiente y estilo.",
    price: 95,
    paxLimit: 7,
    icon: "KeyRound",
    imageUrl: VEHICLE_IMAGES.tahoeUrban,
    amenities: ["ac", "luggage"]
  }
];
