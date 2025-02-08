/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx}",   // Add explicit path to components
    "./src/pages/**/*.{js,jsx}",        // Add explicit path to pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
