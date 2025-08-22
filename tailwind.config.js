/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
        inclusive: ["'Inclusive Sans'", "sans-serif"],
      },
      backgroundImage: {
        "header-bg": "url('/src/assets/header-bg.svg')",
      },
      colors: {
        primary: {
          100: "#F5F5F5",
          500: "#507D8A",
          900: "#0B3954",
        },
        secondary: {
          400: "#EB8E44",
          500: "#EB7044",
          600: "#F25445",
        },
      },
    },
  },
  plugins: [],
};
