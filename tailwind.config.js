/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFFCF6",
          100: "#FFF8E9",
          200: "#FAF0C5",
          300: "#F5E8A9",
          400: "#ECD88E",
          500: "#DCC269",
          600: "#C5AA4F",
          700: "#A68E3C",
          900: "#6B5924",
          950: "#3F3214",
        },
        charcoal: {
          900: "#1C1C1C",
          700: "#333333",
        },
      },
    },
  },
  plugins: [],
};
