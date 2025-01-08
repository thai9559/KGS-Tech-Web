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
        primary: "#074799",
        secondary: "#FFC470",
        footer: "#000957",
        accent: "#00bcd4",
      },
    },
  },
  plugins: [],
};
