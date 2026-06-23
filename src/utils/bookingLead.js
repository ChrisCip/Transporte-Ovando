import { AIRPORTS, WHATSAPP_NUMBER } from "../data/constants";
import {
  OTHER_LOCATION_VALUE,
  TOUR_DESTINATIONS,
  TRANSFER_TYPES,
  VEHICLE_TYPES,
} from "../data/bookingOptions";
import { BOOKING_PAYLOAD_VERSION } from "../models/bookingPayloads";

export const getBookingKindFromService = (service) => {
  if (service?.type === "excursion") return "excursion";
  if (service?.type === "rental") return "rental";
  return "transport";
};

const getExcursionValue = (service) => {
  if (service?.type !== "excursion") return TOUR_DESTINATIONS[0];
  return TOUR_DESTINATIONS.includes(service.destination) ? service.destination : "Destino personalizado";
};

export const createInitialLeadFormState = ({ service, prefill = {}, defaultKind = "transport" } = {}) => {
  const kind = prefill.kind || getBookingKindFromService(service) || defaultKind;
  const airportOrigin = prefill.origin || service?.location || AIRPORTS[0].label;
  const excursion = prefill.excursion || getExcursionValue(service);

  return {
    kind,
    customerName: "",
    phone: "",
    transport: {
      transferType: prefill.transferType || TRANSFER_TYPES[0],
      origin: airportOrigin,
      originOther: "",
      destination: prefill.destination || service?.destination || "",
      date: prefill.date || "",
      time: prefill.time || "",
      pax: prefill.pax || 2,
      vehicleType: prefill.vehicleType || VEHICLE_TYPES[1],
    },
    excursion: {
      excursion,
      customExcursion: excursion === "Destino personalizado" ? service?.destination || "" : "",
      pickupLocation: prefill.pickupLocation || prefill.origin || "",
      date: prefill.date || "",
      pax: prefill.pax || 2,
    },
    rental: {
      vehicleType: prefill.vehicleType || VEHICLE_TYPES[1],
      capacity: prefill.capacity || prefill.pax || 4,
      deliveryLocation: prefill.deliveryLocation || prefill.origin || "",
      startDate: prefill.startDate || prefill.date || "",
      endDate: prefill.endDate || "",
    },
  };
};

export const buildBookingLeadPayload = (formState, service) => {
  const kind = formState.kind;
  const serviceName = service?.name || (
    kind === "transport" ? "Transporte personalizado" :
    kind === "excursion" ? "Excursión" :
    "Renta de vehículo"
  );

  const customer = {
    name: formState.customerName.trim(),
    phone: formState.phone.trim(),
  };

  if (kind === "transport") {
    const details = formState.transport;
    return {
      version: BOOKING_PAYLOAD_VERSION,
      kind,
      serviceName,
      customer,
      details: {
        transferType: details.transferType,
        origin: details.origin === OTHER_LOCATION_VALUE ? details.originOther.trim() : details.origin,
        destination: details.destination.trim(),
        date: details.date,
        time: details.time,
        pax: details.pax,
        vehicleType: details.vehicleType,
      },
    };
  }

  if (kind === "excursion") {
    const details = formState.excursion;
    return {
      version: BOOKING_PAYLOAD_VERSION,
      kind,
      serviceName,
      customer,
      details: {
        excursion: details.excursion === "Destino personalizado" ? details.customExcursion.trim() : details.excursion,
        pickupLocation: details.pickupLocation.trim(),
        date: details.date,
        pax: details.pax,
      },
    };
  }

  const details = formState.rental;
  return {
    version: BOOKING_PAYLOAD_VERSION,
    kind,
    serviceName,
    customer,
    details: {
      vehicleType: details.vehicleType,
      capacity: details.capacity,
      deliveryLocation: details.deliveryLocation.trim(),
      startDate: details.startDate,
      endDate: details.endDate,
    },
  };
};

export const getBookingKindLabel = (kind) => {
  if (kind === "excursion") return "Excursión";
  if (kind === "rental") return "Renta de vehículo";
  return "Transporte personalizado";
};

export const getBookingSummaryRows = (payload) => {
  const common = [
    ["Tipo de solicitud", getBookingKindLabel(payload.kind)],
    ["Servicio", payload.serviceName],
    ["Cliente", payload.customer?.name],
    ["Teléfono / WhatsApp", payload.customer?.phone],
  ];

  if (payload.kind === "transport") {
    return [
      ...common,
      ["Tipo de traslado", payload.details.transferType],
      ["Origen", payload.details.origin],
      ["Destino", payload.details.destination],
      ["Fecha", payload.details.date],
      ["Hora", payload.details.time],
      ["Personas", payload.details.pax],
      ["Vehículo deseado", payload.details.vehicleType],
    ];
  }

  if (payload.kind === "excursion") {
    return [
      ...common,
      ["Excursión / destino", payload.details.excursion],
      ["Lugar de recogida", payload.details.pickupLocation],
      ["Fecha", payload.details.date],
      ["Personas", payload.details.pax],
    ];
  }

  return [
    ...common,
    ["Tipo de vehículo", payload.details.vehicleType],
    ["Capacidad", payload.details.capacity],
    ["Lugar de entrega", payload.details.deliveryLocation],
    ["Fecha de inicio", payload.details.startDate],
    ["Fecha de fin", payload.details.endDate],
  ];
};

export const formatBookingWhatsAppMessage = (payload) => {
  const rows = getBookingSummaryRows(payload)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([label, value]) => `• ${label}: ${value}`)
    .join("\n");

  return `Hola, quiero solicitar disponibilidad para este servicio:\n\n${rows}\n\nPor favor confírmame disponibilidad y tarifa.`;
};

export const buildBookingWhatsAppLink = (payload) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formatBookingWhatsAppMessage(payload))}`;
