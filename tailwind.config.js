/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0A0A0C',
        'dark-surface': '#111114',
        'dark-surface-2': '#18181c',
        'dark-border': 'rgba(255, 255, 255, 0.1)',
        primary: {
          DEFAULT: '#8A56FF',
          600: '#7C3AFF',
          700: '#6E2AFF',
        },
        accent: {
          DEFAULT: '#38BDF8',
          600: '#0EA5E9',
          700: '#0284C7',
        },
        success: {
          DEFAULT: '#22C55E',
          hover: '#16A34A',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        gradient: 'gradient 8s ease infinite',
        'price-pulse': 'price-pulse 2s ease-in-out infinite',
        'gradient-border': 'gradient-border 1s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'price-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'gradient-border': {
          '0%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(90deg, #8A56FF, #38BDF8)',
        'gradient-btn': 'linear-gradient(90deg, #8A56FF, #38BDF8)',
        'gradient-btn-hover': 'linear-gradient(90deg, #7C3AFF, #0EA5E9)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 