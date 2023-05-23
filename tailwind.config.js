/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
      extend: {
        keyframes: {
          rotate: {
            "0%": { transform: "rotate(0deg)" },
            "50%": { transform: "rotate(180deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        },
        animation: {
          rotate: "rotate 3s ease-in-out infinite",
        },
        fontFamily: {
          one: ['"Jockey One"', ...defaultTheme.fontFamily.sans]
        }
      },
  },
  plugins: [],
}

