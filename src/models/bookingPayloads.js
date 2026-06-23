/**
 * Modelos de payload para leads de reserva.
 *
 * @typedef {"transport" | "excursion" | "rental"} BookingKind
 *
 * @typedef {Object} CustomerInfo
 * @property {string} name
 * @property {string} phone
 *
 * @typedef {Object} TransportDetails
 * @property {string} transferType
 * @property {string} origin
 * @property {string} destination
 * @property {string} date
 * @property {string} time
 * @property {string | number} pax
 * @property {"Sedán" | "SUV" | "Minivan" | string} vehicleType
 *
 * @typedef {Object} ExcursionDetails
 * @property {string} excursion
 * @property {string} pickupLocation
 * @property {string} date
 * @property {string | number} pax
 *
 * @typedef {Object} RentalDetails
 * @property {"Sedán" | "SUV" | "Minivan" | string} vehicleType
 * @property {string | number} capacity
 * @property {string} deliveryLocation
 * @property {string} startDate
 * @property {string} endDate
 *
 * @typedef {Object} BookingLeadPayload
 * @property {1} version
 * @property {BookingKind} kind
 * @property {string} serviceName
 * @property {CustomerInfo} customer
 * @property {TransportDetails | ExcursionDetails | RentalDetails} details
 */

export const BOOKING_PAYLOAD_VERSION = 1;
