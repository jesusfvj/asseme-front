/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
      extend: {
        fontFamily: {
          one: ['"Jockey One"', ...defaultTheme.fontFamily.sans]
        }
      },
  },
  plugins: [],
}

