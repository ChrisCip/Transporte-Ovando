/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(8,47,73,0.04), 0 8px 24px -8px rgba(8,47,73,0.12)',
        card: '0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(8,47,73,0.06), 0 12px 40px -12px rgba(8,47,73,0.18)',
        float: '0 30px 80px -20px rgba(8,47,73,0.35), 0 8px 24px -8px rgba(8,47,73,0.18)',
        glow: '0 0 40px rgba(245,158,11,0.35), 0 0 80px rgba(245,158,11,0.15)',
        cyan: '0 0 40px rgba(34,211,238,0.35), 0 0 80px rgba(34,211,238,0.15)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        // Deriva horizontal infinita para las olas SVG en bucle
        waveX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Brillo que cruza los botones (shine)
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' },
        },
        // Paneo de gradiente oceánico (footer / fondos)
        gradientPan: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Zoom lento tipo Ken Burns para posters del hero
        kenburns: {
          '0%': { transform: 'scale(1.05) translate(0,0)' },
          '100%': { transform: 'scale(1.18) translate(-1.5%, -1.5%)' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        'wave-slow': 'waveX 18s linear infinite',
        'wave-med': 'waveX 12s linear infinite',
        'wave-fast': 'waveX 8s linear infinite',
        shine: 'shine 1.1s ease-out',
        'gradient-pan': 'gradientPan 14s ease-in-out infinite',
        kenburns: 'kenburns 16s ease-out forwards',
      },
    },
  },
  plugins: [],
}
