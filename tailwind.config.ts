import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        text: '#F8FAFC',
        subtext: '#CBD5E1',
        line: '#334155',
        point: '#D6A72A',
      },
      boxShadow: {
        glow: '0 22px 0 rgba(14, 21, 58, 0.62), 0 28px 70px rgba(43, 92, 190, 0.22)',
      },
    },
  },
  plugins: [],
} satisfies Config;
