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
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(90deg, #8A56FF, #38BDF8)',
        'gradient-btn': 'linear-gradient(90deg, #8A56FF, #38BDF8)',
        'gradient-btn-hover': 'linear-gradient(90deg, #7C3AFF, #0EA5E9)',
      },
    },
  },
  plugins: [],
} 