/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        beVietnam: ["Be Vietnam", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        notoSansJP: ["Noto Sans JP", "sans-serif"],
      },
      colors: {
        // primary: "#074799",
        primary: "#3E7B27",
        secondary: "#FFC470",
        footer: "#000957",
        accent: "#00bcd4",
        gray700: "#4B5563", 
        orange700: "#C05621", 
      },
    },
  },
  plugins: [],
};
