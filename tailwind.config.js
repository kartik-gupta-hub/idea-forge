/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#05050A',
          surface: '#0E0E14',
          elevated: '#151520',
        },
        neon: {
          cyan: '#00F0FF',
          magenta: '#FF003C',
          yellow: '#FCEE09',
          green: '#00FF66',
        },
        text: {
          main: '#E2E8F0',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
    },
  },
  plugins: [],
}