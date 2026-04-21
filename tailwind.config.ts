import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F6F0E6',
        text: '#2A1F18',
        subtext: '#6E5D4F',
        line: '#D8CABB',
        point: '#9A6738',
      },
    },
  },
  plugins: [],
} satisfies Config;
