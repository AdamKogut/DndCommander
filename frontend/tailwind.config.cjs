/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          light: '#FFFFFF',
          DEFAULT: '#FFFFFF',
          dark: '#FFFFFF'
        },
        'secondary': {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#000000'
        },
        'tertiary': {
          light: '#92D18B',
          DEFAULT: '#378B2E',
          dark: '#074600'
        }
      }
    }
  },
  plugins: [],
  darkMode: 'media'
};