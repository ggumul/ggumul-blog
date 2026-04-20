import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F4EE',
        text: '#222222',
        subtext: '#5E5A54',
        line: '#DDD6CC',
        point: '#68755B',
      },
    },
  },
  plugins: [],
} satisfies Config;
