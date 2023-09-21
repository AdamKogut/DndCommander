/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary-dark": '#36494e',
        "primary-light": '#F8F4E3',
        "accent": '#31081F',
        "calltoaction": '#8ac4ff',
        "calltoaction-red": '#C14953'
      }
    }
  },
  plugins: [],
  darkMode: 'media'
};