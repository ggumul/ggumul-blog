import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFF7E8',
        text: '#211A14',
        subtext: '#5F5147',
        line: '#2A2119',
        point: '#E85D3F',
        surface: '#FFFDF7',
        butter: '#FFD95A',
        violet: '#6E56CF',
        mint: '#6ED6A8',
        peach: '#FFB08A',
      },
      boxShadow: {
        card: '5px 5px 0 #2A2119',
        soft: '0 18px 45px rgba(42, 33, 25, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
