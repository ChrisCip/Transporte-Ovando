import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { GoogleLogo, WhatsAppLogo, InstagramLogo } from './BrandIcons';
import { QuoteWidget } from './QuoteWidget';
import { HeroMedia } from './HeroMedia';
import { FoamParticles } from './FoamParticles';
import { WaveDivider } from './WaveDivider';
import { buildWhatsAppLink } from '../utils/helpers';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY } from '../data/constants';

export const Hero = ({ onQuote }) => {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-center pt-28 pb-28 md:pt-36 md:pb-32 text-white overflow-hidden grain"
    >
      {/* Fondo cinematográfico: vídeo/poster rotativo + scrim legible + espuma */}
      <HeroMedia />
      <div className="absolute inset-0 media-scrim z-[1]" aria-hidden />
      <FoamParticles className="absolute inset-0 z-[2]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
        <motion.div
          className="lg:col-span-7 text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-500 text-white text-xs md:text-sm font-semibold mb-5 shadow-lg shadow-amber-500/30"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            #1 en traslados turísticos · Rep. Dominicana
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display font-bold leading-[1.05] mb-5 tracking-tight text-shadow-ocean text-white"
            style={{ fontSize: 'clamp(2.25rem, 5vw + 1rem, 4.5rem)' }}
          >
            El Caribe te espera.
            <span className="block">
              Nosotros te{' '}
              <span className="relative inline-block text-amber-300">
                llevamos
                {/* Subrayado decorativo ondulado (no gradiente en el texto) */}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 C 40 2, 70 12, 110 6 S 180 2, 198 6"
                    stroke="#22d3ee"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-white">.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base md:text-xl text-cyan-50/95 mb-7 max-w-xl mx-auto lg:mx-0 leading-relaxed text-shadow-ocean"
          >
            Traslados privados, excursiones premium y alquiler de vehículos con chofer bilingüe. Servicio puerta a puerta 24/7.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
            <a href="#servicios" className="btn-primary">
              Ver flota <Icon name="ArrowRight" size={18} />
            </a>
            <a href="#contacto" className="btn-ghost bg-white/15 border-white/20 text-white hover:bg-white/25 backdrop-blur-sm">
              <Icon name="Phone" size={18} /> Hablar con un asesor
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-cyan-100/95 text-sm text-shadow-ocean"
          >
            <div className="flex items-center gap-2"><Icon name="ShieldCheck" size={18} className="text-amber-300" /> Choferes certificados</div>
            <a href="#reseñas" className="flex items-center gap-2 hover:text-white transition group">
              <Icon name="Star" size={18} className="text-amber-300 fill-amber-300" />
              <span className="underline-offset-4 group-hover:underline">4.9 / 5 en Google</span>
            </a>
            <div className="flex items-center gap-2"><Icon name="Clock" size={18} className="text-amber-300" /> Disponible 24/7</div>
          </motion.div>

          {/* Fila de redes / contacto directo — logos de marca reales */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-6">
            <a
              href="#reseñas"
              aria-label="Ver reseñas de Google"
              className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-white/90 text-slate-800 border border-white/20 px-4 py-2 text-sm font-semibold transition shadow-md"
            >
              <GoogleLogo className="w-4 h-4" /> Google
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Instagram"
              className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-white/90 text-slate-800 border border-white/20 px-4 py-2 text-sm font-semibold transition shadow-md"
            >
              <InstagramLogo className="w-4 h-4" /> Instagram
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
              className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-white/90 text-slate-800 border border-white/20 px-4 py-2 text-sm font-semibold transition shadow-md"
            >
              <WhatsAppLogo className="w-4 h-4" /> {WHATSAPP_DISPLAY}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <QuoteWidget onQuote={onQuote} />
        </motion.div>
      </div>

      {/* Transición ondulada hacia la sección de servicios */}
      <div className="absolute bottom-0 left-0 right-0 z-[3]">
        <WaveDivider className="h-16 md:h-24" baseColor="#f8fafc" />
      </div>
    </section>
  );
};
