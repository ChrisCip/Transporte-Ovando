import React, { useState } from "react";
import { Icon } from "../Icon";
import { AIRPORTS } from "../data/constants";
import {
  BOOKING_TYPES,
  OTHER_LOCATION_VALUE,
  TOUR_DESTINATIONS,
  TRANSFER_TYPES,
  VEHICLE_TYPES,
} from "../data/bookingOptions";
import {
  buildBookingLeadPayload,
  createInitialLeadFormState,
} from "../utils/bookingLead";

const commonInput = "w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 outline-none transition font-medium";
const labelClass = "text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5";

const Field = ({ label, icon, children }) => (
  <div>
    <label className={labelClass}>
      <Icon name={icon} size={14} className="text-cyan-600" /> {label}
    </label>
    {children}
  </div>
);

export const DynamicBookingForm = ({
  id = "booking-form",
  service,
  prefill = {},
  onSubmit,
  submitting = false,
  ctaLabel = "Enviar solicitud",
  className = "",
}) => {
  const [formData, setFormData] = useState(() => createInitialLeadFormState({ service, prefill }));
  const today = new Date().toISOString().split("T")[0];

  const updateRoot = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const updateGroup = (group, field) => (event) => {
    setFormData((current) => ({
      ...current,
      [group]: { ...current[group], [field]: event.target.value },
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await onSubmit(buildBookingLeadPayload(formData, service));
  };

  return (
    <form id={id} onSubmit={submit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-3 gap-2">
        {BOOKING_TYPES.map((type) => {
          const active = formData.kind === type.value;
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData((current) => ({ ...current, kind: type.value }))}
              aria-pressed={active}
              className={`min-h-[48px] rounded-xl border px-2 py-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${active ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-white text-slate-700 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}
            >
              <Icon name={type.icon} size={16} />
              <span>{type.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre completo" icon="User">
          <input required type="text" value={formData.customerName} onChange={updateRoot("customerName")} className={commonInput} placeholder="Ej. Juan Pérez" />
        </Field>
        <Field label="Teléfono / WhatsApp" icon="Phone">
          <input required type="tel" value={formData.phone} onChange={updateRoot("phone")} className={commonInput} placeholder="+1 (809) 000-0000" />
        </Field>
      </div>

      {formData.kind === "transport" && (
        <>
          <Field label="Tipo de traslado" icon="Route">
            <select required value={formData.transport.transferType} onChange={updateGroup("transport", "transferType")} className={commonInput}>
              {TRANSFER_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Origen" icon="Plane">
              <select required value={formData.transport.origin} onChange={updateGroup("transport", "origin")} className={commonInput}>
                {AIRPORTS.map((airport) => <option key={airport.code} value={airport.label}>{airport.label}</option>)}
                <option value={OTHER_LOCATION_VALUE}>{OTHER_LOCATION_VALUE}</option>
              </select>
            </Field>
            <Field label="Destino" icon="MapPin">
              <input required type="text" value={formData.transport.destination} onChange={updateGroup("transport", "destination")} className={commonInput} placeholder="Hotel o ubicación particular" />
            </Field>
          </div>

          {formData.transport.origin === OTHER_LOCATION_VALUE && (
            <Field label="Otra ubicación de origen" icon="MapPinned">
              <input required type="text" value={formData.transport.originOther} onChange={updateGroup("transport", "originOther")} className={commonInput} placeholder="Ej. Hotel, villa, dirección privada" />
            </Field>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Fecha" icon="Calendar">
              <input required type="date" min={today} value={formData.transport.date} onChange={updateGroup("transport", "date")} className={commonInput} />
            </Field>
            <Field label="Hora" icon="Clock">
              <input required type="time" value={formData.transport.time} onChange={updateGroup("transport", "time")} className={commonInput} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Personas" icon="Users">
              <input required type="number" min="1" max="50" value={formData.transport.pax} onChange={updateGroup("transport", "pax")} className={commonInput} />
            </Field>
            <Field label="Vehículo deseado" icon="Car">
              <select required value={formData.transport.vehicleType} onChange={updateGroup("transport", "vehicleType")} className={commonInput}>
                {VEHICLE_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </Field>
          </div>
        </>
      )}

      {formData.kind === "excursion" && (
        <>
          <Field label="Excursión / destino" icon="Palmtree">
            <select required value={formData.excursion.excursion} onChange={updateGroup("excursion", "excursion")} className={commonInput}>
              {TOUR_DESTINATIONS.map((destination) => <option key={destination} value={destination}>{destination}</option>)}
            </select>
          </Field>

          {formData.excursion.excursion === "Destino personalizado" && (
            <Field label="Destino personalizado" icon="MapPinned">
              <input required type="text" value={formData.excursion.customExcursion} onChange={updateGroup("excursion", "customExcursion")} className={commonInput} placeholder="Ej. Jarabacoa, Miches, Las Terrenas" />
            </Field>
          )}

          <Field label="Lugar de recogida" icon="MapPin">
            <input required type="text" value={formData.excursion.pickupLocation} onChange={updateGroup("excursion", "pickupLocation")} className={commonInput} placeholder="Hotel, villa o ubicación de pick-up" />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Fecha" icon="Calendar">
              <input required type="date" min={today} value={formData.excursion.date} onChange={updateGroup("excursion", "date")} className={commonInput} />
            </Field>
            <Field label="Personas" icon="Users">
              <input required type="number" min="1" max="50" value={formData.excursion.pax} onChange={updateGroup("excursion", "pax")} className={commonInput} />
            </Field>
          </div>
        </>
      )}

      {formData.kind === "rental" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tipo de vehículo" icon="Car">
              <select required value={formData.rental.vehicleType} onChange={updateGroup("rental", "vehicleType")} className={commonInput}>
                {VEHICLE_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </Field>
            <Field label="Capacidad" icon="Users">
              <input required type="number" min="1" max="15" value={formData.rental.capacity} onChange={updateGroup("rental", "capacity")} className={commonInput} />
            </Field>
          </div>

          <Field label="Lugar de entrega" icon="MapPin">
            <input required type="text" value={formData.rental.deliveryLocation} onChange={updateGroup("rental", "deliveryLocation")} className={commonInput} placeholder="Dónde necesita recibir el vehículo" />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Fecha de inicio" icon="Calendar">
              <input required type="date" min={today} value={formData.rental.startDate} onChange={updateGroup("rental", "startDate")} className={commonInput} />
            </Field>
            <Field label="Fecha de fin" icon="CalendarDays">
              <input required type="date" min={formData.rental.startDate || today} value={formData.rental.endDate} onChange={updateGroup("rental", "endDate")} className={commonInput} />
            </Field>
          </div>
        </>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full text-base md:text-lg disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? (
          <>
            <Icon name="Loader" size={20} className="animate-spin" /> Enviando...
          </>
        ) : (
          <>
            <Icon name="MessageCircle" size={20} /> {ctaLabel}
          </>
        )}
      </button>
    </form>
  );
};
