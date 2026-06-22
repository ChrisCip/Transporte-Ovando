import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { Reveal } from './Reveal';
import { useGoogleReviews } from '../hooks/useGoogleReviews';
import { GOOGLE_REVIEWS_URL } from '../data/constants';

// Logo "G" de Google en colores (SVG inline, sin dependencia externa)
const GoogleG = ({ className = '' }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

const Stars = ({ rating = 5, size = 16, className = '' }) => (
  <span className={`inline-flex items-center gap-0.5 text-amber-400 ${className}`} aria-hidden="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={size}
        strokeWidth={0}
        className={i < Math.round(rating) ? 'fill-amber-400' : 'fill-white/20'}
      />
    ))}
  </span>
);

const Avatar = ({ author, photoUrl }) => {
  if (photoUrl) {
    return <img src={photoUrl} alt="" className="w-11 h-11 rounded-full object-cover ring-2 ring-white/20" loading="lazy" />;
  }
  const initial = (author || 'G').trim().charAt(0).toUpperCase();
  return (
    <span className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-white font-display font-bold flex items-center justify-center ring-2 ring-white/20">
      {initial}
    </span>
  );
};

const ReviewCard = ({ review }) => (
  <article className="snap-start shrink-0 w-[82vw] sm:w-[20rem] lg:w-[22rem] bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 flex flex-col shadow-xl">
    <div className="flex items-center gap-3 mb-3">
      <Avatar author={review.author} photoUrl={review.photoUrl} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white truncate">{review.author}</p>
        <p className="text-xs text-cyan-100/70">{review.relativeDate}</p>
      </div>
      <GoogleG className="w-5 h-5 shrink-0" />
    </div>
    <Stars rating={review.rating} size={16} className="mb-3" />
    <p className="text-cyan-50/90 text-sm leading-relaxed line-clamp-5">{review.text}</p>
  </article>
);

export const GoogleReviews = () => {
  const reduce = useReducedMotion();
  const { reviews, rating, total, source } = useGoogleReviews();
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 360), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section id="reseñas" className="relative py-16 md:py-24 overflow-hidden text-white">
      {/* Banda oceánica para destacar la prueba social */}
      <div className="absolute inset-0 ocean-animated" aria-hidden />
      <div className="absolute inset-0 bg-slate-950/30" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 text-cyan-200 font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
            <GoogleG className="w-4 h-4" /> Reseñas verificadas de Google
          </span>
          <h2 className="font-display font-bold mb-5 text-shadow-ocean" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)' }}>
            Lo que dicen nuestros viajeros
          </h2>

          <div className="inline-flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-6 py-4">
            <span className="font-display font-bold leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>
              {Number(rating).toFixed(1)}
            </span>
            <span className="text-left">
              <Stars rating={rating} size={20} className="mb-1" />
              <span className="block text-sm text-cyan-100/80">
                {total ? `Basado en ${total}+ reseñas` : 'Valoración media'}
              </span>
            </span>
          </div>
        </Reveal>

        {/* Flechas (desktop) */}
        <div className="hidden md:flex justify-end gap-2 mb-4">
          <button onClick={() => scrollBy(-1)} aria-label="Reseñas anteriores" className="w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition">
            <Icon name="ChevronLeft" size={22} />
          </button>
          <button onClick={() => scrollBy(1)} aria-label="Más reseñas" className="w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition">
            <Icon name="ChevronRight" size={22} />
          </button>
        </div>

        <motion.div
          ref={scrollerRef}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x-mandatory no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-shine w-full sm:w-auto"
          >
            <GoogleG className="w-5 h-5" /> Ver todas las reseñas en Google
          </a>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto bg-white/10 border-white/25 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Icon name="PenLine" size={18} /> Déjanos tu reseña
          </a>
        </div>
        {source === 'api' && (
          <p className="text-center text-xs text-cyan-100/60 mt-4">Actualizado en tiempo real desde Google</p>
        )}
      </div>
    </section>
  );
};
