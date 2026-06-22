import React from 'react';
import { Icon } from '../Icon';

export const Toast = ({ data, onClose }) => (
  <div className="fixed bottom-24 md:bottom-6 right-6 left-6 sm:left-auto z-[110] glass-dark text-white px-5 py-4 rounded-2xl shadow-float flex items-center gap-4 rise max-w-md ml-auto">
    <div className="w-10 h-10 rounded-full bg-emerald-500/25 text-emerald-300 flex items-center justify-center shrink-0">
      <Icon name="CheckCircle2" size={22} />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-sm mb-0.5">Listo</h4>
      <p className="text-cyan-100/90 text-sm truncate">{data.message}</p>
    </div>
    <button onClick={onClose} className="text-white/70 hover:text-white transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Cerrar mensaje">
      <Icon name="X" size={16} />
    </button>
  </div>
);
