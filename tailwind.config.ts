import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#08070B',
        text: '#FFF5E8',
        subtext: '#D0C0B2',
        line: '#322A27',
        point: '#FFB45F',
      },
      boxShadow: {
        glow: '0 24px 90px rgba(255, 139, 61, 0.16)',
      },
    },
  },
  plugins: [],
} satisfies Config;
