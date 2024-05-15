/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xss': '200px',
      'xs': '400px',
      'sm': '600px',
      'md': '800px',
      'lg': '1000px',
      'xl': '1300px',
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}