/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "custom-grey": '#d3d3d3',
        "custom-orange": '#FAA916',
        "custom-blue": '#355070',
        "custom-red": '#BF1A2F'
      }
    }
  },
  plugins: [],
  darkMode: 'media'
};