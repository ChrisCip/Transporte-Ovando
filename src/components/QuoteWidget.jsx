import React, { useState } from 'react';
import { Icon } from '../Icon';
import { AIRPORTS, POPULAR_DESTINATIONS } from '../data/constants';

export const QuoteWidget = ({ onQuote }) => {
  const [origin, setOrigin] = useState(AIRPORTS[0].label);
  const [destination, setDestination] = useState(POPULAR_DESTINATIONS[0]);
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(2);

  const submit = (event) => {
    event.preventDefault();
    onQuote?.({ origin, destination, date, pax });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={submit}
      className="glass rounded-3xl p-5 md:p-6 lg:p-7 w-full max-w-2xl mx-auto lg:mx-0 text-slate-900 rise delay-2"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-md">
            <Icon name="Sparkles" size={18} />
          </span>
          Cotiza tu traslado
        </h3>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Respuesta &lt; 5 min
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Icon name="Plane" size={14} className="text-cyan-600" /> Origen
          </label>
          <select
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 outline-none transition font-medium"
          >
            {AIRPORTS.map((airport) => (
              <option key={airport.code} value={airport.label}>{airport.label}</option>
            ))}
            <option value="Otro origen">Otro origen…</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Icon name="MapPin" size={14} className="text-cyan-600" /> Destino
          </label>
          <input
            list="destinos"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Ej. Bávaro / Punta Cana"
            className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 outline-none transition font-medium"
          />
          <datalist id="destinos">
            {POPULAR_DESTINATIONS.map((destinationItem) => (
              <option key={destinationItem} value={destinationItem} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Icon name="Calendar" size={14} className="text-cyan-600" /> Fecha
          </label>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 outline-none transition font-medium"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Icon name="Users" size={14} className="text-cyan-600" /> Pasajeros
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={pax}
            onChange={(event) => setPax(event.target.value)}
            className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 outline-none transition font-medium"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full mt-5 text-base md:text-lg animate-pulse">
        <Icon name="Search" size={20} /> Ver opciones disponibles
      </button>
      <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
        <Icon name="ShieldCheck" size={14} className="text-cyan-600" /> Sin cargos por reserva. Pago al chofer.
      </p>
    </form>
  );
};
