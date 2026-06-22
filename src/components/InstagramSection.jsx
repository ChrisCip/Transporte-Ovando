import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { Reveal } from './Reveal';
import { useInstagramFeed } from '../hooks/useInstagramFeed';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/constants';

const Tile = ({ post, reduce, index }) => (
  <motion.a
    href={post.permalink || INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={post.alt}
    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    transition={{ duration: 0.5, delay: reduce ? 0 : (index % 6) * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
    className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100"
  >
    <img
      src={post.image}
      alt={post.alt}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <span className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
    <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Icon name="Instagram" size={28} />
    </span>
  </motion.a>
);

export const InstagramSection = () => {
  const reduce = useReducedMotion();
  const { posts } = useInstagramFeed(6);

  return (
    <section id="instagram" className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="absolute -top-10 right-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-pink-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2">
              <Icon name="Instagram" size={16} /> Síguenos en Instagram
            </span>
            <h2 className="font-display font-bold text-slate-900" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)' }}>
              El Caribe en <span className="text-cyan-600">tiempo real</span>
            </h2>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-block text-slate-500 hover:text-pink-600 transition mt-3 font-medium">
              {INSTAGRAM_HANDLE}
            </a>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4)' }}
          >
            <Icon name="Instagram" size={20} /> Seguir @ovando
          </a>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {posts.map((post, i) => (
            <Tile key={post.id} post={post} reduce={reduce} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
