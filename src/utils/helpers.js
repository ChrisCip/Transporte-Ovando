import { DEFAULT_SERVICES, SERVICES_STORAGE_KEY, SERVICE_TYPES, WHATSAPP_NUMBER } from "../data/constants";

export const getInitialServices = () => {
  if (typeof window === "undefined") return DEFAULT_SERVICES;
  try {
    const saved = window.localStorage.getItem(SERVICES_STORAGE_KEY);
    if (!saved) return DEFAULT_SERVICES;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
};

export const formatCurrency = (amount) => `$${Number(amount || 0).toLocaleString("en-US")}`;

export const getServiceTypeLabel = (type) => SERVICE_TYPES[type] || SERVICE_TYPES.transfer;

export const createServiceId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString();
};

export const buildWhatsAppLink = (message = "Hola, quiero información sobre un traslado.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
