import React from 'react';

// Logos de marca reales (SVG inline, sin dependencias externas).
// Colores oficiales. Pensados para usarse a tamaño pequeño (chips/botones).

export const GoogleLogo = ({ className = '' }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

export const WhatsAppLogo = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <path
      fill="#25D366"
      d="M16.003 3C9.39 3 4.02 8.37 4.02 14.98c0 2.31.66 4.46 1.8 6.28L4 29l7.93-1.78a11.9 11.9 0 0 0 4.07.72h.01c6.61 0 11.98-5.37 11.98-11.98C28 8.37 22.62 3 16.003 3z"
    />
    <path
      fill="#fff"
      d="M21.3 18.27c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.19.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5l-.56-.01c-.19 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.04 2.82 1.19 3.01.15.19 2.05 3.13 4.97 4.39.69.3 1.24.48 1.66.61.7.22 1.33.19 1.83.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z"
    />
  </svg>
);

export const InstagramLogo = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="105%" r="120%">
        <stop offset="0%" stopColor="#FFD776" />
        <stop offset="25%" stopColor="#F09433" />
        <stop offset="50%" stopColor="#E6683C" />
        <stop offset="70%" stopColor="#DC2743" />
        <stop offset="100%" stopColor="#BC1888" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#ig-grad)" />
    <rect x="8" y="8" width="16" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
    <circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeWidth="2" />
    <circle cx="21.5" cy="10.5" r="1.4" fill="#fff" />
  </svg>
);
