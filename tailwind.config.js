/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
      }
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}

