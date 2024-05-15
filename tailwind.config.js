/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        'primary': '#EE7210',
        'secondary': '#FFCC66',
        'fondo': '#140D0D',
      }

    },
  },
  plugins: [],
}

