import React, { useState } from 'react';
import { Icon } from '../Icon';

export const BookingModal = ({ service, prefill = {}, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    origin: prefill.origin || service.location || "",
    destination: prefill.destination || service.destination,
    date: prefill.date || "",
    pax: prefill.pax || 1
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...formData, serviceName: service.name });
  };

  const update = (field) => (event) => setFormData((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 modal-backdrop rise" role="dialog" aria-modal="true">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-slate-900 text-white p-6 md:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Cerrar reserva"
          >
            <Icon name="X" size={20} />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-[10px] font-bold uppercase tracking-widest mb-3 border border-white/20">
            <Icon name="Sparkles" size={12} /> Reserva premium
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 leading-tight">{service.name}</h3>
          <p className="text-cyan-100 text-sm md:text-base flex items-center gap-2">
            <Icon name="CheckCircle2" size={16} className="text-emerald-300" /> Confirmación en menos de 5 minutos
          </p>
        </div>

        <div className="p-5 md:p-7 overflow-y-auto bg-slate-50">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Nombre completo <span className="text-rose-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Icon name="User" size={18} />
                </div>
                <input required type="text" value={formData.name} onChange={update("name")} className="field" placeholder="Ej. Juan Pérez" />
              </div>
            </div>

            <div>
              <label className="label">Teléfono / WhatsApp <span className="text-rose-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Icon name="Phone" size={18} />
                </div>
                <input required type="tel" value={formData.phone} onChange={update("phone")} className="field" placeholder="+1 (809) 000-0000" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Origen <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Icon name="Plane" size={18} />
                  </div>
                  <input required type="text" value={formData.origin} onChange={update("origin")} className="field" />
                </div>
              </div>
              <div>
                <label className="label">Destino <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Icon name="MapPin" size={18} />
                  </div>
                  <input required type="text" value={formData.destination} onChange={update("destination")} className="field" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Fecha <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Icon name="Calendar" size={18} />
                  </div>
                  <input required type="date" min={today} value={formData.date} onChange={update("date")} className="field" />
                </div>
              </div>
              <div>
                <label className="label">Personas <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Icon name="Users" size={18} />
                  </div>
                  <input required type="number" min="1" max={service.paxLimit} value={formData.pax} onChange={update("pax")} className="field" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-5 md:p-7 border-t border-slate-200 bg-white shrink-0">
          <button form="booking-form" type="submit" className="btn-primary w-full text-base md:text-lg">
            <Icon name="Mail" size={20} /> Enviar reserva por correo
          </button>
          <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
            <Icon name="Info" size={14} /> No se requiere pago adelantado.
          </p>
        </div>
      </div>
    </div>
  );
};
