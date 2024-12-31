/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'beVietnam': ['Be Vietnam', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'notoSansJP': ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        primary: '#1E1E2F',     
        secondary: '#FFC470',   
        accent: '#00bcd4',  
      },
    },
  },
  plugins: [],
}