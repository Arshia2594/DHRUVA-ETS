/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],safelist: [
  'bg-green-600',
  'hover:bg-green-700',
  'bg-blue-600',
  'hover:bg-blue-700',
],


  theme: {
    extend: {},
  },
  
  plugins: [],
}

