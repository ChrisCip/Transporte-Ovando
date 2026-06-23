import React from "react";
import { Icon } from "../Icon";
import { DynamicBookingForm } from "./DynamicBookingForm";

export const QuoteWidget = ({ onQuote, submitting = false }) => (
  <div className="glass rounded-3xl p-5 md:p-6 lg:p-7 w-full max-w-2xl mx-auto lg:mx-0 text-slate-900 rise delay-2">
    <div className="flex items-center justify-between gap-4 mb-5">
      <div>
        <h3 className="font-display font-bold text-lg md:text-xl text-slate-900">
          Solicita disponibilidad
        </h3>
        <p className="text-xs text-slate-500 mt-1">Transporte, excursiones y renta sin precios públicos.</p>
      </div>
      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Respuesta &lt; 5 min
      </span>
    </div>

    <DynamicBookingForm
      id="hero-lead-form"
      onSubmit={onQuote}
      submitting={submitting}
      ctaLabel="Enviar y abrir WhatsApp"
    />

    <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
      <Icon name="ShieldCheck" size={14} className="text-cyan-600" /> Te contactaremos para confirmar disponibilidad y tarifa.
    </p>
  </div>
);
