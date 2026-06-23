import { DESTINATION_IMAGES, VEHICLE_IMAGES } from "./constants";

// Media centralizado. Las imagenes viven en /public y Vercel las sirve desde
// la raiz del dominio. Si luego agregas mp4 en /public/videos, se reproducen
// sobre estos posters sin romper el fallback de imagen estatica.

export const HERO_VIDEOS = [
  {
    id: "airport-vip",
    src: "",
    poster: VEHICLE_IMAGES.tahoeChauffeur,
    label: "Traslado aeropuerto",
    caption: "Meet & Greet en SUV premium",
  },
  {
    id: "saona",
    src: "",
    poster: DESTINATION_IMAGES.playaLancha,
    label: "Isla Saona",
    caption: "Excursiones privadas al Caribe",
  },
  {
    id: "samana",
    src: "",
    poster: DESTINATION_IMAGES.samanaPalm,
    label: "Samaná",
    caption: "Playas y rutas del nordeste",
  },
  {
    id: "fleet",
    src: "",
    poster: VEHICLE_IMAGES.minivanPremium,
    label: "Flota moderna",
    caption: "Minivans y SUVs climatizadas",
  },
];

export const STRIP_CLIPS = [
  {
    id: "puj-bavaro",
    src: "",
    poster: VEHICLE_IMAGES.tahoeChauffeur,
    label: "PUJ → Bávaro",
    meta: "25 min · SUV privado",
  },
  {
    id: "hotel-hotel",
    src: "",
    poster: VEHICLE_IMAGES.minivanPremium,
    label: "Hotel → Hotel",
    meta: "Puerta a puerta · A/C",
  },
  {
    id: "saona",
    src: "",
    poster: DESTINATION_IMAGES.saonaBeach,
    label: "Isla Saona",
    meta: "Día completo · Lancha",
  },
  {
    id: "samana",
    src: "",
    poster: DESTINATION_IMAGES.playitaSamana,
    label: "Samaná",
    meta: "Playas · Miradores",
  },
  {
    id: "fronton",
    src: "",
    poster: DESTINATION_IMAGES.frontonCove,
    label: "Playa Frontón",
    meta: "Costa norte · Privado",
  },
  {
    id: "rent-a-car",
    src: "",
    poster: VEHICLE_IMAGES.tahoeUrban,
    label: "Rent a Car",
    meta: "SUV premium · Flexible",
  },
];

export const FOOTER_MEDIA = {
  src: "",
  poster: DESTINATION_IMAGES.coastAerial,
};
