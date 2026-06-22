import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { Reveal } from './Reveal';
import { STRIP_CLIPS } from '../data/media';

// Tarjeta de clip: muestra poster y, al pasar el ratón (desktop), intenta
// reproducir el vídeo encima. Sin ratón / reduced-motion → solo poster.
const ClipCard = ({ clip, reduce }) => {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  const onEnter = () => {
    if (reduce || !clip.src) return;
    const v = videoRef.current;
    if (v) v.play?.().catch(() => {});
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (v) { v.pause?.(); v.currentTime = 0; setReady(false); }
  };

  return (
    <article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="snap-start shrink-0 w-[78vw] sm:w-[58vw] md:w-[42vw] lg:w-[30rem] group"
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-float bg-slate-200">
        <img
          src={clip.poster}
          alt={clip.label}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {!reduce && clip.src && (
          <video
            ref={videoRef}
            src={clip.src}
            poster={clip.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => setReady(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" aria-hidden />
        <div className="absolute left-5 right-5 bottom-5 text-white">
          <p className="text-[10px] uppercase tracking-widest text-cyan-200/90 mb-1">{clip.meta}</p>
          <h3 className="font-display font-bold text-2xl md:text-3xl drop-shadow flex items-center gap-2">
            {clip.label}
            <Icon name="ArrowRight" size={20} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </h3>
        </div>
        <div className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon name="Play" size={16} />
        </div>
      </div>
    </article>
  );
};

export const ExperienceStrip = () => {
  const reduce = useReducedMotion();
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 520), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section id="experiencias" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-12">
          <div className="max-w-xl">
            <span className="text-cyan-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Rutas y experiencias</span>
            <h2 className="font-display font-bold text-slate-900" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)' }}>
              Del avión al <span className="text-cyan-600">paraíso</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg mt-3">
              Desliza para descubrir nuestros destinos más solicitados en el Caribe dominicano.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button onClick={() => scrollBy(-1)} aria-label="Anterior" className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:border-cyan-400 hover:text-cyan-600 text-slate-700 flex items-center justify-center transition shadow-soft">
              <Icon name="ChevronLeft" size={22} />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Siguiente" className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:border-cyan-400 hover:text-cyan-600 text-slate-700 flex items-center justify-center transition shadow-soft">
              <Icon name="ChevronRight" size={22} />
            </button>
          </div>
        </Reveal>
      </div>

      <motion.div
        ref={scrollerRef}
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x-mandatory no-scrollbar px-4 md:px-6 pb-2 max-w-[100rem] mx-auto"
      >
        {STRIP_CLIPS.map((clip) => (
          <ClipCard key={clip.id} clip={clip} reduce={reduce} />
        ))}
        {/* margen final para que la última tarjeta no quede pegada al borde */}
        <div className="shrink-0 w-1 md:w-2" aria-hidden />
      </motion.div>
    </section>
  );
};
