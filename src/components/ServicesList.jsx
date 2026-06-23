import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon';
import { ServiceImage } from './ServiceImage';
import { getServiceTypeLabel } from '../utils/helpers';
import { AMENITY_CATALOG, SERVICE_TYPES } from '../data/constants';

const FILTERS = [
  { value: "all", label: "Todos", icon: "LayoutGrid" },
  { value: "transfer", label: SERVICE_TYPES.transfer, icon: "Car" },
  { value: "excursion", label: SERVICE_TYPES.excursion, icon: "Palmtree" },
  { value: "rental", label: SERVICE_TYPES.rental, icon: "KeyRound" }
];

const AmenityChip = ({ amenityKey }) => {
  const amenity = AMENITY_CATALOG[amenityKey];
  if (!amenity) return null;
  return (
    <span className="chip">
      <Icon name={amenity.icon} size={12} className="text-cyan-600" />
      {amenity.label}
    </span>
  );
};

// Tarjeta con tilt 3D + parallax de imagen al mover el ratón (desactivado en
// prefers-reduced-motion). Tilt suavizado con muelles de framer-motion.
const ServiceCard = ({ service, onBook, reduce, className = "" }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });

  const rotateY = useTransform(sx, [0, 1], [-6, 6]);
  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const imgX = useTransform(sx, [0, 1], ['-3%', '3%']);
  const imgY = useTransform(sy, [0, 1], ['-3%', '3%']);

  const onMove = (e) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.article
      ref={ref}
      layout
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative bg-white rounded-3xl shadow-soft border border-slate-100 flex flex-col overflow-hidden hover:shadow-2xl hover:border-cyan-200 transition-shadow duration-300 will-change-transform ${className}`}
    >
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <motion.div
          className="absolute inset-[-5%]"
          style={reduce ? undefined : { x: imgX, y: imgY }}
        >
          <ServiceImage service={service} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" aria-hidden></div>

        <div className="absolute left-4 top-4 w-12 h-12 glass text-cyan-700 rounded-2xl flex items-center justify-center">
          <Icon name={service.icon || "Car"} size={24} strokeWidth={1.75} />
        </div>
        <div className="absolute right-4 top-4 px-3 py-1.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
          {getServiceTypeLabel(service.type)}
        </div>

        <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-cyan-200/90">Servicio privado</p>
            <p className="font-display font-bold drop-shadow" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>Cotización rápida</p>
          </div>
          <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-1 rounded-full">
            hasta {service.paxLimit} pax
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-2 leading-tight">{service.name}</h3>
        <p className="text-slate-600 mb-4 text-sm md:text-base line-clamp-3 flex-1">{service.description}</p>

        <div className="space-y-2 text-sm text-slate-700 mb-5">
          <div className="flex items-start gap-2">
            <Icon name="Plane" size={16} className="text-cyan-600 shrink-0 mt-0.5" />
            <span className="text-slate-700"><strong className="text-slate-900">Origen:</strong> {service.location}</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="MapPin" size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <span className="text-slate-700"><strong className="text-slate-900">Destino:</strong> {service.destination}</span>
          </div>
        </div>

        {Array.isArray(service.amenities) && service.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5 pb-5 border-b border-slate-100">
            {service.amenities.map((amenityKey) => (
              <AmenityChip key={amenityKey} amenityKey={amenityKey} />
            ))}
          </div>
        )}

        <button
          onClick={() => onBook(service)}
          className="mt-auto group/btn w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-cyan-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-cyan"
        >
          Solicitar servicio
          <Icon name="ArrowRight" size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
};

export const ServicesList = ({ services, onBook }) => {
  const [filter, setFilter] = useState("all");
  const reduce = useReducedMotion();
  const scrollerRef = useRef(null);

  const filtered = useMemo(
    () => (filter === "all" ? services : services.filter((service) => service.type === filter)),
    [services, filter]
  );

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 460), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section id="servicios" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" aria-hidden></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <span className="text-cyan-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Flota premium</span>
          <h2 className="font-display font-bold text-slate-900 mb-4" style={{ fontSize: 'clamp(1.875rem, 4vw + 1rem, 3rem)' }}>
            Servicios para cada <span className="text-cyan-600">aventura</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">Elige entre traslados, excursiones y alquileres. Todos con chofer profesional, seguro y vehículo climatizado.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
          {FILTERS.map((filterOption) => {
            const active = filter === filterOption.value;
            return (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                aria-pressed={active}
                className={`relative inline-flex items-center gap-2 min-h-[44px] px-4 md:px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors duration-300 ${active ? "text-white border-slate-900" : "bg-white text-slate-700 border-slate-200 hover:border-cyan-400 hover:text-cyan-700"}`}
              >
                {active && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full bg-slate-900 shadow-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Icon name={filterOption.icon} size={16} />
                  {filterOption.label}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <Icon name="SearchX" size={40} className="text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No hay servicios en esta categoría aún.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Flechas (desktop) */}
            <div className="hidden md:flex justify-end gap-2 mb-5">
              <button onClick={() => scrollBy(-1)} aria-label="Servicios anteriores" className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:border-cyan-400 hover:text-cyan-600 text-slate-700 flex items-center justify-center transition shadow-soft">
                <Icon name="ChevronLeft" size={22} />
              </button>
              <button onClick={() => scrollBy(1)} aria-label="Más servicios" className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:border-cyan-400 hover:text-cyan-600 text-slate-700 flex items-center justify-center transition shadow-soft">
                <Icon name="ChevronRight" size={22} />
              </button>
            </div>

            <motion.div
              ref={scrollerRef}
              layout
              className="flex gap-6 md:gap-8 overflow-x-auto snap-x-mandatory no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-1"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onBook={onBook}
                    reduce={reduce}
                    className="snap-start shrink-0 w-[85vw] sm:w-[22rem] lg:w-[24rem]"
                  />
                ))}
              </AnimatePresence>
              <div className="shrink-0 w-1 md:w-2" aria-hidden />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
