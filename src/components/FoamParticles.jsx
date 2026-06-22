import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Partículas tipo espuma/bokeh que ascienden lentamente sobre el hero.
// Canvas ligero (sin WebGL). Se desactiva con prefers-reduced-motion y se
// pausa cuando la pestaña no está visible para ahorrar batería.
export const FoamParticles = ({ className = '', count = 36 }) => {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rand = (min, max) => min + Math.random() * (max - min);
    const spawn = (initial) => ({
      x: rand(0, w),
      y: initial ? rand(0, h) : h + rand(0, 40),
      r: rand(1.5, 6),
      vy: rand(0.15, 0.6),
      drift: rand(-0.25, 0.25),
      a: rand(0.08, 0.5),
      phase: rand(0, Math.PI * 2),
    });

    resize();
    let particles = Array.from({ length: count }, () => spawn(true));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.vy;
        p.phase += 0.01;
        p.x += p.drift + Math.sin(p.phase) * 0.3;
        if (p.y + p.r < -10) Object.assign(p, spawn(false));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 250, 255, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce, count]);

  if (reduce) return null;
  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden="true" />;
};
