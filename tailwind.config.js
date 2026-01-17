/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sudest: {
          'azul-oscuro': '#0A2240',
          'rojo-intenso': '#B0161F',
          'naranja': '#F7961D',
          'gris-claro': '#A3A3A3',
          'gris-oscuro': '#3A3A3A',
        },
        primary: {
          dark: '#0A2240',
          DEFAULT: '#0A2240',
          light: '#3A3A3A',
        },
      },
      backgroundImage: {
        'gris-degradado': 'linear-gradient(to bottom, #A3A3A3, #3A3A3A)',
        'velocidad-degradado': 'linear-gradient(to right, #B0161F, #F7961D)',
      },
    },
  },
  plugins: [],
}
