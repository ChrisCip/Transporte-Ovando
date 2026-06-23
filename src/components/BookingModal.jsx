import React from "react";
import { Icon } from "../Icon";
import { DynamicBookingForm } from "./DynamicBookingForm";

export const BookingModal = ({ service, prefill = {}, onClose, onSubmit, submitting = false }) => (
  <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 modal-backdrop rise" role="dialog" aria-modal="true">
    <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
      <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-slate-900 text-white p-6 md:p-8 relative shrink-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
          aria-label="Cerrar solicitud"
        >
          <Icon name="X" size={20} />
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-[10px] font-bold uppercase tracking-widest mb-3 border border-white/20">
          <Icon name="Sparkles" size={12} /> Lead premium
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 leading-tight">{service?.name || "Solicitud de servicio"}</h3>
        <p className="text-cyan-100 text-sm md:text-base flex items-center gap-2">
          <Icon name="CheckCircle2" size={16} className="text-emerald-300" /> Abriremos WhatsApp y guardaremos la solicitud por correo.
        </p>
      </div>

      <div className="p-5 md:p-7 overflow-y-auto bg-slate-50">
        <DynamicBookingForm
          id="booking-form"
          service={service}
          prefill={prefill}
          onSubmit={onSubmit}
          submitting={submitting}
          ctaLabel="Enviar y abrir WhatsApp"
        />
        <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
          <Icon name="Info" size={14} /> La disponibilidad y la tarifa final se confirman manualmente.
        </p>
      </div>
    </div>
  </div>
);
