/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors :{
        'blueColor':'#2a68ff',
        'greyIsh':'#f1f4f8',
        'greyNav':'#6f6f6f',
        'cardshow':'#f7f8f9',
        'textColor':'#252b36'
      }
    },
  },
  plugins: [],
}

