import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Reveal al hacer scroll. Respeta prefers-reduced-motion (aparece sin desplazamiento).
export const Reveal = ({ children, delay = 0, y = 24, className = '', as = 'div', once = true }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
};

// Contenedor con stagger para listas/grupos
export const RevealGroup = ({ children, className = '', stagger = 0.08, once = true }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const revealItem = (reduce, y = 24) => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
});
