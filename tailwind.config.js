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
        240 : '100px'
        
      },
      width:{
        500 : '500px',
        1000 : '1000px',
        100 : '40rem'
      }
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}

