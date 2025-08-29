/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          500: '#228B22',
          600: '#1e7e1e',
          700: '#1a701a',
        },
        secondary: {
          50: '#fdf6f0',
          100: '#f9e6d3',
          500: '#D2691E',
          600: '#bd5e1b',
          700: '#a85318',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0077B6',
          600: '#006ba3',
          700: '#005e90',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};