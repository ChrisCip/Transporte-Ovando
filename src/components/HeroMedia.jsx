import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HERO_VIDEOS } from '../data/media';

const ROTATE_MS = 6500;

// Capa de fondo del hero: rota posters (Ken Burns + crossfade) y reproduce
// el vídeo del slide activo encima cuando carga. Si no hay mp4, se queda el
// poster (LCP estable, sin estado roto). Estática con prefers-reduced-motion.
const Slide = ({ slide, reduce }) => {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    setVideoReady(false);
    const v = videoRef.current;
    if (!v || reduce || !slide.src) return;
    const onReady = () => setVideoReady(true);
    v.addEventListener('canplay', onReady);
    // intento de reproducción (algunos navegadores requieren play() explícito)
    v.play?.().catch(() => {});
    return () => v.removeEventListener('canplay', onReady);
  }, [slide.src, reduce]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <img
        src={slide.poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className={`absolute inset-0 w-full h-full object-cover ${reduce ? '' : 'animate-kenburns'}`}
      />
      {!reduce && slide.src && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          src={slide.src}
          poster={slide.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

export const HeroMedia = ({ className = '' }) => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slides = HERO_VIDEOS;

  useEffect(() => {
    if (reduce || slides.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce, slides.length]);

  const active = slides[index];

  return (
    <div className={`absolute inset-0 overflow-hidden bg-cyan-950 ${className}`} aria-hidden="true">
      <AnimatePresence mode="sync">
        <Slide key={active.id} slide={active} reduce={reduce} />
      </AnimatePresence>

      {/* Indicadores / selector de slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-24 md:bottom-28 right-4 md:right-8 z-20 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Mostrar ${s.label}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}

      {/* Etiqueta del clip activo */}
      <div className="absolute bottom-24 md:bottom-28 left-4 md:left-8 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/90"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {active.caption}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
