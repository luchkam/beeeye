/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      opacity: {
        '2': '0.02',
        '3': '0.03',
        '4': '0.04',
        '6': '0.06',
        '8': '0.08',
      },
      borderOpacity: {
        '8': '0.08',
      },
      colors: {
        ink: {
          950: '#060607',
          900: '#0a0a0c',
          850: '#0e0f12',
          800: '#111216',
          700: '#17181d',
          600: '#1d1e24',
          500: '#24262d',
          400: '#2e3039',
        },
        bee: {
          50:  '#fffce5',
          100: '#fff8b8',
          200: '#fff18a',
          300: '#ffe852',
          400: '#ffdd22',
          500: '#f5cc00',
          600: '#c9a600',
          700: '#8a7200',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"SF Pro Display"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-bee':   '0 0 0 1px rgba(255,221,34,0.15), 0 10px 40px -10px rgba(255,221,34,0.35)',
        'glow-soft':  '0 0 60px -10px rgba(255,221,34,0.35)',
        'glow-inner': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
        'card':       '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'grid-bee':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse at top, rgba(255,221,34,0.12), transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3.5s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
