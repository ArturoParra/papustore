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
        'naranja': '#EE7210',
        'crema': '#FFCC66',
        'negro': '#140D0D',
      }

    },
  },
  plugins: [],
}

