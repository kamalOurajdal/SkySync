/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      height : {
        500 : '500px',
        600 : '611.831px',
        100 : '100px',
        50 : '100px',
        
      },
      width:{
        500 : '500px',
        1000 : '1000px',
        100 : '40rem',
        150 : '37rem',
        98 : '31rem',
        68 : '16.5rem',

      },
      //zindex
      zIndex: {
        '1000':1010,
      },
      colors: {
        // Light theme colors
        light: {
          primary: '#3b82f6',
          secondary: '#6366f1',
          background: '#f8fafc',
          surface: '#ffffff',
          text: '#1e293b',
          textSecondary: '#64748b',
          border: '#e2e8f0',
          accent: '#f1f5f9',
        },
        // Dark theme colors
        dark: {
          primary: '#60a5fa',
          secondary: '#818cf8',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
          textSecondary: '#94a3b8',
          border: '#334155',
          accent: '#1e293b',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}

