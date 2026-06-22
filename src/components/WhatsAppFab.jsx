import React from 'react';
import { Icon } from '../Icon';
import { buildWhatsAppLink } from '../utils/helpers';

export const WhatsAppFab = () => (
  <a
    href={buildWhatsAppLink()}
    target="_blank"
    rel="noopener noreferrer"
    style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
    className="fixed right-5 md:right-6 z-50 group flex items-center gap-3"
    aria-label="Contactar por WhatsApp"
  >
    <span className="hidden md:inline-flex glass px-4 py-2 rounded-full text-sm font-bold text-slate-800 shadow-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
      ¿Hablamos?
    </span>
    <span className="relative">
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60"></span>
      <span className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 ring-4 ring-white/60">
        <Icon name="MessageCircle" size={28} strokeWidth={2} />
      </span>
    </span>
  </a>
);
