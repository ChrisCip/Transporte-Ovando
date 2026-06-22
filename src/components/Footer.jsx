import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { Reveal } from './Reveal';
import { WaveDivider } from './WaveDivider';
import { buildWhatsAppLink } from '../utils/helpers';
import { FOOTER_MEDIA } from '../data/media';
import { WHATSAPP_DISPLAY, PHONE_TEL, CONTACT_EMAIL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/constants';

export const Footer = () => {
  const reduce = useReducedMotion();

  return (
    <footer id="contacto" className="relative bg-transparent text-slate-200">
      {/* Transición ondulada de la sección clara hacia el footer oscuro */}
      <WaveDivider className="h-12 md:h-20" baseColor="#0f172a" />

      <div className="relative overflow-hidden bg-slate-900 pt-12 pb-10">
        {/* Profundidad: gradiente oceánico animado + mar tenue en bucle */}
        <div className="absolute inset-0 ocean-animated opacity-40" aria-hidden />
        {!reduce && FOOTER_MEDIA.src && (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            src={FOOTER_MEDIA.src}
            poster={FOOTER_MEDIA.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/85 to-slate-900/60" aria-hidden />
        <div className="absolute top-10 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <Reveal className="grid md:grid-cols-3 gap-10 border-b border-white/10 pb-12 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <img src="/TransporteLogo.png" alt="Transporte Turístico Ovando" width="80" height="80" decoding="async" className="h-20 w-20 object-contain rounded-2xl bg-white p-1.5 ring-2 ring-white/10" />
                <div>
                  <p className="font-display font-bold text-white text-lg leading-tight">Transporte Ovando</p>
                  <p className="text-xs uppercase tracking-widest text-cyan-300">Caribe Premium</p>
                </div>
              </div>
              <p className="max-w-xs mx-auto md:mx-0 text-sm text-slate-300 leading-relaxed">
                Las mejores experiencias de transporte en el Caribe dominicano. Viaja seguro, viaja con Ovando.
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Enlaces</h4>
              <div className="flex flex-col gap-3 text-sm">
                <a href="#inicio" className="hover:text-cyan-300 transition">Inicio</a>
                <a href="#experiencias" className="hover:text-cyan-300 transition">Experiencias</a>
                <a href="#reseñas" className="hover:text-cyan-300 transition">Reseñas</a>
                <a href="#servicios" className="hover:text-cyan-300 transition">Nuestra flota</a>
                <a href="#instagram" className="hover:text-cyan-300 transition">Instagram</a>
                <a href="#admin" className="hover:text-cyan-300 transition">Panel admin</a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contacto</h4>
              <div className="flex flex-col gap-3 text-sm items-center md:items-end text-slate-300">
                <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-300 transition">
                  <Icon name="MessageCircle" size={16} className="text-emerald-400" /> WhatsApp · {WHATSAPP_DISPLAY}
                </a>
                <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-cyan-300 transition">
                  <Icon name="Phone" size={16} className="text-cyan-400" /> {WHATSAPP_DISPLAY}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 hover:text-cyan-300 transition">
                  <Icon name="Mail" size={16} className="text-cyan-400" /> {CONTACT_EMAIL}
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-300 transition">
                  <Icon name="Instagram" size={16} className="text-pink-400" /> {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2026 Transporte Turístico Ovando. Todos los derechos reservados.</p>
            <a href="#admin" className="hover:text-cyan-300 transition flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-cyan-400/40">
              <Icon name="Lock" size={12} /> Acceso administrador
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
