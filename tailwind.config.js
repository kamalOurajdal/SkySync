/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height : {
        500 : '500px',
        600 : '611.831px'
      },
      width:{
        500 : '500px',
        1000 : '1000px'
      }
    },
  },
  plugins: [],
}

