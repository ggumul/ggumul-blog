import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#11183A',
        text: '#FFF1B8',
        subtext: '#C9D7FF',
        line: '#3957A6',
        point: '#FFD447',
      },
      boxShadow: {
        glow: '0 22px 0 rgba(14, 21, 58, 0.62), 0 28px 70px rgba(43, 92, 190, 0.22)',
      },
    },
  },
  plugins: [],
} satisfies Config;
