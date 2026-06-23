import { DEFAULT_SERVICES, SERVICE_TYPES, WHATSAPP_NUMBER } from "../data/constants";

export const getInitialServices = () => {
  return DEFAULT_SERVICES;
};

export const formatCurrency = (amount) => `$${Number(amount || 0).toLocaleString("en-US")}`;

export const getServiceTypeLabel = (type) => SERVICE_TYPES[type] || SERVICE_TYPES.transfer;

export const createServiceId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString();
};

export const buildWhatsAppLink = (message = "Hola, quiero información sobre un traslado.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
