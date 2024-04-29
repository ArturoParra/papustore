/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        hex_0554F2 : '#0554F2',
        hex_076DF2 : '#076DF2',
        hex_3889F2 : '#3889F2',
        hex_F2F2F2 : '#F2F2F2',
        hex_0D0D0D : '#0D0D0D',
      },
    },
  },
  plugins: [],
}

