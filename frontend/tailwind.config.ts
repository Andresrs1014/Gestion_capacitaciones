import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
      },
      colors: {
        zymo: {
          red: '#E31E24',
          'red-hover': '#ff2a31',
          'red-muted': 'rgba(227,30,36,0.08)',
          dark: '#0f0f0f',
          card: '#1a1a1a',
          border: 'rgba(255,255,255,0.07)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config