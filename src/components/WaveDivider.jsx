import React from 'react';

// Una "loseta" de ola de 1440px de ancho. Empieza y termina a la misma altura
// para que al duplicarla y desplazarla -50% el bucle sea continuo.
const tile = (offset, y) =>
  `M${offset},${y} C${offset + 240},${y + 40} ${offset + 480},${y - 40} ${offset + 720},${y} ` +
  `C${offset + 960},${y + 40} ${offset + 1200},${y - 40} ${offset + 1440},${y} ` +
  `L${offset + 1440},120 L${offset},120 Z`;

const Layer = ({ y, fill, opacity, speed }) => (
  <svg
    className={`absolute bottom-0 left-0 w-[200%] h-full ${speed}`}
    viewBox="0 0 2880 120"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path d={`${tile(0, y)} ${tile(1440, y)}`} fill={fill} opacity={opacity} />
  </svg>
);

/**
 * Divisor de olas animadas (SVG ligero, sin WebGL).
 * @param {string} className  posición/altura (ej. "h-24 text-slate-50")
 * @param {boolean} flip      voltea verticalmente (olas que cuelgan desde arriba)
 * @param {string} baseColor  color de la capa frontal (sólida, suele tapar la sección destino)
 */
export const WaveDivider = ({ className = 'h-20 md:h-28', flip = false, baseColor = '#f8fafc' }) => (
  <div
    className={`relative w-full overflow-hidden pointer-events-none ${flip ? 'rotate-180' : ''} ${className}`}
    aria-hidden="true"
  >
    {/* Capas traseras translúcidas (cyan) con distinta velocidad → profundidad */}
    <Layer y={55} fill="#06b6d4" opacity={0.30} speed="animate-wave-slow" />
    <Layer y={45} fill="#0891b2" opacity={0.45} speed="animate-wave-med" />
    {/* Capa frontal sólida que sella contra la sección de destino */}
    <Layer y={60} fill={baseColor} opacity={1} speed="animate-wave-fast" />
  </div>
);
