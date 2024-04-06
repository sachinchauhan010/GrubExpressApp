/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px', // Custom breakpoint for extra small screens
        // You can define additional breakpoints as needed
      },
    },
  },
  plugins: [],
}