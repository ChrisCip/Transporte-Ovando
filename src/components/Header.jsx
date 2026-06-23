import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { INSTAGRAM_URL } from '../data/constants';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase = "px-3 py-2 rounded-full font-semibold transition-all duration-300";
  const linkColor = "text-slate-700 hover:text-cyan-600";

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-between gap-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg transition-all duration-300 ${scrolled ? "px-3 py-2" : "px-3 py-2.5"}`}>
          <a href="#inicio" className="flex items-center group" aria-label="Transporte Ovando — inicio">
            <img src="/TransporteLogo.png" alt="Transporte Ovando" width="96" height="96" decoding="async" className="h-16 w-16 md:h-20 md:w-20 object-contain transition group-hover:scale-105" />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a href="#inicio" className={`${linkBase} ${linkColor}`}>Inicio</a>
            <a href="#experiencias" className={`${linkBase} ${linkColor}`}>Experiencias</a>
            <a href="#reseñas" className={`${linkBase} ${linkColor}`}>Reseñas</a>
            <a href="#servicios" className={`${linkBase} ${linkColor}`}>Flota</a>
            <a href="#contacto" className={`${linkBase} ${linkColor}`}>Contacto</a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 ml-1 rounded-full flex items-center justify-center transition text-slate-700 hover:bg-pink-50 hover:text-pink-600"
            >
              <Icon name="Instagram" size={20} />
            </a>
          </nav>

          <button
            onClick={() => setOpen((value) => !value)}
            className={`md:hidden w-11 h-11 rounded-xl flex items-center justify-center transition ${scrolled ? "bg-slate-100 text-slate-800" : "bg-white/15 text-white backdrop-blur-sm"}`}
            aria-label="Abrir menú"
          >
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-3 flex flex-col gap-1 rise">
            <a href="#inicio" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-cyan-50">Inicio</a>
            <a href="#experiencias" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-cyan-50">Experiencias</a>
            <a href="#reseñas" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-cyan-50">Reseñas</a>
            <a href="#servicios" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-cyan-50">Flota</a>
            <a href="#contacto" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-cyan-50">Contacto</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-pink-50 flex items-center gap-2">
              <Icon name="Instagram" size={18} className="text-pink-600" /> Instagram
            </a>
          </div>
        )}
      </div>
    </motion.header>
  );
};
